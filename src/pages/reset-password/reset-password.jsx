import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './reset-password.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'services/selectors/auth';
import * as authActions from 'services/actions/auth';

function ResetPasswordPage() {
  const [form, setValue] = useState({ password: '', token: '' });
  const history = useHistory();
  const formRef = useRef();
  const dispatch = useDispatch();
  const error = useSelector(authSelectors.selectError);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const isIncorrectToken = useMemo(() => {
    return error === 'Incorrect reset token';
  }, [error]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const resetPassword = () => dispatch(authActions.resetPassword(form)).unwrap();
      const goNext = (response) => {
        if (response.success) {
          history.replace({ pathname: '/login' });
        }
      };
      resetPassword().then(goNext);
    },
    [dispatch, history, form]
  );

  useEffect(() => {
    const formRefValue = formRef.current;
    formRefValue?.addEventListener('submit', handleSubmit);
    return () => formRefValue?.removeEventListener('submit', handleSubmit);
  }, [handleSubmit]);

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
          error={isIncorrectToken}
          errorText={'Введен неверный код'}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'} onClick={handleSubmit}>
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
