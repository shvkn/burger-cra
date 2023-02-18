import React, { FC, ReactNode } from 'react';

type TDetailsLayoutContent = {
  children: ReactNode;
};

const DetailsLayoutContent: FC<TDetailsLayoutContent> = ({ children }) => <>{children}</>;

export default DetailsLayoutContent;
