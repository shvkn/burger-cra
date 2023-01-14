import styles from './modal-content.module.css';
import React from 'react';
import PropTypes from 'prop-types';

function ModalContent({ children }) {
  return <div className={`${styles.container}`}>{children}</div>;
}

ModalContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalContent;
