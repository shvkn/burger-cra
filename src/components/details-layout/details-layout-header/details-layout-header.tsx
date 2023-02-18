import React, { FC, ReactNode } from 'react';
import styles from './details-layout-header.module.css';

type TDetailsLayoutHeader = {
  children: ReactNode;
};

const DetailsLayoutHeader: FC<TDetailsLayoutHeader> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default DetailsLayoutHeader;
