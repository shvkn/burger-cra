import React from 'react';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';

import { useAppLocation } from 'shared/lib';

import styles from './styles.module.css';

type TModalRoute = {
  children: React.ReactNode;
  path: string;
} & RouteProps;

export const ModalRoute: React.FC<TModalRoute> = ({ path, children, ...rest }) => {
  const location = useAppLocation();
  return (
    <Link
      {...rest}
      to={{ pathname: path, state: { background: location } }}
      className={styles.link}
    >
      {children}
    </Link>
  );
};
