import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './profile.module.css';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../utils/selectors';
import { logout, patchUser } from '../../services/actions/auth';
import { userOrdersWsActions } from '../../services/slices/user-orders';
import { getAccessToken } from '../../utils/utils';

function ProfilePage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const user = useSelector(selectUser);
  const { url, path } = useRouteMatch();
  const isFormChanged = user?.name !== form.name || user?.email !== form.email;
  const dispatch = useDispatch();
  const formRef = useRef();

  useEffect(() => {
    const accessToken = getAccessToken();
    dispatch(userOrdersWsActions.connect({ accessToken }));
  }, [dispatch]);

  useEffect(() => {
    setForm({ name: user.name, email: user.email, password: '' });
  }, [user]);

  const updateUser = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(patchUser(form));
    },
    [dispatch, form]
  );

  useEffect(() => {
    const formRefValue = formRef.current;
    formRefValue?.addEventListener('submit', updateUser);
    return () => formRefValue?.removeEventListener('submit', updateUser);
  }, [updateUser]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetChanges = (e) => {
    e.preventDefault();
    setForm({ name: user.name, email: user.email, password: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <ul className={styles.links}>
          <li className={'pt-4 pb-4'}>
            <NavLink
              exact
              to='/profile'
              className={(isActive) => {
                return `${styles.link} text text_type_main-medium ${
                  isActive ? 'text_color_primary' : 'text_color_inactive'
                }`;
              }}
            >
              Профиль
            </NavLink>
          </li>
          <li className={'pt-4 pb-4'}>
            <NavLink
              exact
              to={`${url}/orders`}
              className={(isActive) => {
                return `${styles.link} text text_type_main-medium ${
                  isActive ? 'text_color_primary' : 'text_color_inactive'
                }`;
              }}
            >
              Заказы
            </NavLink>
          </li>
          <li className={'pt-4 pb-4'}>
            <NavLink
              exact
              to={`${url}/logout`}
              className={(isActive) => {
                return `${styles.link} text text_type_main-medium ${
                  isActive ? 'text_color_primary' : 'text_color_inactive'
                }`;
              }}
              onClick={() => dispatch(logout())}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`mt-20 text text_type_main-default text_color_inactive`}>
          <Switch>
            <Route exact path={path}>
              В этом разделе вы можете изменить свои персональные данные
            </Route>
            <Route path={`${path}/orders`}>
              В этом разделе вы можете просмотреть свою историю заказов
            </Route>
          </Switch>
        </p>
      </div>
      <div className={`ml-15`}>
        <Route exact path={path}>
          <form ref={formRef}>
            <Input
              value={form.name}
              name={'name'}
              placeholder={'Имя'}
              onChange={onChange}
              icon={'EditIcon'}
            />
            <EmailInput
              value={form.email}
              name={'email'}
              placeholder={'E-mail'}
              onChange={onChange}
              icon={'EditIcon'}
              extraClass={'mt-6'}
            />
            <PasswordInput
              value={form.password}
              name={'password'}
              placeholder={'Пароль'}
              onChange={onChange}
              icon={'EditIcon'}
              extraClass={'mt-6'}
            />
            {isFormChanged && (
              <div className={`mt-10 ${styles.buttons}`}>
                <Button htmlType={'submit'}>Сохранить</Button>

                <Button htmlType={'reset'} onClick={resetChanges} extraClass={'ml-4'}>
                  Отменить
                </Button>
              </div>
            )}
          </form>
        </Route>
        <Route exact path={`${path}/orders`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </Route>
      </div>
    </div>
  );
}

export default ProfilePage;
