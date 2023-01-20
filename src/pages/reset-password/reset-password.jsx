import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './reset-password.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { resetPasswordRequest } from 'utils/auth-api';

function ResetPasswordPage() {
  const [form, setValue] = useState({ password: '', token: '' });
  const history = useHistory();
  const formRef = useRef();

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const resetPassword = useCallback(
    (e) => {
      e.preventDefault();
      resetPasswordRequest(form).then(({ success, message }) => {
        if (success) {
          history.replace({ pathname: '/login' });
        } else {
          if (message === 'Incorrect reset token') {
            alert('Введен неверный код');
          }
        }
      });
    },
    [form, history]
  );

  useEffect(() => {
    const formRefValue = formRef.current;
    formRefValue?.addEventListener('submit', resetPassword);
    return () => formRefValue?.removeEventListener('submit', resetPassword);
  }, [resetPassword]);

  if (history.location.state?.from?.pathname !== '/forgot-password') {
    return <Redirect to='/' />;
  }

  return (
    <main className={`mt-30 ${styles.layout}`}>
      <form className={`mb-20`} ref={formRef}>
        <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
        <PasswordInput
          extraClass={'mt-6 mb-6'}
          name={'password'}
          value={form.password}
          onChange={onChange}
          placeholder={'Введите новый пароль'}
        />
        <Input
          extraClass={'mt-6 mb-6'}
          name={'token'}
          value={form.token}
          onChange={onChange}
          placeholder={'Введите код из письма'}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'} onClick={resetPassword}>
          Сохранить
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Вспомнили пароль?
        <Link to='/login' className={`ml-2 ${styles.link} text_color_accent`}>
          Войти
        </Link>
      </p>
    </main>
  );
}

export default ResetPasswordPage;
