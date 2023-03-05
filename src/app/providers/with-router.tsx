import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line react/display-name
export const withRouter = (component: () => React.ReactNode) => () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={'loader...'}>{component()}</React.Suspense>
    </BrowserRouter>
  );
};
