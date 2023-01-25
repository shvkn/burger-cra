import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ onClick }) {
  const handleClose = (e) => {
    if (e.currentTarget === e.target) onClick();
  };

  return <div className={`${styles.overlay}`} onClick={handleClose} />;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
