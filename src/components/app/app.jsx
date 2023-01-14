import React, { useEffect, useMemo } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import '@ya.praktikum/react-developer-burger-ui-components';

import {
  ConstructorPage,
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  NotFoundedPage,
  ProfilePage,
  RegistrationPage,
  ResetPasswordPage,
  OrderPage,
  FeedPage,
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

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
    dispatch(ordersWsActions.connect());
  }, [dispatch]);

  const handleClose = (e) => {
    history.goBack();
  };

  const matchOrderId = useRouteMatch('/feed/:id');
  const orders = useSelector(ordersSelectors.selectEntities);
  const order = useMemo(() => {
    if (!matchOrderId) {
      return null;
    }
    const {
      path,
      params: { id },
    } = matchOrderId;
    switch (path) {
      case '/feed/:id':
        return orders[id] ?? null;
      default:
        return null;
    }
  }, [orders, matchOrderId]);

  const matchIngredientId = useRouteMatch('/ingredient/:id');
  const ingredients = useSelector(ingredientsSelectors.selectEntities);
  const ingredient = useMemo(() => {
    if (!matchIngredientId) {
      return null;
    }
    const {
      params: { id },
    } = matchIngredientId;
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
          <ProtectedRoute path='/profile' component={ProfilePage} />
          <Route exact path='/feed' component={FeedPage} />
          <Route path='/feed/:id'>{order && <OrderPage order={order} />}</Route>
          <Route path='/ingredient/:id'>
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
            <Route path='/feed/:id'>
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
