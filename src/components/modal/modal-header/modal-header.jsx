import styles from './modal-header.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';

function ModalHeader({ children, handleClose }) {
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
}

ModalHeader.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func,
};

export default ModalHeader;
