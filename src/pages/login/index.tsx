import React from 'react';
import { Link } from 'react-router-dom';

import { LoginForm } from 'features/login';

import styles from './styles.module.css';

const LoginPage: React.FC = () => (
  <main className={`${styles.layout}`}>
    <LoginForm />
    <ul className={styles.links}>
      <li className={'mb-4'}>
        <p className={'text text_type_main-default text_color_inactive'}>
          Вы новый пользователь?
          <Link to='/register' className={`ml-2 ${styles.link} text_color_accent`}>
            Зарегистрироваться
          </Link>
        </p>
      </li>
      <li>
        <p className={'text text_type_main-default text_color_inactive'}>
          Забыли пароль?
          <Link to='/forgot-password' className={`ml-2 ${styles.link} text_color_accent`}>
            Восстановить пароль
          </Link>
        </p>
      </li>
    </ul>
  </main>
);

export default LoginPage;
