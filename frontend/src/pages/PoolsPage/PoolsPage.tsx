import { PoolsPagePropsI } from './PoolsPageProps.ts';
import styles from './PoolsPage.module.scss';
import { FC } from 'react';
import { Table } from 'Components';

export const PoolsPage: FC<PoolsPagePropsI> = ({ poolsType }) => {
  return (
    <div className={styles.container}>
      <main className={styles.poolsPage}>
        <h1>{poolsType}</h1>
        <Table />
      </main>
    </div>
  );
};
