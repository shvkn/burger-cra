import React, { useEffect, useMemo } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import '@ya.praktikum/react-developer-burger-ui-components';

import {
  ConstructorPage,
  FeedPage,
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  NotFoundedPage,
  OrderPage,
  ProfilePage,
  RegistrationPage,
  ResetPasswordPage,
} from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/actions/auth';
import { fetchIngredients } from '../../services/actions/ingredients';
import ordersSelectors from '../../services/selectors/orders';
import OrderInfo from '../order-info/order-info';
import { ordersWsActions } from '../../services/slices/orders';
import ingredientsSelectors from '../../services/selectors/ingredients';
import { userOrdersSelectors } from '../../services/selectors/user-orders';
import { getAccessToken } from '../../utils/utils';
import { userOrdersWsActions } from '../../services/slices/user-orders';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const history = useHistory();

  const feedOrders = useSelector(ordersSelectors.selectEntities);
  const userOrders = useSelector(userOrdersSelectors.selectEntities);
  const ingredients = useSelector(ingredientsSelectors.selectEntities);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
    dispatch(ordersWsActions.connect());
    const accessToken = getAccessToken();
    if (accessToken) {
      dispatch(userOrdersWsActions.connect({ accessToken }));
    }
  }, [dispatch]);

  const handleClose = (e) => {
    history.goBack();
  };

  const matchFeedOrderId = useRouteMatch({ path: '/feed/:id', exact: true });
  const matchUserOrderId = useRouteMatch({ path: '/profile/orders/:id', exact: true });
  const matchIngredientId = useRouteMatch({ path: '/ingredient/:id', exact: true });

  const order = useMemo(() => {
    const match = matchFeedOrderId ?? matchUserOrderId;
    if (!match) {
      return null;
    }
    const id = match.params.id;
    const orders = matchFeedOrderId ? feedOrders : matchUserOrderId ? userOrders : null;
    return orders ? orders[id] : null;
  }, [matchFeedOrderId, matchUserOrderId, feedOrders, userOrders]);

  const ingredient = useMemo(() => {
    if (!matchIngredientId) {
      return null;
    }
    const id = matchIngredientId.params.id;
    return ingredients[id];
  }, [ingredients, matchIngredientId]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        <Switch location={background ?? location}>
          <Route exact path='/' component={ConstructorPage} />
          <ProtectedRoute nonAuthOnly path='/login' component={LoginPage} />
          <ProtectedRoute nonAuthOnly path='/register' component={RegistrationPage} />
          <ProtectedRoute nonAuthOnly path='/forgot-password' component={ForgotPasswordPage} />
          <ProtectedRoute nonAuthOnly path='/reset-password' components={ResetPasswordPage} />
          <ProtectedRoute path='/profile/orders/:id'>
            {order && <OrderPage order={order} />}
          </ProtectedRoute>
          <ProtectedRoute path='/profile' component={ProfilePage} />
          <Route path='/feed/:id'>{order && <OrderPage order={order} />}</Route>
          <Route path='/feed' component={FeedPage} />
          <Route exact path='/ingredient/:id'>
            {ingredient && <IngredientPage ingredient={ingredient} />}
          </Route>
          <Route path='*' component={NotFoundedPage} />
        </Switch>
        {background && (
          <Switch>
            <Route path='/ingredient/:id'>
              {ingredient && (
                <Modal handleClose={handleClose}>
                  <Modal.Header>
                    <p className={'text text_type_main-large'}>Детали ингредиента</p>
                  </Modal.Header>
                  <Modal.Content>
                    <IngredientDetails ingredient={ingredient} />
                  </Modal.Content>
                </Modal>
              )}
            </Route>
            <Route path='/(profile/orders|feed)/:id'>
              {order && (
                <Modal handleClose={handleClose}>
                  <Modal.Header>
                    <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
                  </Modal.Header>
                  <Modal.Content>
                    <OrderInfo order={order} />
                  </Modal.Content>
                </Modal>
              )}
            </Route>
          </Switch>
        )}
      </main>
    </div>
  );
}

export default App;
