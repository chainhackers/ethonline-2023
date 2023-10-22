/* eslint-disable react-hooks/exhaustive-deps */
import styles from './CreatePool.module.scss';
import ButtonPrimary from '../UI/buttonPrimary/ButtonPrimary';
import FormHeader from './formHeader/FormHeader';
import InputField from '../inputField/InputField';
import FormElTitle from '../formElTitle/FormElTitle';
import TokenSelect from '../tokenSelect/TokenSelect';
import { useEffect, useState } from 'react';
import { ABI, ROUTES, TOKENS } from '../../constants/constants';
import InputButton from '../UI/inputButton/InputButton';
import { IToken } from '../../types/types';
import TextBtn from '../UI/textBtn/TextBtn';
import TextChipsOutline from '../UI/textChipsOutline/TextChipsOutline';
import { useAccount, useContractEvent, useContractWrite } from 'wagmi';
import { abiCreatePool } from '../../abi/abiCreatePool';
import { getFilteredTokensArr } from '../../utils/getFilteredTokensArr';
import { useNavigate } from 'react-router-dom';
import { Log } from 'viem';
import { useConnectModal } from '@rainbow-me/rainbowkit';

interface ILogs extends Log {
  args: {
    vault: string;
    anchorCurrency: string;
    operatorFee: number;
    name: string;
    symbol: string;
  };
}

function CreatePool() {
  const navigate = useNavigate();
  const [formkey, setFormkey] = useState(Date.now());
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const tokensMaxCount = 3;
  const [anchorSelectState, setAnchorSelectState] = useState(false);
  const [anchorSelected, setAnchorSelected] = useState<IToken | null>(null);

  const [approveTokensSelect, setApproveTokensSelect] = useState(false);
  const [approveTokensSelected, setApproveTokensSelected] = useState<Array<IToken>>([]);

  const [inputValue, setInputValue] = useState(0);
  const [btnSubmitDisabled, setBtnSubmitDisabled] = useState(true);

  const { data, status, write } = useContractWrite({
    address: ABI.createVault.address!,
    abi: abiCreatePool,
    functionName: ABI.createVault.name,
  });

  useContractEvent({
    address: ABI.createVault.address!,
    abi: abiCreatePool,
    eventName: 'ProfitPalsVaultCreated',
    listener: (log) => {
      handleProfitPalsVaultCreatedEvent(log);
    },
  });

  const handleProfitPalsVaultCreatedEvent = (log: Log[]) => {
    console.log('Created pool data: ', log);
    const vaultCreateEvent = (log as ILogs[])[0];
    const vaultAddress = vaultCreateEvent.args.vault;
    navigate(`${ROUTES.assetManagement}/${vaultAddress}`);
  };

  useEffect(() => {
    if (status == 'success') {
      console.log('Transaction hash: ', data?.hash);
      handleResetForm();
    }
  }, [status]);

  useEffect(() => {
    if (anchorSelected) {
      const approvedTokens = getApprovedTokens();
      const isInputValid =
        approvedTokens.length >= 2 && approvedTokens.length <= tokensMaxCount && inputValue;

      setBtnSubmitDisabled(!isInputValid);
    } else {
      setBtnSubmitDisabled(true);
    }
  }, [approveTokensSelected, anchorSelected, inputValue]);

  const handleAnchorTokenSelect = (value: Array<IToken>) => {
    setAnchorSelectState(false);
    setAnchorSelected(value[0]);
  };

  const handleApproveTokensSelect = (value: Array<IToken>) => {
    setApproveTokensSelect(false);
    setApproveTokensSelected(value);
  };

  const handleInputOnChange = (value: number) => {
    setInputValue(value);
    console.log('Interest rate input: ', value);
  };

  const getApprovedTokens = () => {
    if (anchorSelected) {
      return [...new Set([anchorSelected, ...approveTokensSelected])];
    }
    return [];
  };

  const handleResetForm = () => {
    setAnchorSelected(null);
    setApproveTokensSelected([]);
    setInputValue(0);
    setFormkey(Date.now());
  };

  const handleSubmit = async () => {
    const approvedTokens = getApprovedTokens().map((item) => item.address);
    const dataParams = [
      anchorSelected?.address,
      approvedTokens,
      inputValue,
      anchorSelected?.name,
      anchorSelected?.name,
    ];

    if (isConnected) {
      console.log('Contract address: ', ABI.createVault.address);
      console.log('Submit data for creating pool: ', dataParams);
      write({
        args: [...dataParams],
      });
    }
  };

  const handleRemoveTextChips = (address: string) => {
    const result = getFilteredTokensArr(approveTokensSelected, address);
    setApproveTokensSelected(result);
  };

  return (
    <div className={styles.create_pool} key={formkey}>
      <div className={styles.create_pool__box}>
        <div className={styles.create_pool__header}>
          <FormHeader handleBtnClick={handleResetForm} linkText='Your assets' title='Create Pool' />
        </div>
        <form className={styles.create_pool__form}>
          <div className={styles.create_pool__form_el}>
            <FormElTitle>Anchor currency</FormElTitle>
            <InputButton
              value={anchorSelected ? anchorSelected.name : ''}
              defaultText='Select a token'
              icon={anchorSelected?.iconPath}
              onClick={() => {
                setAnchorSelectState(true);
              }}
            />
          </div>
          <div className={styles.create_pool__form_el}>
            <FormElTitle>Approved Tokens</FormElTitle>
            <TextBtn
              plus
              onClick={() => {
                setApproveTokensSelect(true);
              }}
              disabled={!anchorSelected || getApprovedTokens().length >= tokensMaxCount}
            >
              Add token
            </TextBtn>
            {anchorSelected && (
              <div className={styles.create_pool__form_tokens}>
                {[...getApprovedTokens()].map((item, index) => (
                  <TextChipsOutline
                    key={index}
                    id={item.address}
                    value={item.name}
                    icon={item.iconPath}
                    onClose={anchorSelected !== item ? handleRemoveTextChips : undefined}
                  />
                ))}
              </div>
            )}
          </div>
          <div className={styles.create_pool__form_el}>
            <FormElTitle>Operator fee</FormElTitle>
            <InputField
              type='number'
              min={0}
              max={100}
              handleInputOnChange={handleInputOnChange}
              placeholder='0'
              symbol='%'
              value={inputValue}
            />
          </div>

          {isConnected ? (
            <ButtonPrimary disabled={btnSubmitDisabled} onClick={handleSubmit}>
              Create Pool
            </ButtonPrimary>
          ) : (
            <ButtonPrimary onClick={openConnectModal}>Connect Wallet</ButtonPrimary>
          )}
        </form>
      </div>

      <TokenSelect
        isOpen={anchorSelectState}
        limit={1}
        name={'anchorToken'}
        data={TOKENS}
        onClose={handleAnchorTokenSelect}
        selected={anchorSelected ? [anchorSelected] : []}
      />

      {anchorSelected && (
        <TokenSelect
          isOpen={approveTokensSelect}
          limit={tokensMaxCount}
          data={TOKENS}
          onClose={handleApproveTokensSelect}
          selected={[...approveTokensSelected]}
          defaultSelected={[anchorSelected]}
        />
      )}
    </div>
  );
}

export default CreatePool;
