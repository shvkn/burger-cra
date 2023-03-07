import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { authModel } from 'entities/auth';

import { useAppDispatch } from 'shared/lib';

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<TLoginParams>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = ({ email, password }: TLoginParams) =>
    dispatch(authModel.actions.login({ email, password }));

  return (
    <form className={`mb-20`} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={'text text_type_main-medium'}>Вход</h1>
      <Controller
        name={'email'}
        control={control}
        render={({ field }) => {
          const { ref, ...props } = field;
          return <EmailInput {...props} extraClass={'mt-6 mb-6'} placeholder={'E-mail'} />;
        }}
      />
      <Controller
        name={'password'}
        control={control}
        render={({ field }) => {
          const { ref, ...props } = field;
          return <PasswordInput {...props} extraClass={'mb-6'} placeholder={'Пароль'} />;
        }}
      />
      <Button htmlType={'submit'} type={'primary'} size={'large'}>
        Войти
      </Button>
    </form>
  );
};
