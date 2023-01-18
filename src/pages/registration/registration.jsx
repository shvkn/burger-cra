import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../page.module.css';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as authActions from 'services/actions/auth';

function RegistrationPage() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const formRef = useRef();

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(authActions.register(form));
    },
    [form, dispatch]
  );

  useEffect(() => {
    const formRefValue = formRef.current;
    formRefValue?.addEventListener('submit', handleRegister);
    return () => formRefValue?.removeEventListener('submit', handleRegister);
  }, [handleRegister]);

  return (
    <div className={`${styles.container}`}>
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
        />
        <PasswordInput
          extraClass={'mt-6 mb-6'}
          name={'password'}
          value={form.password}
          onChange={onChange}
          placeholder={'Пароль'}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'} onClick={handleRegister}>
          Зарегистрироваться
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Уже зарегистрированы?{' '}
        <Link to='/login' className={`${styles.link} text_color_accent`}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default RegistrationPage;
