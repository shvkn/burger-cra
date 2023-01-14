import React from 'react';
import PropTypes from 'prop-types';
import DetailsPageHeader from './details-header/details-header';
import DetailsPageContent from './details-content/details-content';
import styles from './details.module.css';

function Details({ children }) {
  return <div className={styles.container}>{children}</div>;
}

Details.propTypes = {
  children: PropTypes.node.isRequired,
};

Details.Header = DetailsPageHeader;
Details.Content = DetailsPageContent;

export default Details;
