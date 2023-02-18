import styles from './modal-header.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, ReactNode } from 'react';

export type TModalHeader = {
  children: ReactNode;
  handleClose: () => void;
};

const ModalHeader: FC<TModalHeader> = ({ children, handleClose }) => {
  return children ? (
    <div className={`ml-10 mt-10 mr-10 ${styles.container}`}>
      <div>{children}</div>
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

export default ModalHeader;
