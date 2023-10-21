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
      <NavLink to={ROUTES.landing}>
        <img src='assets/Logo.avif' alt='' />
      </NavLink>
      <nav>
        <NavLink
          className={currentPath === ROUTES.poolsAvailable ? styles.active : ''}
          to={ROUTES.poolsAvailable}
        >
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
