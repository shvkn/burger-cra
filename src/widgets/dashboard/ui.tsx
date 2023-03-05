import styles from 'pages/feed/feed.module.css';
import React, { useMemo } from 'react';
import { groupBy } from 'shared/lib';

type TDashboardProps = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const Dashboard: React.FC<TDashboardProps> = ({ orders, total, totalToday }) => {
  const ordersByStatus = useMemo(() => groupBy(orders, ({ status }) => status), [orders]);

  return !!ordersByStatus ? (
    <div className={`ml-9 mt-25 ${styles.dashboard}`}>
      <div className={styles.dashboardOrdersList}>
        <div>
          <h3 className={'mb-6 text text_type_main-default'}>Готовы:</h3>
          <ul className={styles.ordersNumbers}>
            {ordersByStatus['done']?.slice(0, 20).map((order) => (
              <li key={order.number} className={`mb-2 ml-8 ${styles.orderNumber}`}>
                <p className={`text text_type_digits-default text_color_success`}>{order.number}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={'ml-9'}>
          <h3 className={'text text_type_main-default'}>В работе:</h3>
          <ul className={styles.ordersNumbers}>
            {ordersByStatus['pending']?.slice(0, 20).map((order) => (
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
  ) : null;
};
