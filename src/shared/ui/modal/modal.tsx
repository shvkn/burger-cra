import React, { FC, ReactNode, useEffect } from 'react';
import styles from './modal.module.css';
import ReactDOM from 'react-dom';

import { ModalOverlay } from './modal-overlay';
import { ModalContent } from './modal-content';
import { ModalHeader } from './modal-header';

type TModalExtensions = {
  Header: typeof ModalHeader;
  Content: typeof ModalContent;
};

type TModalProps = {
  children: ReactNode;
  handleClose: () => void;
};

const MODAL_ROOT = document.getElementById('react-modals') as HTMLElement;

export const Modal: FC<TModalProps> & TModalExtensions = ({ children, handleClose }) => {
  useEffect(() => {
    const handleCloseByEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleCloseByEsc);
    return () => document.removeEventListener('keydown', handleCloseByEsc);
  }, [handleClose]);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal}`}>{children}</div>
      <ModalOverlay onClick={handleClose} />
    </>,
    MODAL_ROOT
  );
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
