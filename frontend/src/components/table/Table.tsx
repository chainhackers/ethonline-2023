import { TablePropsI } from './TableProps.ts';
import styles from './Table.module.scss';
import { FC } from 'react';
// import axios from 'axios';
// import { DateCell } from 'Components';
// import { TPool } from 'src/pages/index.ts';
import { TokenIconsCell } from '../tokenIconsCell/TokenIconsCell.tsx';

export const Table: FC<TablePropsI> = ({ tableData }) => {
  return (
    <div className={styles.tableContainer}>
      <table border={1}>
        <thead>
          <tr>
            {/* <th>Date</th> */}
            <th className={styles.right}>Operator fee</th>
            <th>Anchor currency / Tokens</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((pool) => (
            <tr key={pool.address}>
              {/* <td> todo
                <DateCell cellValue={pool.date} />
              </td> */}
              <td className={styles.right}>{String(pool.operatorFee) + '%'}</td>
              <td>
                {pool.anchorCurrency && pool.allowedTokens && (
                  <TokenIconsCell
                    anchorCurrency={pool.anchorCurrency}
                    tokens={pool.allowedTokens}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
