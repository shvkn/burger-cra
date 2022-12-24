import React, { useState } from 'react';
import styles from '../page.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { RouterPaths } from '../../utils/constants';
import { resetPasswordRequest } from '../../utils/burger-api';
import { useSelector } from 'react-redux';
import { selectIsUserAuthorized } from '../../utils/selectors';

function ResetPasswordPage() {
  const [form, setValue] = useState({ password: '', token: '' });
  const history = useHistory();
  const isAuthorized = useSelector(selectIsUserAuthorized);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const resetPassword = (e) => {
    e.preventDefault();
    resetPasswordRequest(form).then(({ success }) => {
      if (success) {
        history.replace({ pathname: RouterPaths.LOGIN });
      }
    });
  };

  if (isAuthorized || history.location.state?.from?.pathname !== RouterPaths.FORGOT_PASSWORD) {
    return <Redirect to={RouterPaths.BASE} />;
  }

  return (
    <div className={`mt-30 ${styles.container}`}>
      <form className={`mb-20`}>
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
        Вспомнили пароль?{' '}
        <Link to={RouterPaths.LOGIN} className={`${styles.link} text_color_accent`}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;