import { FC } from 'react';
import styles from './LandingPage.module.scss';

export const LandingPage: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            ProfitPals: invest and
            <span> boost </span>
            your DeFi income
          </h1>
          <span className={styles.hero__description}>
            Invest in decentralized finance and increase your income with ProfitPals. Participate in
            profitable fund pools and manage your investments.
          </span>
          <button className={styles.button__main}>Enter app</button>
        </div>
      </div>
    </div>
  );
};
