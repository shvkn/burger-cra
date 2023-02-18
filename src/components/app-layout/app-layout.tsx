import React, { FC, ReactNode } from 'react';
import styles from './app-layout.module.css';
import AppHeader from 'components/app-header';

type TAppLayout = {
  children: ReactNode;
};

const AppLayout: FC<TAppLayout> = ({ children }) => (
  <div className={styles.layout}>
    <AppHeader />
    <div className={styles.mainContainer}>{children}</div>
  </div>
);

export default AppLayout;
