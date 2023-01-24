import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ordersActions from 'services/actions/orders';
import ordersSelectors from 'services/selectors/orders';

const useOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelectors.selectAll);
  const entities = useSelector(ordersSelectors.selectEntities);
  const isWSClosed = useSelector(ordersSelectors.selectIsWSClosed);
  const isWSConnecting = useSelector(ordersSelectors.selectIsWSConnecting);

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
