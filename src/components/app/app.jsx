import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import '@ya.praktikum/react-developer-burger-ui-components';

import {
  ConstructorPage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFoundedPage,
} from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/actions/auth';
import { fetchIngredients } from '../../services/actions/ingredients';
import FeedPage from '../../pages/feed/feed';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
  }, [dispatch]);

  const handleClose = (e) => {
    history.goBack();
  };

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
          <Route path='/feed' component={FeedPage} />
          <Route path='/ingredient/:id' component={IngredientPage} />
          <Route path='*' component={NotFoundedPage} />
        </Switch>
        {background && (
          <Route path='/ingredient/:id'>
            <Modal handleClose={handleClose} title='Детали ингредиента'>
              <IngredientDetails />
            </Modal>
          </Route>
        )}
      </main>
    </div>
  );
}

export default App;
