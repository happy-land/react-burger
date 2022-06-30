import { Link } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';

export const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <nav className={`${headerStyles.content} pt-4 pb-4`}>
        <ul className={headerStyles.navLinks}>
          <li className={`${headerStyles.listItem} pt-5 pr-5 pb-5 mr-2`}>
            <Link to='/' className={headerStyles.link}>
              <div className={headerStyles.linkContent}>
                <BurgerIcon type='primary' />
                <span className={`text text_type_main-default ml-2`}>Конструктор</span>
              </div>
            </Link>
          </li>
          <li className={`${headerStyles.listItem} p-5`}>
            <a className={`${headerStyles.link} ${headerStyles.link_disabled}`} href='#'>
              <div className={headerStyles.linkContent}>
                <ListIcon type='secondary' />
                <span className={`text text_type_main-default text_color_inactive ml-2`}>
                  Лента заказов
                </span>
              </div>
            </a>
          </li>
        </ul>
        <Logo className={headerStyles.logo} />
        <Link to='/profile' className={headerStyles.link}>
          <div className={headerStyles.linkContent}>
            <ProfileIcon type='primary' />
            <span className={`text text_type_main-default ml-2`}>Личный кабинет</span>
          </div>
        </Link>
      </nav>
    </header>
  );
};
