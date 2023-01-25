import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './forgot-password.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as authActions from 'services/actions/auth';

function ForgotPasswordPage() {
  const [form, setValue] = useState({ email: '' });
  const history = useHistory();
  const formRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const getResetCode = () => dispatch(authActions.getResetCode(form)).unwrap();
      const goNext = (response) => {
        if (response.success) {
          history.replace({
            pathname: '/reset-password',
            state: { from: history.location },
          });
        }
      };
      getResetCode().then(goNext);
    },
    [dispatch, form, history]
  );

  useEffect(() => {
    const formRefValue = formRef.current;
    formRefValue?.addEventListener('submit', handleSubmit);
    return () => formRefValue?.removeEventListener('submit', handleSubmit);
  }, [handleSubmit]);

  const onChange = (e) => {
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
}

export default ForgotPasswordPage;
