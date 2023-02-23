import React, { FC } from 'react';
import Spinner from 'components/spinner/spinner';
import styles from './loading-curtain.module.css';

const LoadingCurtain: FC = () => (
  <div className={styles.container}>
    <div className={styles.loaderWrapper}>
      <Spinner />
    </div>
  </div>
);

export default LoadingCurtain;
