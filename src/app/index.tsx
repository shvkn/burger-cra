import React from 'react';

import 'style/common.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { Routes } from 'pages';

import { AppHeader } from 'widgets/app-header';

import { withProviders } from './providers';
import styles from './styles.module.css';

const App = () => {
  return (
    <div className={styles.layout}>
      <AppHeader />
      <div className={styles.mainContainer}>
        <Routes />
      </div>
    </div>
  );
};

export default withProviders(App);
