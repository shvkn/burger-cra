import React, { useMemo } from 'react';
import styles from './feed.module.css';
import { useSelector } from 'react-redux';
import ordersSelectors from 'services/selectors/orders';
import _ from 'lodash';
import Order from 'components/order';
import LoadingCurtain from '../../components/loading-curtain/loading-curtain';

function FeedPage() {
  const orders = useSelector(ordersSelectors.selectAll);
  const total = useSelector(ordersSelectors.selectTotal);
  const totalToday = useSelector(ordersSelectors.selectTotalToday);
  const isOrdersLoading = useSelector(ordersSelectors.selectIsLoading);
  const isOrdersEmpty = useSelector(ordersSelectors.selectIsEmpty);

  const sortedOrders = useMemo(() => {
    return _.orderBy(orders, 'createdAt', 'desc');
  }, [orders]);

  const ordersStateDone = useMemo(
    () => _.filter(sortedOrders, { status: 'done' }).slice(0, 20),
    [sortedOrders]
  );

  const ordersStatePending = useMemo(
    () => _.filter(sortedOrders, { status: 'pending' }).slice(0, 20),
    [sortedOrders]
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
                {sortedOrders.map((order) => (
                  <li key={order._id} className={'mb-4 mr-2'}>
                    <Order order={order} hideStatus />
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
}

export default FeedPage;
