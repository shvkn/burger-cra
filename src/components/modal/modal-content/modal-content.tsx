import styles from './modal-content.module.css';
import React, { FC, ReactNode } from 'react';

export type TModalContentProps = {
  children: ReactNode;
};
const ModalContent: FC<TModalContentProps> = ({ children }) => {
  return <div className={`${styles.container}`}>{children}</div>;
};

export default ModalContent;
