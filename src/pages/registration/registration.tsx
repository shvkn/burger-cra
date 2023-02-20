import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './registration.module.css';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import * as authActions from 'services/actions/auth';
import { TRegisterParams } from 'services/types';
import { useAppDispatch } from 'services/slices';

const RegistrationPage: FC = () => {
  const [form, setValue] = useState<TRegisterParams>({ name: '', email: '', password: '' });
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
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
};

export default RegistrationPage;
