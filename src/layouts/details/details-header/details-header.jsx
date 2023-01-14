import React from 'react';
import PropTypes from 'prop-types';
import styles from './details-header.module.css';

function DetailsHeader({ children }) {
  return <div className={styles.container}>{children}</div>;
}

DetailsHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsHeader;
