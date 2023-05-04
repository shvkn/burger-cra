import { useState } from 'react';

export const useConstructor = (callbackFn: (...args: any[]) => any) => {
  const [called, setCalled] = useState<boolean>(false);
  if (called) {
    return;
  }
  callbackFn();
  setCalled(true);
};
