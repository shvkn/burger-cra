import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { IngredientModal } from 'widgets/ingredient-modal';
import { OrderModal } from 'widgets/order-modal';
import { UserOrderModal } from 'widgets/user-order-modal';

import { ProtectedRoute } from 'entities/auth';

import { useAppLocation } from 'shared/lib';

const ConstructorPage = lazy(() => import('./constructor'));
const FeedPage = lazy(() => import('./feed'));
const ForgotPasswordPage = lazy(() => import('./forgot-password'));
const IngredientPage = lazy(() => import('./ingredient'));
const LoginPage = lazy(() => import('./login'));
const LogoutPage = lazy(() => import('./logout'));
const NotFoundedPage = lazy(() => import('./not-founded'));
const OrderPage = lazy(() => import('./order'));
const ProfilePage = lazy(() => import('./profile'));
const RegistrationPage = lazy(() => import('./registration'));
const ResetPasswordPage = lazy(() => import('./reset-password'));
const UserOrderPage = lazy(() => import('./user-order'));

export const Routes: React.FC = () => {
  const location = useAppLocation();
  const background = location.state?.background;
  return (
    <>
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
        <Route path='/logout' component={LogoutPage} />
        <Route path='*' component={NotFoundedPage} />
      </Switch>
      {background && (
        <Switch>
          <Route path='/profile/orders/:id' component={UserOrderModal} />
          <Route path='/ingredient/:id' component={IngredientModal} />
          <Route path='/feed/:id' component={OrderModal} />
        </Switch>
      )}
    </>
  );
};
