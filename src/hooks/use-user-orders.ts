import { useEffect } from 'react';
import * as userOrdersActions from 'services/actions/user-orders';
import userOrdersSelectors from 'services/selectors/user-orders';
import { useAppDispatch, useAppSelector } from 'services/types';

const useUserOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(userOrdersSelectors.selectAll);
  const entities = useAppSelector(userOrdersSelectors.selectEntities);
  const isWSClosed = useAppSelector(userOrdersSelectors.selectIsWSClosed);
  const isWSConnecting = useAppSelector(userOrdersSelectors.selectIsWSConnecting);

  useEffect(() => {
    if (isWSClosed) {
      dispatch(userOrdersActions.connect());
    }
    return () => {
      if (!isWSClosed && !isWSConnecting) {
        dispatch(userOrdersActions.close());
      }
    };
  }, [dispatch, isWSClosed, isWSConnecting]);

  return [orders, entities];
};

export default useUserOrders;
