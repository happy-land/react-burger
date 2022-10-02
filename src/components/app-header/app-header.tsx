import { FC } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


export const AppHeader:FC = () => {

  const isRoot: boolean = !!useRouteMatch({ path: '/', exact: true });
  const isFeed: boolean = !!useRouteMatch('/feed');
  const isProfile: boolean = !!useRouteMatch('/profile');


  return (
    <header className={styles.header}>
      <nav className={`${styles.content} pt-4 pb-4`}>
        <ul className={styles.navLinks}>
          <li className={`${styles.listItem} pt-5 pr-5 pb-5 mr-2`}>
            <NavLink
              to='/'
              className={styles.link}
              activeClassName={isRoot ? styles.linkActive : styles.link}
            >
              <div className={styles.linkContent}>
                <BurgerIcon type={isRoot ? 'primary' : 'secondary'} />
                <span className={`text text_type_main-default ml-2`}>Конструктор</span>
              </div>
            </NavLink>
          </li>
          <li className={`${styles.listItem} p-5`}>
            <NavLink
              to='/feed'
              className={`${styles.link} ${styles.link_disabled}`}
              activeClassName={isFeed ? styles.linkActive : styles.link}
            >
              <div className={styles.linkContent}>
                <ListIcon type={isFeed ? 'primary' : 'secondary'} />
                <span className={`text text_type_main-default ml-2`}>Лента заказов</span>
              </div>
            </NavLink>
          </li>
        </ul>
        <NavLink to='/'>
          <Logo/>
        </NavLink>
        <div className={styles.profileContainer}>
          <NavLink
            to='/profile'
            className={styles.link}
            activeClassName={isProfile ? styles.linkActive : styles.link}
          >
            <div className={styles.linkContent}>
              <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
              <span className={`text text_type_main-default ml-2`}>Личный кабинет</span>
            </div>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
