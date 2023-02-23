import React, { FC, SyntheticEvent } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClick: () => void;
};

const ModalOverlay: FC<TModalOverlayProps> = ({ onClick }) => {
  const handleClose = (e: SyntheticEvent) => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  return <div className={`${styles.overlay}`} onClick={handleClose} />;
};

export default ModalOverlay;
