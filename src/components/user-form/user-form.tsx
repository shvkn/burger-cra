import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from 'pages/profile/profile.module.css';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import * as authActions from 'services/actions/auth';
import authSelectors from 'services/selectors/auth';
import { useAppDispatch, useAppSelector } from 'services/slices';
import { TPatchUserData } from 'services/types';

const UserForm: FC = () => {
  const user = useAppSelector(authSelectors.selectUser);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<Required<TPatchUserData>>({ name: '', email: '', password: '' });
  const isFormChanged = !!user && (user.name !== form.name || user.email !== form.email);
  const dispatch = useAppDispatch();

  useEffect(() => {
    !!user && setForm({ ...user, password: '' });
  }, [user]);

  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      dispatch(authActions.patchUser(form));
    },
    [dispatch, form]
  );

  useEffect(() => {
    const formRefValue = formRef.current;
    formRefValue?.addEventListener('submit', handleSubmit);
    return () => formRefValue?.removeEventListener('submit', handleSubmit);
  }, [handleSubmit]);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    !!target && setForm({ ...form, [target.name]: target.value });
  };

  const handleReset = (e: SyntheticEvent): void => {
    e.preventDefault();
    !!user && setForm({ ...user, password: '' });
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
        isIcon={true}
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
          <Button htmlType={'reset'} type={'secondary'} onClick={handleReset} extraClass={'ml-4'}>
            Отменить
          </Button>
          <Button htmlType={'submit'}>Сохранить</Button>
        </div>
      )}
    </form>
  );
};

export default UserForm;
