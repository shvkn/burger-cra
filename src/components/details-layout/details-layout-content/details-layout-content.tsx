import React, { FC, ReactNode } from 'react';

type TDetailsLayoutContentProps = {
  children: ReactNode;
};

const DetailsLayoutContent: FC<TDetailsLayoutContentProps> = ({ children }) => <>{children}</>;

export default DetailsLayoutContent;
