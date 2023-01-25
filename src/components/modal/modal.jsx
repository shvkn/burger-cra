import React, { useEffect } from 'react';
import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from 'components/modal/modal-overlay';
import ModalContent from 'components/modal/modal-content';
import ModalHeader from 'components/modal/modal-header';

const MODAL_ROOT = document.getElementById('react-modals');

function Modal({ children, handleClose }) {
  useEffect(() => {
    const handleCloseByEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleCloseByEsc);
    return () => document.removeEventListener('keydown', handleCloseByEsc);
  }, [handleClose]);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal}`}>
        {React.Children.map(children, (child) => {
          return child.type.name === Modal.Header.name
            ? React.cloneElement(child, { handleClose })
            : child;
        })}
      </div>
      <ModalOverlay onClick={handleClose} />
    </>,
    MODAL_ROOT
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;

export default Modal;
