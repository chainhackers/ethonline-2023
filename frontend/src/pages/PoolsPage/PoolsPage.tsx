import { PoolsPagePropsI } from './PoolsPageProps.ts';
import styles from './PoolsPage.module.scss';
import { FC } from 'react';
import { Header, Table } from 'Components';
// import { abi } from '../../data/abi.ts';
// import { publicClientViem } from '../../wagmiConfig.ts';
// import { useContractRead } from 'wagmi';

export type TPool = {
  address: string;
  allowedTokens: string[];
  anchorCurrency: string;
  operatorFee: number;
};

export const PoolsPage: FC<PoolsPagePropsI> = ({ poolsType }) => {
  const tableData: TPool[] = [
    {
      address: '0',
      allowedTokens: [
        '0x0000000000000000000000000000000000001010',
        '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
        '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
        '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
        '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
        '0xb33eaad8d922b1083446dc23f610c2567fb5180f',
        '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
      ],
      anchorCurrency: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      operatorFee: 10,
    },
  ];

  //todo: improve the acquisition of contract data
  //   const contract = '0x606279b2c388ed37d0e5e52ea0d75eb2b539a57e';
  //   const contractsList = [contract];

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const abi2 = [
  //   'function allowedTokensList() view returns (IERC20[] memory)',
  //   'function anchorCurrency() view returns (IERC20)',
  //   'function operatorFee() view returns (uint256);',
  // ];
  // const wagmiContract = {
  //   address: contract,
  //   abi: abi2,
  // } as const;

  // const [tableData, setTableData] = useState<TPool[] | null>(null);

  // const getAllowedTokens = async () => {
  //   const { data } = useContractRead({
  //     address: contract,
  //     abi: abi2,
  //     functionName: 'allowedTokensList',
  //   });
  //   // return result[0].address;
  // };

  // const getAnchorCurrency = async () => {
  //   const result = contractsList.map((contract: string) => ({
  //     address: contract,
  //     abi: abi2,
  //     functionName: 'anchorCurrency',
  //   }));
  //   return result[0].address;
  // };

  // const getOperatorFee = async () => {
  //   const result = contractsList.map((contract: string) => ({
  //     address: contract,
  //     abi: abi2,
  //     functionName: 'operatorFee',
  //   }));
  // };
  // const getPools = async () => {};

  return (
    <>
      <Header />
      <div className={styles.poolPageContainer}>
        <main className={styles.poolsPage}>
          <h1>{poolsType}</h1>
          {tableData && <Table tableData={tableData} />}
        </main>
      </div>
    </>
  );
};
