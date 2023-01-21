import React, { useEffect, useMemo } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import 'style/common.css';
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
} from 'pages';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from 'components/protected-route';
import IngredientDetails from 'components/ingredient-details';
import Modal from 'components/modal';
import OrderInfo from 'components/order-info/order-info';
import * as authActions from 'services/actions/auth';
import * as ingredientsActions from 'services/actions/ingredients';
import ordersSelectors from 'services/selectors/orders';
import ingredientsSelectors from 'services/selectors/ingredients';
import userOrdersSelectors from 'services/selectors/user-orders';
import * as ordersWSActions from 'services/actions/orders';
import * as userOrdersWSActions from 'services/actions/user-orders';
import AppLayout from '../app-layout/app-layout';
import authSelectors from '../../services/selectors/auth';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const history = useHistory();

  const feedOrders = useSelector(ordersSelectors.selectEntities);
  const userOrders = useSelector(userOrdersSelectors.selectEntities);
  const ingredients = useSelector(ingredientsSelectors.selectEntities);
  const isAuthorized = useSelector(authSelectors.selectIsAuthorized);
  useEffect(() => {
    dispatch(ingredientsActions.fetch());
    dispatch(ordersWSActions.connect());
  }, [dispatch]);

  useEffect(() => {
    dispatch(authActions.getUser())
      .unwrap()
      .then(() => {
        if (isAuthorized) {
          dispatch(userOrdersWSActions.connect());
        }
      });
  }, [dispatch, isAuthorized]);

  const handleClose = () => {
    history.goBack();
  };

  const matchIngredientId = useRouteMatch({ path: '/ingredient/:id', exact: true });
  const matchOrderId = useRouteMatch({ path: '/(profile/orders|feed)/:id', exact: true });
  const order = useMemo(() => {
    if (!matchOrderId) {
      return null;
    }
    const id = matchOrderId.params.id;
    return feedOrders[id] ?? userOrders[id];
  }, [matchOrderId, feedOrders, userOrders]);

  const ingredient = useMemo(() => {
    if (!matchIngredientId) {
      return null;
    }
    const id = matchIngredientId.params.id;
    return ingredients[id];
  }, [ingredients, matchIngredientId]);

  return (
    <AppLayout>
      <Switch location={background ?? location}>
        <Route exact path='/' component={ConstructorPage} />
        <ProtectedRoute nonAuthOnly path='/login' component={LoginPage} />
        <ProtectedRoute nonAuthOnly path='/register' component={RegistrationPage} />
        <ProtectedRoute nonAuthOnly path='/forgot-password' component={ForgotPasswordPage} />
        <ProtectedRoute nonAuthOnly path='/reset-password' components={ResetPasswordPage} />
        {order && (
          <Route path='/feed/:id'>
            <OrderPage order={order} />
          </Route>
        )}
        <Route path='/feed' component={FeedPage} />
        {order && (
          <ProtectedRoute exact path='/profile/orders/:id'>
            {<OrderPage order={order} />}
          </ProtectedRoute>
        )}
        <ProtectedRoute path='/profile' component={ProfilePage} />
        {ingredient && (
          <Route path='/ingredient/:id'>
            <IngredientPage ingredient={ingredient} />
          </Route>
        )}
        <Route path='*' component={NotFoundedPage} />
      </Switch>
      {background && (
        <Switch>
          {ingredient && (
            <Route path='/ingredient/:id'>
              <Modal handleClose={handleClose}>
                <Modal.Header>
                  <p className={'text text_type_main-large'}>Детали ингредиента</p>
                </Modal.Header>
                <Modal.Content>
                  <IngredientDetails ingredient={ingredient} />
                </Modal.Content>
              </Modal>
            </Route>
          )}
          {order && (
            <Route path='/(profile/orders|feed)/:id'>
              <Modal handleClose={handleClose}>
                <Modal.Header>
                  <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
                </Modal.Header>
                <Modal.Content>
                  <OrderInfo order={order} />
                </Modal.Content>
              </Modal>
            </Route>
          )}
        </Switch>
      )}
    </AppLayout>
  );
}

export default App;
