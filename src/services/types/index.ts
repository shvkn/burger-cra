import store from '../slices';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TIngredient } from 'services/types/data';

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export type TInitialState = {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: {} | null;
};

export type TResponseBody<T> = {
  success: boolean;
  message?: string;
} & T;

export type TIngredientsResponse = {
  data: ReadonlyArray<TIngredient>;
};
