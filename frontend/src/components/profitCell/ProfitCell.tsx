import { FC } from 'react';
import styles from './ProfitCell.module.scss';
interface IProfitCell {
  total: number;
}

export const ProfitCell: FC<IProfitCell> = ({ total }) => {
  const totalNumber = Number(total) as number;
  const profit = Math.floor(Math.random() * 7000) - totalNumber;

  const profitPercent = () => {
    return Math.floor(((profit - totalNumber) / totalNumber) * 100);
  };
  const isProfitGreater = profit - totalNumber > 0;

  const forattedProfitPercent = (isProfitGreater ? '+' : '') + profitPercent() + '%';
  const formattedProfit = '$' + Math.abs(profit);
  return (
    <>
      <span className={isProfitGreater ? styles.green : styles.red}>{forattedProfitPercent}</span>
      <span> </span>
      <span className={isProfitGreater ? styles.green : styles.red}>{formattedProfit}</span>
    </>
  );
};

export default ProfitCell;
