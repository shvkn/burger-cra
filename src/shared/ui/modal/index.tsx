import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalContent } from './modal-content';
import { ModalHeader } from './modal-header';
import { ModalOverlay } from './modal-overlay';
import styles from './styles.module.css';

type TModalExtensions = {
  Header: typeof ModalHeader;
  Content: typeof ModalContent;
};

type TModalProps = {
  children: React.ReactNode;
  handleClose: () => void;
};

const MODAL_ROOT = document.getElementById('react-modals') as HTMLElement;

export const Modal: React.FC<TModalProps> & TModalExtensions = ({ children, handleClose }) => {
  useEffect(() => {
    const handleCloseByEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleCloseByEsc);
    return () => document.removeEventListener('keydown', handleCloseByEsc);
  }, [handleClose]);

  return createPortal(
    <>
      <div className={`${styles.modal}`}>{children}</div>
      <ModalOverlay onClick={handleClose} />
    </>,
    MODAL_ROOT
  );
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
