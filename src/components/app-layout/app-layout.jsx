import React from 'react';
import styles from './app-layout.module.css';
import AppHeader from 'components/app-header';
import PropTypes from 'prop-types';

function AppLayout({ children }) {
  return (
    <div className={styles.layout}>
      <AppHeader />
      <div className={styles.mainContainer}>{children}</div>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
