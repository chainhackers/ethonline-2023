import { TablePropsI } from './TableProps.ts';
import styles from './Table.module.scss';
import { FC } from 'react';
// import axios from 'axios';
// import { DateCell } from 'Components';
// import { TPool } from 'src/pages/index.ts';

export const Table: FC<TablePropsI> = ({ tableData }) => {
  return (
    <div className={styles.tableContainer}>
      <table border={1}>
        <thead>
          <tr>
            {/* <th>Date</th> */}
            <th className={styles.right}>Operator fee</th>
            <th className={styles.right}>anchor currency</th>
            <th className={styles.right}>Allowed Tokens</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((pool) => (
            <tr key={pool.address}>
              {/* <td> todo
                <DateCell cellValue={pool.date} />
              </td> */}
              <td className={styles.right}>{String(pool.operatorFee) + '%'}</td>
              <td className={styles.right}>{String(pool.anchorCurrency)}</td>
              <td className={styles.right}>{String(pool.allowedTokens)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
