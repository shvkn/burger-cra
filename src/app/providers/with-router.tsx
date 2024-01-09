import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LoadingCurtain } from 'shared/ui';

export function withRouter<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>
): React.ComponentType<T> {
  return function wrappedWithRouterComponent(props: T): JSX.Element {
    return (
      <BrowserRouter>
        <React.Suspense fallback={<LoadingCurtain />}>
          <Component {...props} />
        </React.Suspense>
      </BrowserRouter>
    );
  };
}
