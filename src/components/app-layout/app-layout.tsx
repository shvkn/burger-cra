import React, { FC, ReactNode } from 'react';
import styles from './app-layout.module.css';
import AppHeader from 'widgets/app-header';

type TAppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<TAppLayoutProps> = ({ children }) => (
  <div className={styles.layout}>
    <AppHeader />
    <div className={styles.mainContainer}>{children}</div>
  </div>
);

export default AppLayout;
