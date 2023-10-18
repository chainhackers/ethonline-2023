import { FC } from 'react';
import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Header: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <img src='assets/Logo.avif' alt='' />
      </Link>
      <nav>
        <Link className={currentPath === '/' ? styles.active : ''} to={'/'}>
          Pools available
        </Link>
      </nav>
      <ConnectButton />
    </header>
  );
};
