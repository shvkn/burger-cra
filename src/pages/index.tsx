import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'components/protected-route';
import UserOrderModal from 'components/modals/user-order-modal/user-order-modal';
import IngredientModal from 'components/modals/ingredient-modal/ingredient-modal';
import OrderModal from 'components/modals/order-modal/order-modal';
import ConstructorPage from './constructor';
import LoginPage from './login';
import RegistrationPage from './registration';
import ForgotPasswordPage from './forgot-password';
import ResetPasswordPage from './reset-password';
import UserOrderPage from './user-order';
import ProfilePage from './profile';
import IngredientPage from './ingredient';
import OrderPage from './order';
import FeedPage from './feed';
import NotFoundedPage from './not-founded';
import { useAppLocation } from 'shared/lib';

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
