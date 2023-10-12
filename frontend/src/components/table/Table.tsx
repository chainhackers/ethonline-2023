import { TablePropsI } from './TableProps.ts';
import styles from './Table.module.scss';
import { FC } from 'react';
import { DateCell } from '../index.ts';

export const Table: FC<TablePropsI> = () => {
  const pools = [
    {
      address: '0x4681de1e080e889fad73853fa7adaa0be39e433f',
      date: 1697123492289,
      anchorCurrency: '0x6265617665726275696c642e6f7267',
      tokens: [
        '0x6265617665726275696c642e6f7267',
        '0x6265617665726275696c642e6f7267',
        '0x6265617665726275696c642e6f7267',
      ],
      operatorFee: 12,
      total: 234500,
      profitPercent: 10,
      profit: 3453453,
    },
    {
      address: '0x4681de1e080e889fad73853fa7adaa0be39e433z',
      date: 1697123492289,
      anchorCurrency: '0x6265617665726275696c642e6f7267',
      tokens: [
        '0x6265617665726275696c642e6f7267',
        '0x6265617665726275696c642e6f7267',
        '0x6265617665726275696c642e6f7267',
      ],
      operatorFee: 12,
      total: 234500,
      profitPercent: 10,
      profit: 120000,
    },
    {
      address: '0x4681de1e080e889fad73853fa7adaa0be39e433x',
      date: 1697123492289,
      anchorCurrency: '0x6265617665726275696c642e6f7267',
      tokens: [
        '0x6265617665726275696c642e6f7267',
        '0x6265617665726275696c642e6f7267',
        '0x6265617665726275696c642e6f7267',
      ],
      operatorFee: 12,
      total: 234500,
      profitPercent: 10,
      profit: 30000,
    },
  ];

  const tableRowMap = {
    date: { title: 'Date', component: 'DateCell' },
    // operatorFee: { title: 'Operator fee', component: 'some tsx' },
    // total: { title: 'Total', component: 'DateCell' },
    // profit: { title: 'Profit', component: 'some tsx' },
  };
  //todo: combine tokens and anchorCurrency for Anchor currency / Tokens
  // const combineTokens = (pools: any) => {
  //   const result = pools.map((pool: any) => {
  //     return (pool = {
  //       ...pool,
  //       allTokens: { anchorCurrency: pool.anchorCurrency, tokens: pool.tokens },
  //     });
  //   });
  //   setPools(result);
  // };

  // useEffect(() => {
  //   combineTokens(pools);
  // }, [pools]);
  //todo: find proper place for interfaces and types
  type PoolT = {
    address: string;
    date: number;
    anchorCurrency: string;
    tokens: string[];
    operatorFee: number;
    total: number;
    profitPercent: number;
    profit: number;
  };
  const cells = { DateCell };
  type CellsT = typeof cells;
  return (
    <div className={styles.tableContainer}>
      <table border={1}>
        <thead>
          <tr>
            {Object.entries(tableRowMap).map(([key, value]) => (
              <th key={key}>{value.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pools.map((pool) => (
            <tr key={pool.address}>
              {Object.entries(tableRowMap).map(([key, value]) => {
                const TagName = cells[value.component as CellsT];
                return (
                  <td key={key}>
                    <TagName cellValue={pool[key as keyof PoolT]} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}></div>
    </div>
  );
};
