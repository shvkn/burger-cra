import React, { ChangeEvent, FC, SyntheticEvent, useMemo, useState } from 'react';
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
import useForm from 'hooks/use-form';
import { getChangedEntries } from 'utils/utils';

type TUserFormData = Required<TPatchUserData>;

const UserForm: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(authSelectors.selectUser);

  const initFormData: TUserFormData = useMemo(
    () => ({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    }),
    [user]
  );

  const [form, setForm] = useState<TUserFormData>(initFormData);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    dispatch(authActions.patchUser(getChangedEntries(initFormData, form)));
  };
  const formRef = useForm(handleSubmit);
  const isFormChanged = JSON.stringify(initFormData) !== JSON.stringify(form);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    name && value && setForm({ ...form, [name]: value });
  };

  const handleReset = (e: SyntheticEvent): void => {
    e.preventDefault();
    setForm(initFormData);
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
