import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { authModel } from 'entities/auth';

import { useAppDispatch } from 'shared/lib';

export const ResetPasswordFrom: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { control, handleSubmit } = useForm<TResetPasswordParams>({
    defaultValues: {
      password: '',
      token: '',
    },
  });

  const onSubmit = (data: TResetPasswordParams) => {
    dispatch(authModel.actions.resetPassword(data))
      .unwrap()
      .then((response) => {
        if (response.success) history.replace({ pathname: '/login' });
      });
  };

  return (
    <form className={`mb-20`} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
      <Controller
        name={'password'}
        control={control}
        render={({ field: { name, value, onChange } }) => {
          return (
            <PasswordInput
              name={name}
              value={value}
              onChange={onChange}
              extraClass={'mt-6 mb-6'}
              placeholder={'Введите новый пароль'}
            />
          );
        }}
      />
      <Controller
        name={'token'}
        control={control}
        render={({ field: { name, value, onChange } }) => {
          // TODO Обработать ошибку
          return (
            <Input
              extraClass={'mt-6 mb-6'}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={'Введите код из письма'}
              errorText={'Введен неверный код'}
            />
          );
        }}
      />
      <Button htmlType={'submit'} type={'primary'} size={'large'}>
        Сохранить
      </Button>
    </form>
  );
};
