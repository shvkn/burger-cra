import React, { FC, useEffect } from 'react';
import DetailsLayout from 'components/details-layout/details-layout';
import OrderInfo from 'components/order-info/order-info';
import styles from './order.module.css';
import { useParams } from 'react-router-dom';
import { NotFoundedPage } from 'pages/index';
import { useSelector } from 'react-redux';
import ordersSelectors from 'services/selectors/orders';
import { useAppDispatch } from 'services/slices';
import ordersWsActions from 'services/actions/orders';

const OrderPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ordersWsActions.connect());
    return () => {
      dispatch(ordersWsActions.close());
    };
  }, [dispatch]);

  const order = useSelector(ordersSelectors.selectOrderById(id));

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
  ) : (
    <NotFoundedPage />
  );
};

export default OrderPage;
