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
  // const tableData: TPool[] = [
  //   {
  //     address: '0',
  //     allowedTokens: [
  //       '0x0000000000000000000000000000000000001010',
  //       '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  //       '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  //       '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
  //       '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
  //       '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
  //       '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
  //       '0xb33eaad8d922b1083446dc23f610c2567fb5180f',
  //       '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
  //     ],
  //     anchorCurrency: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
  //     operatorFee: 10,
  //   },
  // ];

  //todo: improve the acquisition of contract data
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
        };
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
