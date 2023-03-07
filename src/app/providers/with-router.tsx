import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LoadingCurtain } from 'shared/ui';

// eslint-disable-next-line react/display-name
export const withRouter = (component: () => React.ReactNode) => () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<LoadingCurtain />}>{component()}</React.Suspense>
    </BrowserRouter>
  );
};
