import React from 'react';
import styles from './not-founded.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';

function NotFoundedPage() {
  const history = useHistory();
  const handleClick = () => {
    history.replace({ pathname: '/' });
  };
  return (
    <main className={styles.layout}>
      <h1 className={'text text_type_main-large text_color_error'}>404</h1>
      <p className={'mt-8 mb-15 text text_type_main-medium'}>Похоже вы потерялись :(</p>
      <Button htmlType={'button'} onClick={handleClick}>
        На главную
      </Button>
    </main>
  );
}

export default NotFoundedPage;
