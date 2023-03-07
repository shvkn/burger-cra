import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import useForm from 'hooks/use-form';

import { authModel } from 'entities/auth';

import { useAppDispatch, useAppHistory } from 'shared/lib';

import styles from './styles.module.css';

const initFormData: TGetResetCodeParams = {
  email: '',
};

const ForgotPasswordPage: React.FC = () => {
  const history = useAppHistory();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    dispatch(authModel.actions.getResetCode(form))
      .unwrap()
      .then((response) => {
        if (response.success) {
          history.replace({
            pathname: '/reset-password',
            state: { from: history.location },
          });
        }
      })
      .catch(() => {});
  };
  const [form, setValue] = useState<TGetResetCodeParams>(initFormData);
  const formRef = useForm(handleSubmit);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue({ ...form, [name]: value });
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
