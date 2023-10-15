import { TablePropsI } from './TableProps.ts';
import styles from './Table.module.scss';
import { FC } from 'react';
import { DateCell } from 'Components';

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
      operatorFee: '12%',
      total: '$234500',
      profitPercent: 10,
      profit: '+10% $3460',
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
      operatorFee: '12%',
      total: '$234500',
      profitPercent: 10,
      profit: '+10% $3460',
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
      operatorFee: '12%',
      total: '$234500',
      profitPercent: 10,
      profit: '+10% $3460',
    },
  ];
  return (
    <div className={styles.tableContainer}>
      <table border={1}>
        <thead>
          <tr>
            <th>Date</th>
            <th className={styles.right}>Operator Fee</th>
            <th className={styles.right}>Total</th>
            <th className={styles.right}>Profit</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((pool) => (
            <tr key={pool.address}>
              <td>
                <DateCell cellValue={pool.date} />
              </td>
              <td className={styles.right}>{pool.operatorFee}</td>
              <td className={styles.right}>{pool.total}</td>
              <td className={styles.right}>{pool.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
