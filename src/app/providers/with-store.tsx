import React from 'react';
import { Provider } from 'react-redux';

// eslint-disable-next-line boundaries/element-types
import { store } from '../store';

export function withStore<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>
): React.ComponentType<T> {
  return function wrappedWithStoreComponent(props: T): JSX.Element {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
}
