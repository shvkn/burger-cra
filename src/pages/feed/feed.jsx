import React, { useMemo } from 'react';
import styles from './feed.module.css';
import { useSelector } from 'react-redux';
import ordersSelectors from '../../services/selectors/orders';
import _ from 'lodash';
import Order from '../../components/order/order';

function FeedPage() {
  const orders = useSelector(ordersSelectors.selectAll);
  const total = useSelector(ordersSelectors.total);
  const totalToday = useSelector(ordersSelectors.totalToday);

  const sortedOrders = useMemo(() => _.orderBy(orders, 'createdAt', 'desc'), [orders]);

  const ordersStateDone = useMemo(
    () => _.filter(sortedOrders, { status: 'done' }).slice(0, 20),
    [sortedOrders]
  );

  const ordersStatePending = useMemo(
    () => _.filter(sortedOrders, { status: 'pending' }).slice(0, 20),
    [sortedOrders]
  );

  return (
    <div className={styles.layout}>
      <h2 className={`mt-10 mb-5 text text_type_main-medium ${styles.title}`}>Лента заказов</h2>
      <ul className={`${styles.ordersFeed} scroll`}>
        {sortedOrders.map((order) => (
          <li key={order._id} className={'mb-4 mr-2'}>
            <Order order={order} hideStatus />
          </li>
        ))}
      </ul>
      <div className={`ml-9 ${styles.dashboard}`}>
        <div className={styles.dashboardOrderList}>
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
    </div>
  );
}

export default FeedPage;
