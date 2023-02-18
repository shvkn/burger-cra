import { useEffect } from 'react';
import * as ordersActions from 'services/actions/orders';
import ordersSelectors from 'services/selectors/orders';
import { useAppDispatch, useAppSelector } from 'services/slices';

const useOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(ordersSelectors.selectAll);
  const entities = useAppSelector(ordersSelectors.selectEntities);
  const isWSClosed = useAppSelector(ordersSelectors.selectIsWSClosed);
  const isWSConnecting = useAppSelector(ordersSelectors.selectIsWSConnecting);

  useEffect(() => {
    if (isWSClosed) {
      dispatch(ordersActions.connect());
    }
    return () => {
      if (!isWSClosed && !isWSConnecting) {
        dispatch(ordersActions.close());
      }
    };
  }, [dispatch, isWSClosed, isWSConnecting]);

  return [orders, entities];
};

export default useOrders;
