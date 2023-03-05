import React, { FC } from 'react';
import 'style/common.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { Routes } from 'pages';
import AppLayout from 'components/app-layout/app-layout';

const App: FC = () => {
  return (
    <AppLayout>
      <Routes />
    </AppLayout>
  );
};

export default App;
