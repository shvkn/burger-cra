import React from 'react';
import PropTypes from 'prop-types';
import styles from './details-layout-header.module.css';

function DetailsLayoutHeader({ children }) {
  return <div className={styles.container}>{children}</div>;
}

DetailsLayoutHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsLayoutHeader;
