import React from 'react';

import { Spinner } from '../spinner';

import styles from './styles.module.css';

export const LoadingCurtain: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.loaderWrapper}>
      <Spinner />
    </div>
  </div>
);
