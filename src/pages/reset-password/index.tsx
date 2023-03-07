import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { authModel } from 'entities/auth';

import { Messages } from 'shared/config';
import { getErrorMessage, useAppDispatch, useAppHistory, useForm } from 'shared/lib';

import styles from './styles.module.css';

const initFormData: TResetPasswordParams = { password: '', token: '' };

const ResetPasswordPage: React.FC = () => {
  const [form, setValue] = useState<TResetPasswordParams>(initFormData);
  const history = useAppHistory();
  const dispatch = useAppDispatch();
  const { error } = authModel.useAuth();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue({ ...form, [name]: value });
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    dispatch(authModel.actions.resetPassword(form))
      .unwrap()
      .then(({ success }) => {
        if (success) {
          history.replace({ pathname: '/login' });
        }
      });
  };

  const formRef = useForm(handleSubmit);

  const isIncorrectToken = useMemo(() => {
    if (error) {
      const msg = getErrorMessage(error);
      return msg === Messages.INCORRECT_RESET_TOKEN;
    }
    return false;
  }, [error]);

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
