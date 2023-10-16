import { PoolsPagePropsI } from './PoolsPageProps.ts';
import styles from './PoolsPage.module.scss';
import { FC, useEffect, useState } from 'react';
import { Header, Table } from 'Components';
import { useContractRead } from 'wagmi';
import { abi } from '../../data/abi.ts';
import { publicClientViem } from '../../wagmiConfig.ts';

export type TPool = {
  allowedTokens: string;
  anchorCurrency: string;
  operatorFee: number;
};
export const PoolsPage: FC<PoolsPagePropsI> = ({ poolsType }) => {
  const contract = '0xCa9c4a7949e6f9dc8343b565E34C493E4970c1AB';

  useEffect(() => {
    getPools();
  }, []);

  const wagmiContract = {
    address: contract,
    abi: abi,
  } as const;

  const [tableData, setTableData] = useState<TPool[] | null>(null);

  const getPools = async () => {
    const results = await publicClientViem.multicall({
      contracts: [
        {
          ...wagmiContract,
          functionName: 'allowedTokens',
          args: [0],
        },
        {
          ...wagmiContract,
          functionName: 'anchorCurrency',
        },
        {
          ...wagmiContract,
          functionName: 'operatorFee',
        },
      ],
    });
    const pool = {
      allowedTokens: results[0].result,
      anchorCurrency: results[1].result,
      operatorFee: results[2].result,
    };
    setTableData([pool]);
    console.log(pool);

    // return [pool];
  };

  return (
    <>
      <Header />
      <div className={styles.poolPageContainer}>
        <main className={styles.poolsPage}>
          <h1>{poolsType}</h1>
          {tableData && <Table tableData={tableData!} />}
        </main>
      </div>
    </>
  );
};
