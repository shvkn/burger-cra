import React, { FC, useEffect } from 'react';
import styles from './feed.module.css';
import { ordersModel } from 'entities/order';
import LoadingCurtain from 'components/loading-curtain/loading-curtain';
import { useAppDispatch } from 'services/slices';
import actions from 'services/actions/orders';
import { OrderList } from 'widgets/order-list';
import { Dashboard } from 'widgets/dashboard';

const FeedPage: FC = () => {
  const { orders, total, totalToday, isWsOpened, isWsClosed, isWsConnecting } =
    ordersModel.useOrders();

  const dispatch = useAppDispatch();

  useEffect(() => {
    isWsClosed && dispatch(actions.connect());
    return () => {
      isWsOpened && dispatch(actions.close());
    };
  }, [dispatch, isWsOpened, isWsClosed]);

  return (
    <main className={styles.layout}>
      {isWsConnecting ? (
        <LoadingCurtain />
      ) : (
        <>
          <OrderList
            orders={orders}
            heading={<h2 className={`mt-10 mb-5 text text_type_main-medium`}>Лента заказов</h2>}
          />
          <Dashboard orders={orders} total={total} totalToday={totalToday} />
        </>
      )}
    </main>
  );
};

export default FeedPage;
