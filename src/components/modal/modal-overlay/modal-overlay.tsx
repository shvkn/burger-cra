import React, { FC, SyntheticEvent } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayComponentParams = {
  onClick: () => void;
};

const ModalOverlay: FC<TModalOverlayComponentParams> = ({ onClick }) => {
  const handleClose = (e: SyntheticEvent) => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  return <div className={`${styles.overlay}`} onClick={handleClose} />;
};

export default ModalOverlay;
