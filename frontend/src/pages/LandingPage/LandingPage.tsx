import { FC } from 'react';
import styles from './LandingPage.module.scss';
import { Card } from 'Components';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'src/constants/constants.ts';

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
          <NavLink to={ROUTES.assetManagement} className={styles.button__main}>
            Enter app
          </NavLink>
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
      <section>
        <h2 className={styles.title}>How It Works</h2>
        <div className={styles.howItWorks}>
          <div className={styles.bigCard}>
            <h4>Invest in successful fund pools</h4>
            <ul>
              <li>
                <h5>Choose a fund pool</h5>
                <span>Select a fund pool that aligns with your financial goals and strategy</span>
              </li>
              <li>
                <h5>Provide «anchor currency»</h5>
                <span>
                  Invest your cryptocurrency assets using the "anchor currency" of the pool
                </span>
              </li>
              <li>
                <h5>Receive share tokens</h5>
                <span>
                  In exchange for your investments, you'll receive share tokens representing your
                  stake in the fund pool
                </span>
              </li>
              <li>
                <h5>Increase yield</h5>
                <span>
                  You can boost your stake by adding more "anchor currency" to the pool and receive
                  more shares of the pool's total profit
                </span>
              </li>
              <li>
                <h5>Withdraw</h5>
                <span>Just withdraw, same as burn token shares</span>
              </li>
            </ul>
          </div>
          <div className={styles.bigCard}>
            <h4>Initialize a fund pool</h4>
            <ul>
              <li>
                <h5>Initialize a fund pool</h5>
                <span>
                  Create a new fund pool by setting parameters, including the "anchor currency" and
                  the list of approved tokens
                </span>
              </li>
              <li>
                <h5>Asset management</h5>
                <span>
                  Manage assets within the pool, including token exchanges, creating positions in
                  AMM, and adjusting positions in automated market mechanisms
                </span>
              </li>
              <li>
                <h5>Receive operator rewards</h5>
                <span>
                  Your reward, in the form of a percentage of the pool's profits, is guaranteed and
                  remains unchanged throughout the pool's lifecycle
                </span>
              </li>
              <li>
                <h5>Enhance security</h5>
                <span>
                  Maintain the pool's security by activating a "deposit pause" when necessary
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <footer>
        <div className={styles.description}>
          In this way, ProfitPals offers the opportunity to <span>invest and increase</span>{' '}
          profitability, as well as to <span>create and manage</span> your own fund pools to earn
          operator rewards
        </div>
        <NavLink to={ROUTES.assetManagement} className={styles.button__main}>
          Enter app
        </NavLink>
      </footer>
    </div>
  );
};
