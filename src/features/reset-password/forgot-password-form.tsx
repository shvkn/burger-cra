import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { authModel } from 'entities/auth';

import { useAppDispatch, useAppHistory } from 'shared/lib';

export const ForgotPasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useAppHistory();

  const { control, handleSubmit } = useForm<TGetResetCodeParams>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: TGetResetCodeParams) => {
    dispatch(authModel.actions.getResetCode(data))
      .unwrap()
      .then((response) => {
        if (response.success) {
          history.replace({
            pathname: '/reset-password',
            state: { from: history.location },
          });
        }
      });
  };

  return (
    <form className={`mb-20`} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
      <Controller
        name={'email'}
        control={control}
        render={({ field: { name, value, onChange } }) => {
          return (
            <EmailInput
              extraClass={'mt-6 mb-6'}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={'E-mail'}
            />
          );
        }}
      />
      <Button htmlType={'submit'} type={'primary'} size={'large'}>
        Восстановить
      </Button>
    </form>
  );
};
