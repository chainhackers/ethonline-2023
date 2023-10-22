import { TablePropsI } from './TableProps.ts';
import styles from './Table.module.scss';
import { FC } from 'react';
// import { DateCell } from 'Components';
// import { TPool } from 'src/pages/index.ts';
import { TokenIconsCell } from '../tokenIconsCell/TokenIconsCell.tsx';
import ProfitCell from 'Components/profitCell/ProfitCell.tsx';

export const Table: FC<TablePropsI> = ({ tableData }) => {
  return (
    <div className={styles.tableContainer}>
      <table border={1}>
        <thead>
          <tr>
            {/* <th>Date</th> */}
            <th>Anchor currency / Tokens</th>
            <th className={styles.right}>Operator fee</th>
            <th className={styles.right}>Total</th>
            <th className={styles.right}>Profit</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((pool) => (
            <tr key={pool.address}>
              {/* <td> todo
                <DateCell cellValue={pool.date} />
              </td> */}
              <td>
                {pool.anchorCurrency && pool.allowedTokens && (
                  <TokenIconsCell
                    anchorCurrency={pool.anchorCurrency}
                    tokens={pool.allowedTokens}
                  />
                )}
              </td>
              <td className={styles.right}>{String(Number(pool.operatorFee) / 100) + '%'}</td>
              <td className={styles.right}>{'$' + String(pool.total)}</td>
              <td className={styles.right}>
                <ProfitCell total={pool.total} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
