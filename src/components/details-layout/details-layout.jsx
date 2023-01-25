import React from 'react';
import PropTypes from 'prop-types';
import DetailsPageHeader from 'components/details-layout/details-layout-header';
import DetailsPageContent from 'components/details-layout/details-layout-content';
import styles from './details-layout.module.css';

function DetailsLayout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}

DetailsLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

DetailsLayout.Header = DetailsPageHeader;
DetailsLayout.Content = DetailsPageContent;

export default DetailsLayout;
