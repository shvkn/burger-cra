import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Dashboard } from 'widgets/dashboard';

import { ModalRoute } from 'features/modal-route';

import { ingredientModel } from 'entities/ingredient';
import { Order, ordersModel } from 'entities/order';

import { useAppDispatch } from 'shared/lib';
import { LoadingCurtain } from 'shared/ui';

import styles from './styles.module.css';

export const FeedPage: React.FC = () => {
  const {
    isSucceeded,
    isLoading,
    entities: ingredientsEntities,
  } = ingredientModel.useIngredients();

  const { orders, total, totalToday, isWsOpened, isWsClosed, isWsConnecting, isEmpty } =
    ordersModel.useOrders({ ingredientsEntities });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ingredientModel.actions.getIngredientsAsync());
    isWsClosed && dispatch(ordersModel.actions.connect({ route: '/orders/all' }));
    return () => {
      isWsOpened && dispatch(ordersModel.actions.close());
    };
  }, [dispatch, isWsOpened, isWsClosed, isSucceeded, isLoading]);
  const { url } = useRouteMatch();

  if (isWsConnecting) return <LoadingCurtain />;
  if (isEmpty) return null;

  return (
    <main className={styles.layout}>
      <>
        <div className={styles.container}>
          <h2 className={`mt-10 mb-5 text text_type_main-medium`}>Лента заказов</h2>
          <ul className={`${styles.ordersList} scroll`}>
            {orders.map((order) => (
              <li key={order._id} className={'mb-4 mr-2'}>
                <ModalRoute path={`${url}/${order._id}`}>
                  <Order order={order} hideStatus />
                </ModalRoute>
              </li>
            ))}
          </ul>
        </div>
        <Dashboard orders={orders} total={total} totalToday={totalToday} />
      </>
    </main>
  );
};
