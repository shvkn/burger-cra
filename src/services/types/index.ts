import store from '../slices';

export type TInitialState = {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: {} | null;
};
