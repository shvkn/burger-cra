import React, { FC, ReactNode } from 'react';
import { DetailsLayoutHeader } from './details-layout-header';
import { DetailsLayoutContent } from './details-layout-content';
import styles from './details-layout.module.css';

type TDetailsLayoutExtensions = {
  Header: typeof DetailsLayoutHeader;
  Content: typeof DetailsLayoutContent;
};

type TDetailsLayoutProps = {
  children: ReactNode;
};

export const DetailsLayout: FC<TDetailsLayoutProps> & TDetailsLayoutExtensions = ({ children }) => (
  <div className={styles.layout}>{children}</div>
);

DetailsLayout.Header = DetailsLayoutHeader;
DetailsLayout.Content = DetailsLayoutHeader;
