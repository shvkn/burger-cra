import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as authActions from 'services/actions/auth';

function LoginPage() {
  const [form, setValue] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const formRef = useRef();
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(authActions.login(form));
    },
    [form, dispatch]
  );

  useEffect(() => {
    const formRefValue = formRef.current;
    formRefValue?.addEventListener('submit', handleLogin);
    return () => formRefValue?.removeEventListener('submit', handleLogin);
  }, [handleLogin]);

  return (
    <main className={`${styles.layout}`}>
      <form className={`mb-20`} ref={formRef}>
        <h1 className={'text text_type_main-medium'}>Вход</h1>
        <EmailInput
          extraClass={'mt-6 mb-6'}
          name={'email'}
          value={form.email}
          onChange={onChange}
          placeholder={'E-mail'}
        />
        <PasswordInput
          extraClass={'mb-6'}
          name={'password'}
          value={form.password}
          onChange={onChange}
          placeholder={'Пароль'}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'} onClick={handleLogin}>
          Войти
        </Button>
      </form>
      <ul className={styles.links}>
        <li className={'mb-4'}>
          <p className={'text text_type_main-default text_color_inactive'}>
            Вы новый пользователь?
            <Link to='/register' className={`ml-2 ${styles.link} text_color_accent`}>
              Зарегистрироваться
            </Link>
          </p>
        </li>
        <li>
          <p className={'text text_type_main-default text_color_inactive'}>
            Забыли пароль?
            <Link to='/forgot-password' className={`ml-2 ${styles.link} text_color_accent`}>
              Восстановить пароль
            </Link>
          </p>
        </li>
      </ul>
    </main>
  );
}

export default LoginPage;
