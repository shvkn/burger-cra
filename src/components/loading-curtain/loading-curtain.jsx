import React from 'react';
import Spinner from '../spinner/spinner';
import styles from './loading-curtain.module.css';

function LoadingCurtain() {
  return (
    <div className={styles.container}>
      <div className={styles.loaderWrapper}>
        <Spinner />
      </div>
    </div>
  );
}

export default LoadingCurtain;
