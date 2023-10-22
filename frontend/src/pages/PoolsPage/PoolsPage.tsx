import { PoolsPagePropsI } from './PoolsPageProps.ts';
import styles from './PoolsPage.module.scss';
import { FC, useEffect, useState } from 'react';
import { Table } from 'Components';
import { publicClientViem } from 'src/wagmiConfig.ts';
import { abi } from '../../data/abi.ts';

export type TPool = {
  address: `0x${string}`;
  allowedTokens: string[];
  anchorCurrency: string;
  operatorFee: number;
};

export const PoolsPage: FC<PoolsPagePropsI> = ({ poolsType }) => {
  const [poolsData, setPoolsData] = useState<TPool[]>([]);
  const contract: `0x${string}` = '0x606279b2c388ed37d0e5e52ea0d75eb2b539a57e';
  const contractsList = [contract];
  const getAnchorCurrency = async (address: `0x${string}`) => {
    const data = await publicClientViem.readContract({
      address: address,
      abi: abi,
      functionName: 'anchorCurrency',
    });
    return data;
  };
  const getAllowedTokens = async (address: `0x${string}`) => {
    const data = await publicClientViem.readContract({
      address: address,
      abi: abi,
      functionName: 'allowedTokensList',
    });
    return data;
  };
  const getOperatorFee = async (address: `0x${string}`) => {
    const data = await publicClientViem.readContract({
      address: address,
      abi: abi,
      functionName: 'operatorFee',
    });
    return data;
  };

  const getPoolsData = async (addresses: `0x${string}`[]) => {
    const result = await Promise.all(
      addresses.map(async (address) => {
        const operatorFee = await getOperatorFee(address);
        const allowedTokens = await getAllowedTokens(address);
        const anchorCurrency = await getAnchorCurrency(address);
        console.log('check', operatorFee, allowedTokens, anchorCurrency);
        return {
          address: address,
          allowedTokens: allowedTokens,
          anchorCurrency: anchorCurrency,
          operatorFee: operatorFee,
        } as TPool;
      })
    );
    return Promise.resolve(result);
  };
  const handleGetPoolsData = async (addresses: `0x${string}`[]) => {
    const result = await getPoolsData(addresses);
    setPoolsData(result);
  };

  useEffect(() => {
    handleGetPoolsData(contractsList);
    // console.log(getPoolsData(contractsList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.poolPageContainer}>
      <main className={styles.poolsPage}>
        <h1>{poolsType}</h1>
        {poolsData && <Table tableData={poolsData} />}
      </main>
    </div>
  );
};
