import React from 'react';
import styles from './details-layout-header.module.css';

type TDetailsLayoutHeaderProps = {
  children: React.ReactNode;
};

export const DetailsLayoutHeader: React.FC<TDetailsLayoutHeaderProps> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
