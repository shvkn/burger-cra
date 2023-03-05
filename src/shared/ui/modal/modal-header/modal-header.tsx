import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

import styles from './modal-header.module.css';

export type TModalHeaderProps = {
  children?: React.ReactNode;
  handleClose: () => void;
};

export const ModalHeader: React.FC<TModalHeaderProps> = ({ children, handleClose }) => {
  return children ? (
    <div className={`ml-10 mt-10 mr-10 ${styles.container}`}>
      {children && <div>{children}</div>}
      <button className={styles.close}>
        <CloseIcon type='primary' onClick={handleClose} />
      </button>
    </div>
  ) : (
    <button className={`mt-15 mr-10 ${styles.close} ${styles.absolute}`}>
      <CloseIcon type='primary' onClick={handleClose} />
    </button>
  );
};
