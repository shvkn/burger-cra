import React from 'react';
import styles from './feed.module.css';
import { ordersModel } from 'entities/order';
import { LoadingCurtain } from 'shared/ui';
import { OrderList } from 'widgets/order-list';
import { Dashboard } from 'widgets/dashboard';
import { ingredientModel } from 'entities/ingredient';
import { useAppDispatch } from 'shared/lib';

const FeedPage: React.FC = () => {
  const { orders, total, totalToday, isWsOpened, isWsClosed, isWsConnecting } =
    ordersModel.useOrders();
  const { isSucceeded, isLoading } = ingredientModel.useIngredients();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!isSucceeded && !isLoading) {
      dispatch(ingredientModel.actions.getIngredientsAsync());
    }
    isWsClosed && dispatch(ordersModel.actions.connect({ route: '/orders/all' }));
    return () => {
      isWsOpened && dispatch(ordersModel.actions.close());
    };
  }, [dispatch, isWsOpened, isWsClosed, isSucceeded, isLoading]);

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
