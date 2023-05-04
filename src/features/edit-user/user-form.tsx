import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { authModel } from 'entities/auth';

import { VALIDATION_RULES } from 'shared/config';
import { useAppDispatch } from 'shared/lib';

import styles from './user-form.module.css';

export const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = authModel.useAuth();
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, dirtyFields },
    reset,
    getValues,
  } = useForm<Required<TPatchUserData>>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      password: '',
    },
  });

  const onSubmit = () => {
    const data: TPatchUserData = Object.keys(dirtyFields).reduce(
      (acc, field) => ({
        ...acc,
        [field]: getValues(field as keyof TPatchUserData),
      }),
      {}
    );
    dispatch(authModel.actions.patchUser(data))
      .unwrap()
      .then(() => {
        reset({}, { keepValues: true });
      });
  };

  return (
    <form className={`mt-20 ${styles.form}`} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name={'name'}
        control={control}
        rules={VALIDATION_RULES.NAME}
        render={({ field }) => {
          const { ref, onBlur, ...props } = field;
          return <Input {...props} placeholder={'Имя'} />;
        }}
      />
      <Controller
        name={'email'}
        control={control}
        rules={VALIDATION_RULES.EMAIL}
        render={({ field }) => {
          const { ref, ...props } = field;
          return <EmailInput {...props} extraClass={'mt-6 mb-6'} placeholder={'E-mail'} />;
        }}
      />
      <Controller
        name={'password'}
        control={control}
        rules={VALIDATION_RULES.PASSWORD}
        render={({ field }) => {
          const { ref, ...props } = field;
          return (
            <PasswordInput
              {...props}
              extraClass={'mt-6'}
              placeholder={'Пароль'}
              icon={'EditIcon'}
            />
          );
        }}
      />
      {isDirty && isValid && (
        <div className={`mt-6 ${styles.buttons}`}>
          <Button
            htmlType={'reset'}
            type={'secondary'}
            onClick={() => reset({})}
            extraClass={'ml-4'}
          >
            Отменить
          </Button>
          <Button htmlType={'submit'}>Сохранить</Button>
        </div>
      )}
    </form>
  );
};
