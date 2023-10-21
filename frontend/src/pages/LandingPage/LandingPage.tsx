import { FC } from 'react';
import styles from './LandingPage.module.scss';
import { Card } from 'Components';

export const LandingPage: FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
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
      </section>
      <img
        src='src/../public/assets/img/landing/container.jpg'
        alt=''
        className={styles.decentralizedFinancialService}
      />
      <section>
        <h2 className={styles.title}>
          ProfitPals is an opportunity for reliable <span>investment</span> and effective asset
          <span>management</span>
        </h2>
        <div className={styles.gridCards}>
          <Card
            title={'Reliability and Transparency'}
            descriptionList={[
              'Your assets are in safe hands, thanks to the transparent and secure blockchain technology',
              'Every operation is overseen by the protocol contract, ensuring stability and predictability',
            ]}
          />
          <Card
            title={'Efficient Operation'}
            descriptionList={[
              'Operators are motivated to achieve maximum returns, and their success is tied to your success',
              'Pool management and operator strategies contribute to increased profits',
            ]}
          />
          <Card
            title={'Professional Management'}
            descriptionList={[
              'Your investments are expertly managed by experienced DeFi specialists',
              'You entrust your assets to professionals, avoiding risks and mistakes',
            ]}
          />
          <Card
            title={'Simplicity and Flexibility'}
            descriptionList={[
              'Ease of use makes investment and portfolio management accessible to everyone',
              'The choice of the fund pool and participation level remains in your hands',
            ]}
          />
          <Card
            title={'Risk Management'}
            descriptionList={[
              'The ability to pause new investments provides control over liquidity levels',
            ]}
          />
          <Card
            title={'Operator Reputation'}
            descriptionList={['You can see what results he has achieved before']}
          />
        </div>
      </section>
      <section>{/*<h2>How It Works</h2>*/}</section>
    </div>
  );
};
