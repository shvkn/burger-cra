import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsLayout from 'components/details-layout';
import styles from './user-order.module.css';
import OrderInfo from 'components/order-info';
import { useSelector } from 'react-redux';
import { getAccessToken, useAppDispatch, useAppSelector } from 'shared/lib';
import { ordersModel } from 'entities/order';

const UserOrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isWsOpened = useAppSelector(ordersModel.selectors.selectIsWSOpened);
  const isWsClosed = useAppSelector(ordersModel.selectors.selectIsWSClosed);

  React.useEffect(() => {
    isWsClosed &&
      dispatch(ordersModel.actions.connect({ route: '/orders', accessToken: getAccessToken() }));
    return () => {
      isWsOpened && dispatch(ordersModel.actions.close());
    };
  }, [dispatch, isWsClosed, isWsOpened]);

  const order = useSelector(ordersModel.selectors.selectById(id));
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
};

export default UserOrderPage;
