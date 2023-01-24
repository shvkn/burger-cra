import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from 'pages/profile/profile.module.css';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import * as authActions from 'services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'services/selectors/auth';

function UserForm() {
  const user = useSelector(authSelectors.selectUser);
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const isFormChanged = user?.name !== form.name || user?.email !== form.email;

  const dispatch = useDispatch();

  useEffect(() => {
    setForm({ name: user.name, email: user.email, password: '' });
  }, [user]);

  const handlePatchUser = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(authActions.patchUser(form));
    },
    [dispatch, form]
  );

  useEffect(() => {
    const formRefValue = formRef.current;
    formRefValue?.addEventListener('submit', handlePatchUser);
    return () => formRefValue?.removeEventListener('submit', handlePatchUser);
  }, [handlePatchUser]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetChanges = (e) => {
    e.preventDefault();
    setForm({ name: user.name, email: user.email, password: '' });
  };

  return (
    <form className={`mt-20 ${styles.form}`} ref={formRef}>
      <Input
        value={form.name}
        name={'name'}
        placeholder={'Имя'}
        onChange={onChange}
        icon={'EditIcon'}
      />
      <EmailInput
        value={form.email}
        name={'email'}
        placeholder={'E-mail'}
        onChange={onChange}
        icon={'EditIcon'}
        extraClass={'mt-6'}
      />
      <PasswordInput
        value={form.password}
        name={'password'}
        placeholder={'Пароль'}
        onChange={onChange}
        icon={'EditIcon'}
        extraClass={'mt-6'}
      />
      {isFormChanged && (
        <div className={`mt-6 ${styles.buttons}`}>
          <Button htmlType={'reset'} type={'secondary'} onClick={resetChanges} extraClass={'ml-4'}>
            Отменить
          </Button>
          <Button htmlType={'submit'}>Сохранить</Button>
        </div>
      )}
    </form>
  );
}

export default UserForm;
