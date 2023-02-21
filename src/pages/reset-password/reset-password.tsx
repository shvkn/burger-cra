import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './reset-password.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import authSelectors from 'services/selectors/auth';
import * as authActions from 'services/actions/auth';
import { TResetPasswordParams } from 'services/types';
import { useAppDispatch, useAppHistory, useAppSelector } from 'services/slices';
import { TBaseResponseBody } from 'services/types/response';

const ResetPasswordPage: FC = () => {
  const [form, setValue] = useState<TResetPasswordParams>({ password: '', token: '' });
  const history = useAppHistory();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const error = useAppSelector(authSelectors.selectError);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const isIncorrectToken = useMemo(() => {
    return error.message === 'Incorrect reset token';
  }, [error]);

  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      const resetPassword = () => dispatch(authActions.resetPassword(form)).unwrap();
      const redirect = <T extends TBaseResponseBody>(response: T) => {
        if (response.success) {
          history.replace({ pathname: '/login' });
        }
        return response;
      };
      resetPassword().then(redirect);
    },
    [dispatch, history, form]
  );
  // TODO Вынести в useForm?
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
        <Button htmlType={'submit'} type={'primary'} size={'large'}>
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
};

export default ResetPasswordPage;
