import { FC } from 'react';
import styles from './Pagination.module.scss';
import { PaginationPropsI } from './PaginationPropsI';
import { NavigateFirst, NavigatePrevious } from 'Components/icons';

export const Pagination: FC<PaginationPropsI> = () => {
  return (
    <div className={styles.pagination}>
      <div className={styles.rowsCount}>
        <span className={styles.dimmedText}>Rows per page:</span>
        {/* todo: add drop down menu */}
        <span
          style={{ padding: '6px 30px 6px 12px ', backgroundColor: '#292a2d', borderRadius: '8px' }}
        >
          10
        </span>
      </div>
      <div className={styles.pages}>
        {/* todo: display current page and pages length */}
        <span>1</span>
        <span>of</span>
        <span>1</span>
      </div>
      <div className={styles.icons}>
        <NavigateFirst />
        <NavigatePrevious />
        <div className={styles.rotateRight}>
          <NavigatePrevious />
        </div>
        <div className={styles.rotateRight}>
          <NavigateFirst />
        </div>
      </div>
    </div>
  );
};
