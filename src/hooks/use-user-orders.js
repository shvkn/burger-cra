import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userOrdersActions from 'services/actions/user-orders';
import userOrdersSelectors from 'services/selectors/user-orders';

const useUserOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(userOrdersSelectors.selectAll);
  const entities = useSelector(userOrdersSelectors.selectEntities);
  const isWSClosed = useSelector(userOrdersSelectors.selectIsWSClosed);
  const isWSConnecting = useSelector(userOrdersSelectors.selectIsLoading);

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
