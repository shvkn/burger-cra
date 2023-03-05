import React from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClick: () => void;
};

export const ModalOverlay: React.FC<TModalOverlayProps> = ({ onClick }) => {
  const handleClose = (e: React.SyntheticEvent) => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  return <div className={`${styles.overlay}`} onClick={handleClose} />;
};
