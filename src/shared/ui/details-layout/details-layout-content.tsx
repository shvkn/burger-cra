import React from 'react';

type TDetailsLayoutContentProps = {
  children: React.ReactNode;
};

export const DetailsLayoutContent: React.FC<TDetailsLayoutContentProps> = ({ children }) => (
  <>{children}</>
);
