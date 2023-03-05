import React, { FC, useEffect, useMemo } from 'react';
import styles from './feed.module.css';
import ordersSelectors from 'services/selectors/orders';
import { Order } from 'entities/order';
import LoadingCurtain from 'components/loading-curtain/loading-curtain';
import { useAppDispatch, useAppSelector } from 'services/slices';
import actions from 'services/actions/orders';

const MemoizedOrder = React.memo(Order);

const FeedPage: FC = () => {
  const isWsOpened = useAppSelector(ordersSelectors.selectIsWSOpened);
  const isWsClosed = useAppSelector(ordersSelectors.selectIsWSClosed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isWsClosed && dispatch(actions.connect());
    return () => {
      isWsOpened && dispatch(actions.close());
    };
  }, [dispatch, isWsOpened, isWsClosed]);

  const orders = useAppSelector(ordersSelectors.selectAll);
  const total = useAppSelector(ordersSelectors.selectTotal);
  const totalToday = useAppSelector(ordersSelectors.selectTotalToday);
  const isOrdersLoading = useAppSelector(ordersSelectors.selectIsWSConnecting);
  const isOrdersEmpty = useAppSelector(ordersSelectors.selectIsEmpty);

  const ordersStateDone = useMemo(
    () => orders.filter(({ status }) => status === 'done').slice(0, 20),
    [orders]
  );

  const ordersStatePending = useMemo(
    () => orders.filter(({ status }) => status === 'pending').slice(0, 20),
    [orders]
  );

  return (
    <main className={styles.layout}>
      {isOrdersLoading ? (
        <LoadingCurtain />
      ) : (
        <>
          <div className={styles.feed}>
            <h2 className={`mt-10 mb-5 text text_type_main-medium`}>Лента заказов</h2>
            {isOrdersEmpty ? (
              <p className={`text text_type_main-medium text_color_inactive ${styles.message}`}>
                Здесь пока пусто
              </p>
            ) : (
              <ul className={`${styles.ordersList} scroll`}>
                {orders.map((order) => (
                  <li key={order._id} className={'mb-4 mr-2'}>
                    <MemoizedOrder order={order} hideStatus />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={`ml-9 mt-25 ${styles.dashboard}`}>
            <div className={styles.dashboardOrdersList}>
              <div>
                <h3 className={'mb-6 text text_type_main-default'}>Готовы:</h3>
                <ul className={styles.ordersNumbers}>
                  {ordersStateDone.map((order) => (
                    <li key={order.number} className={`mb-2 ml-8 ${styles.orderNumber}`}>
                      <p className={`text text_type_digits-default text_color_success`}>
                        {order.number}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={'ml-9'}>
                <h3 className={'text text_type_main-default'}>В работе:</h3>
                <ul className={styles.ordersNumbers}>
                  {ordersStatePending.map((order) => (
                    <li key={order.number} className={`mb-2 ml-8 ${styles.orderNumber}`}>
                      <p className={`text text_type_digits-default`}>{order.number}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className={`mt-15 text text_type_main-default`}>Выполнено за все время:</h3>
            <p className={`text text_type_digits-large ${styles.textShadow}`}>{total}</p>
            <h3 className={`mt-15 text text_type_main-default`}>Выполнено за сегодня:</h3>
            <p className={`text text_type_digits-large ${styles.textShadow}`}>{totalToday}</p>
          </div>
        </>
      )}
    </main>
  );
};

export default FeedPage;
