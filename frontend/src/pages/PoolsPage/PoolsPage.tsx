import { PoolsPagePropsI } from './PoolsPageProps.ts';
import styles from './PoolsPage.module.scss';
import { FC } from 'react';
import { Table } from 'Components';
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
      allowedTokens: ['0x606279b2c388ed37d0e5e52ea0d75eb2b539a57e'],
      anchorCurrency: '0x606279b2c388ed37d0e5e52ea0d75eb2b539a57e',
      operatorFee: 10,
    },
    {
      address: '1',
      allowedTokens: ['0x606279b2c388ed37d0e5e52ea0d75eb2b539a57e'],
      anchorCurrency: '0x606279b2c388ed37d0e5e52ea0d75eb2b539a57e',
      operatorFee: 15,
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
    <div className={styles.poolPageContainer}>
      <main className={styles.poolsPage}>
        <h1>{poolsType}</h1>
        {tableData && <Table tableData={tableData} />}
      </main>
    </div>
  );
};
