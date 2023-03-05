import React, { FC, ReactNode } from 'react';

import AppHeader from 'widgets/app-header';

import styles from './app-layout.module.css';

type TAppLayoutProps = {
  children: ReactNode;
};

export const AppLayout: FC<TAppLayoutProps> = ({ children }) => (
  <div className={styles.layout}>
    <AppHeader />
    <div className={styles.mainContainer}>{children}</div>
  </div>
);
