import React from 'react';

import styles from 'shared/ui/modal/modal-content/modal-content.module.css';

export type TModalContentProps = {
  children: React.ReactNode;
};
export const ModalContent: React.FC<TModalContentProps> = ({ children }) => {
  return <div className={`${styles.container}`}>{children}</div>;
};
