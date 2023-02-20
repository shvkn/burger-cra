import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './forgot-password.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import * as authActions from 'services/actions/auth';
import { useAppDispatch, useAppHistory } from 'services/slices';
import { TBaseResponseBody } from 'services/types/response';

const ForgotPasswordPage: FC = () => {
  const [form, setValue] = useState({ email: '' });
  const history = useAppHistory();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();

      const redirect = <T extends TBaseResponseBody>(response: T): T => {
        if (response.success) {
          history.replace({
            pathname: '/reset-password',
            state: { from: history.location },
          });
        }
        return response;
      };

      dispatch(authActions.getResetCode(form)).unwrap().then(redirect);
    },
    [dispatch, form, history]
  );

  useEffect(() => {
    const formRefValue = formRef.current;
    formRefValue?.addEventListener('submit', handleSubmit);
    return () => formRefValue?.removeEventListener('submit', handleSubmit);
  }, [handleSubmit]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className={`${styles.layout}`}>
      <form className={`mb-20`} ref={formRef}>
        <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
        <EmailInput
          extraClass={'mt-6 mb-6'}
          name={'email'}
          value={form.email}
          onChange={onChange}
          placeholder={'E-mail'}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'}>
          Восстановить
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

export default ForgotPasswordPage;
