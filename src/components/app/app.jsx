import React, { useEffect, useMemo } from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
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
import * as ingredientsActions from 'services/actions/ingredients';
import ordersSelectors from 'services/selectors/orders';
import userOrdersSelectors from 'services/selectors/user-orders';
import * as ordersWSActions from 'services/actions/orders';
import AppLayout from 'components/app-layout/app-layout';
import UserOrderPage from 'pages/user-order/user-order';
import IngredientModal from 'components/ingredient-modal/ingredient-modal';
import UserOrderModal from 'components/user-order-modal/user-order-modal';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();

  const feedOrders = useSelector(ordersSelectors.selectEntities);
  const userOrders = useSelector(userOrdersSelectors.selectEntities);

  useEffect(() => {
    dispatch(ingredientsActions.fetch());
    dispatch(ordersWSActions.connect());
  }, [dispatch]);

  const matchOrderId = useRouteMatch({ path: '/(profile/orders|feed)/:id', exact: true });
  const order = useMemo(() => {
    if (!matchOrderId) {
      return null;
    }
    const id = matchOrderId.params.id;
    return feedOrders[id] ?? userOrders[id];
  }, [matchOrderId, feedOrders, userOrders]);

  return (
    <AppLayout>
      <Switch location={background ?? location}>
        <Route exact path='/' component={ConstructorPage} />
        <ProtectedRoute nonAuthOnly path='/login' component={LoginPage} />
        <ProtectedRoute nonAuthOnly path='/register' component={RegistrationPage} />
        <ProtectedRoute nonAuthOnly path='/forgot-password' component={ForgotPasswordPage} />
        <ProtectedRoute nonAuthOnly path='/reset-password' component={ResetPasswordPage} />
        <ProtectedRoute path='/profile/orders/:id' component={UserOrderPage} />
        <ProtectedRoute path='/profile' component={ProfilePage} />
        <Route path='/ingredient/:id' component={IngredientPage} />
        {order && (
          <Route path='/feed/:id'>
            <OrderPage order={order} />
          </Route>
        )}
        <Route path='/feed' component={FeedPage} />
        <Route path='*' component={NotFoundedPage} />
      </Switch>
      {background && (
        <Switch>
          <Route path='/ingredient/:id' component={IngredientModal} />
          <Route path={'/profile/orders/:id'} component={UserOrderModal} />
        </Switch>
      )}
    </AppLayout>
  );
}

export default App;
