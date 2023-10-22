/* eslint-disable react-hooks/exhaustive-deps */
import styles from './PoolDetail.module.scss';
import { publicClientViem } from 'src/wagmiConfig';
import { useCallback, useEffect, useState } from 'react';
import { abiReadPool } from 'src/abi/abiReadPool';
import { Link, useParams } from 'react-router-dom';
import { createPublicClient, http } from 'viem';
import { getWalletClient } from '@wagmi/core';
import { polygon } from '@wagmi/core/chains';
import { useAccount, useContractEvent, useContractWrite } from 'wagmi';
import ButtonPrimary from '../UI/buttonPrimary/ButtonPrimary';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import FormElTitle from '../formElTitle/FormElTitle';
import InputField from '../inputField/InputField';

function PoolDetail() {
  const { poolAddress } = useParams();
  const [poolData, setPoolData] = useState<{
    safeAddress: `0x${string}`;
    anchor: `0x${string}`;
  } | null>(null);
  const abi = abiReadPool;
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [transactionState, setTransactionState] = useState<
    'default' | 'success' | 'error' | 'pending'
  >('default');
  const [approvedState, setApprovedState] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState(0);

  const { data, status, write } = useContractWrite({
    address: poolAddress as `0x${string}`,
    abi: abiReadPool,
    functionName: 'deposit',
  });

  useContractEvent({
    address: poolAddress as `0x${string}`,
    abi: abiReadPool,
    eventName: 'Deposit',
    listener: (log) => {
      console.log(log);
    },
  });

  const getPoolData = useCallback(async () => {
    const safeAddress = await publicClientViem.readContract({
      address: poolAddress as `0x${string}`,
      abi: abiReadPool,
      functionName: 'safe',
    });

    const data = await publicClientViem.readContract({
      address: poolAddress as `0x${string}`,
      abi: abiReadPool,
      functionName: 'anchorCurrency',
    });

    setPoolData({ safeAddress: safeAddress as `0x${string}`, anchor: data as `0x${string}` });
    console.log(safeAddress);
  }, []);

  useEffect(() => {
    if (!poolData && poolAddress) {
      getPoolData();
    }
  }, [poolAddress]);

  const client = createPublicClient({
    chain: polygon,
    transport: http(),
  });

  const handleApprove = async () => {
    const walletClient = await getWalletClient({
      chainId: polygon.id,
    });

    if (poolData) {
      try {
        setTransactionState('pending');
        const hash = await walletClient!.writeContract({
          abi: abi,
          address: poolData.anchor,
          account: address,
          chain: polygon,
          functionName: 'approve',
          args: [poolAddress, BigInt(1000000)],
        });

        const receipt = await client.waitForTransactionReceipt({ hash: hash });

        console.log('receipt: ', receipt);
        console.log('Approving: success');
        setTransactionState('success');
        setApprovedState(true);
        //console.log(startTransaction(hash, store.getState().wallet.chainFormattedName, receipt.blockNumber));
      } catch (error) {
        console.log('Approving: error = ', error);
        setTransactionState('error');
        setApprovedState(false);
      }
    }
  };

  const handleInputOnChange = (value: number) => {
    setInputValue(value);
    console.log('Deposit input value: ', value);
  };

  const handleInvest = () => {
    if (isConnected) {
      /*console.log('Contract address: ', ABI.createVault.address);
      console.log('Submit data for creating pool: ', dataParams);*/
      write({
        args: [inputValue, address],
      });
    }
  };

  useEffect(() => {
    if (status == 'success') {
      console.log('Transaction deposit: ', data);
    }
  }, [status]);

  return (
    <div className={styles.pool}>
      <div className={styles.pool__inner}>
        <div className={styles.pool__header}>
          <p className={styles.pool__address}>{poolAddress}</p>

          {poolData?.safeAddress && (
            <Link
              className={styles.pool__btn_link}
              to={`https://app.safe.global/home?safe=matic:${poolData.safeAddress}`}
              target='_blank'
            >
              Connect Uniswap
            </Link>
          )}
        </div>
        <div className={styles.pool__detail}>
          <p>Anchor currency: {poolData?.anchor}</p>
          <div className={styles.pool__el}>
            <FormElTitle>Deposit amount</FormElTitle>
            <InputField
              type='number'
              min={0}
              max={100}
              handleInputOnChange={handleInputOnChange}
              placeholder='0'
            />
          </div>
          <div className={styles.pool__el}>
            {isConnected ? (
              approvedState ? (
                <ButtonPrimary
                  disabled={transactionState === 'pending' || !inputValue}
                  onClick={handleInvest}
                >
                  Invest
                </ButtonPrimary>
              ) : (
                <ButtonPrimary
                  disabled={transactionState === 'pending' || !inputValue}
                  onClick={handleApprove}
                >
                  Approve
                </ButtonPrimary>
              )
            ) : (
              <ButtonPrimary onClick={openConnectModal}>Connect Wallet</ButtonPrimary>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoolDetail;
