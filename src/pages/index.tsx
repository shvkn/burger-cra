import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IngredientModal } from 'widgets/ingredient-modal';
import { OrderModal } from 'widgets/order-modal';
import { UserOrderModal } from 'widgets/user-order-modal';

import { ProtectedRoute } from 'entities/auth';

import { useAppLocation } from 'shared/lib';

import { ConstructorPage } from './constructor';
import { FeedPage } from './feed';
import { ForgotPasswordPage } from './forgot-password';
import { IngredientPage } from './ingredient';
import { LoginPage } from './login';
import { NotFoundedPage } from './not-founded';
import { OrderPage } from './order';
import { ProfilePage } from './profile';
import { RegistrationPage } from './registration';
import { ResetPasswordPage } from './reset-password';
import { UserOrderPage } from './user-order';

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
        <Route path='*' component={NotFoundedPage} />
      </Switch>
      ;
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
