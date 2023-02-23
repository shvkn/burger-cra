import React, { FC } from 'react';
import { BurgerIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './app-header.module.css';

const getLinkCN = (isActive: boolean) => {
  return `pt-4 pl-5 pb-4 pr-5 text text_type_main-default text_color_${
    isActive ? 'primary' : 'inactive'
  } ${styles.link}`;
};

const AppHeader: FC = () => {
  const isActiveFeed = useRouteMatch('/feed');
  const isActiveProfile = useRouteMatch('/profile');
  const isActiveConstructor = useRouteMatch({ path: '/', exact: true });

  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={`${styles.container}`}>
        <nav className={styles.nav}>
          <ul className={styles.items}>
            <li>
              <Link to={'/'} className={`${getLinkCN(!!isActiveConstructor)}`}>
                <BurgerIcon type={isActiveConstructor ? 'primary' : 'secondary'} />
                <span className='ml-2'>Конструктор</span>
              </Link>
            </li>
            <li>
              <Link to={'/feed'} className={`${getLinkCN(!!isActiveFeed)}`}>
                <BurgerIcon type={isActiveFeed ? 'primary' : 'secondary'} />
                <span className='ml-2'>Лента заказов</span>
              </Link>
            </li>
          </ul>
        </nav>
        <Link to={'/'}>
          <Logo />
        </Link>
        <nav className={`${styles.nav} ${styles.end}`}>
          <Link to={'/profile'} className={`${getLinkCN(!!isActiveProfile)}`}>
            <BurgerIcon type={isActiveProfile ? 'primary' : 'secondary'} />
            <span className='ml-2'>Личный кабинет</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
