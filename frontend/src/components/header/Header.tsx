import { FC } from 'react';
import styles from './Header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ROUTES } from 'src/constants/constants';

export const Header: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className={styles.header}>
      <NavLink to={'/'}>
        <img src='assets/Logo.avif' alt='' />
      </NavLink>
      <nav>
        <NavLink className={currentPath === '/' ? styles.active : ''} to={'/'}>
          Pools available
        </NavLink>
        <NavLink
          to={ROUTES.assetManagement}
          className={({ isActive }) => `${isActive && styles.active}`}
        >
          Aasset Management
        </NavLink>
      </nav>
      <ConnectButton />
    </header>
  );
};
