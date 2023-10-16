/* eslint-disable react-hooks/exhaustive-deps */
import styles from './CreatePool.module.scss';
import ButtonPrimary from '../UI/buttonPrimary/ButtonPrimary';
import FormHeader from './formHeader/FormHeader';
import InputField from '../inputField/InputField';
import FormElTitle from '../formElTitle/FormElTitle';
import TokenSelect from '../tokenSelect/TokenSelect';
import { useEffect, useState } from 'react';
import { ABI, TOKENS } from '../../constants/constants';
import InputButton from '../UI/inputButton/InputButton';
import { IToken } from '../../types/types';
import TextBtn from '../UI/textBtn/TextBtn';
import TextChipsOutline from '../UI/textChipsOutline/TextChipsOutline';
import { useAccount, useContractWrite } from 'wagmi';
import { abiCreatePool } from '../../abi/abiCreatePool';

function CreatePool() {
  const [formkey, setFormkey] = useState(Date.now());
  const { isConnected } = useAccount();
  const { data, isSuccess, write } = useContractWrite({
    address: `0x${ABI.createVault.address}`,
    abi: abiCreatePool,
    functionName: ABI.createVault.name,
  });
  const nativeNetworkToken = TOKENS.MATIC;
  const [anchorSelectState, setAnchorSelectState] = useState(false);
  const [anchorSelected, setAnchorSelected] = useState<Array<IToken>>([]);

  const [approveTokensSelect, setApproveTokensSelect] = useState(false);
  const [approveTokensSelected, setApproveTokensSelected] = useState<Array<IToken>>([]);

  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess]);

  const handleAnchorTokenSelect = (value: Array<IToken>) => {
    setAnchorSelectState(false);
    setAnchorSelected(value);
  };

  const handleApproveTokensSelect = (value: Array<IToken>) => {
    setApproveTokensSelect(false);
    setApproveTokensSelected(value);
  };

  const getDefaultSelected = () => {
    if (anchorSelected.length > 0) {
      if (anchorSelected[0].name !== nativeNetworkToken.name) {
        return [anchorSelected[0], nativeNetworkToken];
      } else {
        return [nativeNetworkToken];
      }
    } else {
      return [];
    }
  };

  const handleInputOnChange = (value: number) => {
    setInputValue(value);
  };

  const getApprovedTokens = () => {
    const defaultTokens = getDefaultSelected();
    if (anchorSelected.length) {
      const setObj = new Set(approveTokensSelected);
      [...defaultTokens].forEach((el) => {
        setObj.delete(el);
      });
      return [...defaultTokens, ...setObj];
    }
    return [];
  };

  const handleResetForm = () => {
    setAnchorSelected([]);
    setApproveTokensSelected([]);
    setInputValue(0);
    setFormkey(Date.now());
  };

  const handleSubmit = () => {
    const approvedTokens = getApprovedTokens().map((item) => item.address);
    const dataParams = [
      anchorSelected[0].address,
      approvedTokens,
      inputValue,
      nativeNetworkToken.name,
      nativeNetworkToken.name,
    ];

    console.log(dataParams);
    if (isConnected) {
      write({
        args: [...dataParams],
      });
    }
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
              value={anchorSelected[0]?.name}
              defaultText='Select a token'
              icon={anchorSelected[0]?.iconPath}
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
              disabled={!anchorSelected[0] && true}
            >
              Add token
            </TextBtn>
            {anchorSelected[0] && (
              <div className={styles.create_pool__form_tokens}>
                {getApprovedTokens().map((item, index) => (
                  <TextChipsOutline
                    key={index}
                    id={item.address}
                    value={item.name}
                    icon={item.iconPath}
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
              value={inputValue}
            />
          </div>
          <ButtonPrimary disabled={!(anchorSelected.length && inputValue)} onClick={handleSubmit}>
            Create Pool
          </ButtonPrimary>
        </form>
      </div>

      <TokenSelect
        isOpen={anchorSelectState}
        limit={1}
        name={'anchorToken'}
        data={TOKENS}
        onClose={handleAnchorTokenSelect}
        selected={anchorSelected}
      />

      {anchorSelected[0] && (
        <TokenSelect
          isOpen={approveTokensSelect}
          limit={3}
          data={TOKENS}
          onClose={handleApproveTokensSelect}
          selected={approveTokensSelected}
          defaultSelected={getDefaultSelected()}
        />
      )}
    </div>
  );
}

export default CreatePool;
