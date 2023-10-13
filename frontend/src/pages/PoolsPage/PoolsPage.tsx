import { PoolsPagePropsI } from './PoolsPageProps.ts';
import styles from './PoolsPage.module.scss';
import { FC } from 'react';
import { Header, Table } from 'Components';

export const PoolsPage: FC<PoolsPagePropsI> = ({ poolsType }) => {
  return (
    <>
      <Header />
      <div className={styles.poolPageContainer}>
        <main className={styles.poolsPage}>
          <h1>{poolsType}</h1>
          <Table />
        </main>
      </div>
    </>
  );
};
