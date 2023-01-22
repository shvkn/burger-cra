import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './registration.module.css';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from 'services/actions/auth';
import authSelectors from '../../services/selectors/auth';

function RegistrationPage() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const formRef = useRef();

  const error = useSelector(authSelectors.selectError);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const isUserExist = useMemo(() => {
    return error === 'User already exists';
  }, [error]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(authActions.register(form));
    },
    [form, dispatch]
  );

  useEffect(() => {
    const formRefValue = formRef.current;
    formRefValue?.addEventListener('submit', handleSubmit);
    return () => formRefValue?.removeEventListener('submit', handleSubmit);
  }, [handleSubmit]);

  return (
    <main className={`${styles.layout}`}>
      <form className={`mb-20`} ref={formRef}>
        <h1 className={'text text_type_main-medium'}>Регистрация</h1>
        <Input
          extraClass={'mt-6 mb-6'}
          name={'name'}
          value={form.name}
          onChange={onChange}
          placeholder={'Имя'}
        />
        <EmailInput
          extraClass={'mt-6 mb-6'}
          name={'email'}
          value={form.email}
          onChange={onChange}
          placeholder={'E-mail'}
          error={isUserExist}
          errorText={'Пользователь с таким e-mail уже существует'}
        />
        <PasswordInput
          extraClass={'mt-6 mb-6'}
          name={'password'}
          value={form.password}
          onChange={onChange}
          placeholder={'Пароль'}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'}>
          Зарегистрироваться
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Уже зарегистрированы?
        <Link to='/login' className={`ml-2 ${styles.link} text_color_accent`}>
          Войти
        </Link>
      </p>
    </main>
  );
}

export default RegistrationPage;
