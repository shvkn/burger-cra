import React, { FC, ReactNode } from 'react';
import DetailsPageHeader from 'components/details-layout/details-layout-header';
import DetailsPageContent from 'components/details-layout/details-layout-content';
import styles from './details-layout.module.css';

type TDetailsLayoutExtensions = {
  Header: typeof DetailsPageHeader;
  Content: typeof DetailsPageContent;
};

type TDetailsLayout = {
  children: ReactNode;
};

const DetailsLayout: FC<TDetailsLayout> & TDetailsLayoutExtensions = ({ children }) => (
  <div className={styles.layout}>{children}</div>
);

DetailsLayout.Header = DetailsPageHeader;
DetailsLayout.Content = DetailsPageContent;

export default DetailsLayout;
