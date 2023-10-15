import { PoolsPagePropsI } from './PoolsPageProps.ts';
import styles from './PoolsPage.module.scss';
import { FC } from 'react';
import { Header, Table } from 'Components';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';

export const PoolsPage: FC<PoolsPagePropsI> = ({ poolsType }) => {
  const { address } = useAccount();
  const { data } = useContractRead({
    address: '0xCa9c4a7949e6f9dc8343b565E34C493E4970c1AB',
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address!],
    watch: true,
  });

  return (
    <>
      <Header />
      <div className={styles.poolPageContainer}>
        <main className={styles.poolsPage}>
          <h1>{poolsType}</h1>
          <Table />
        </main>
      </div>
    </>
  );
};
