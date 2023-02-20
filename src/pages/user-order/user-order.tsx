import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailsLayout from 'components/details-layout';
import styles from './user-order.module.css';
import OrderInfo from 'components/order-info';
import actions from 'services/actions/user-orders';
import { useSelector } from 'react-redux';
import userOrdersSelectors from 'services/selectors/user-orders';
import { useAppDispatch, useAppSelector } from 'services/slices';

function UserOrderPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isWsOpened = useAppSelector(userOrdersSelectors.selectIsWSOpened);
  const isWsClosed = useAppSelector(userOrdersSelectors.selectIsWSClosed);

  useEffect(() => {
    isWsClosed && dispatch(actions.connect());
    return () => {
      isWsOpened && dispatch(actions.close());
    };
  }, [dispatch, isWsClosed, isWsOpened]);

  const order = useSelector(userOrdersSelectors.selectById(id));
  return order ? (
    <main className={`mt-30 ${styles.layout}`}>
      <DetailsLayout>
        <DetailsLayout.Header>
          <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
        </DetailsLayout.Header>
        <DetailsLayout.Content>
          <OrderInfo order={order} />
        </DetailsLayout.Content>
      </DetailsLayout>
    </main>
  ) : null;
}

export default UserOrderPage;
