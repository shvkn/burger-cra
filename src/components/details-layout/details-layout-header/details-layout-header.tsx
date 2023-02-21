import React, { FC, ReactNode } from 'react';
import styles from './details-layout-header.module.css';

type TDetailsLayoutHeaderProps = {
  children: ReactNode;
};

const DetailsLayoutHeader: FC<TDetailsLayoutHeaderProps> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default DetailsLayoutHeader;
