import React from 'react';
import 'style/common.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { Routes } from 'pages';
import { AppLayout } from 'widgets/app-layout';
import { withProviders } from './providers';

const App = () => {
  return (
    <AppLayout>
      <Routes />
    </AppLayout>
  );
};

export default withProviders(App);
