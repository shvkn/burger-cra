import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
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
import ProtectedRoute from 'components/protected-route';
import AppLayout from 'components/app-layout/app-layout';
import UserOrderPage from 'pages/user-order/user-order';
import IngredientModal from 'components/modals/ingredient-modal/ingredient-modal';
import UserOrderModal from 'components/modals/user-order-modal/user-order-modal';
import OrderModal from 'components/modals/order-modal/order-modal';
import { useAppDispatch, useAppLocation } from 'services/slices';
import { ingredientModel } from 'entities/ingredient';

const App: FC = () => {
  const location = useAppLocation();
  const dispatch = useAppDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(ingredientModel.actions.getIngredientsAsync());
  }, [dispatch]);

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
        <Route path='/feed/:id' component={OrderPage} />
        <Route path='/feed' component={FeedPage} />
        <Route path='*' component={NotFoundedPage} />
      </Switch>
      {background && (
        <Switch>
          <Route path='/profile/orders/:id' component={UserOrderModal} />
          <Route path='/ingredient/:id' component={IngredientModal} />
          <Route path='/feed/:id' component={OrderModal} />
        </Switch>
      )}
    </AppLayout>
  );
};

export default App;
