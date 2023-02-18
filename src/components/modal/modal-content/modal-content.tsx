import styles from './modal-content.module.css';
import React, { FC, ReactNode } from 'react';

export type TModalContent = {
  children: ReactNode;
};
const ModalContent: FC<TModalContent> = ({ children }) => {
  return <div className={`${styles.container}`}>{children}</div>;
};

export default ModalContent;
