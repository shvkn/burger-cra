import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppHistory = () => useHistory<TLocationState>();
export const useAppLocation = () => useLocation<TLocationState>();
