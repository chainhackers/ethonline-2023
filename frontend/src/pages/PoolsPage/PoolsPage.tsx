import { PoolsPagePropsI } from './PoolsPageProps.ts';
import styles from './PoolsPage.module.scss';
import { FC, useEffect } from 'react';
import { Header, Table } from 'Components';
import { useContractRead } from 'wagmi';
import { abi } from '../../data/abi.ts';
// import { publicClientViem } from 'src/wagmiConfig.ts';
const contract = '0xCa9c4a7949e6f9dc8343b565E34C493E4970c1AB';

export const PoolsPage: FC<PoolsPagePropsI> = ({ poolsType }) => {
  const { data, isSuccess } = useContractRead({
    address: contract,
    abi: abi,
    functionName: 'name',
    watch: false,
  });
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // const wagmiContract = {
  //   address: contract,
  //   abi: abi,
  //   functionName: 'name',
  // } as const;

  // const getPools = async () => {
  //   const results = await publicClientViem.multicall({
  //     contracts: [
  //       {
  //         ...wagmiContract,
  //       },
  // {
  //   ...wagmiContract,
  //   functionName: 'ownerOf',
  //   args: [69420n],
  // },
  // {
  //   ...wagmiContract,
  //   functionName: 'mint',
  // },
  //     ],
  //   });
  // };

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
