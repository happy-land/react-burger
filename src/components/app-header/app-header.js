import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export const AppHeader = () => {
  let location = useLocation();

  const { url } = useRouteMatch();
  let isRoot;
  let isOrders;
  let isProfile;

  url === '/' ? (isRoot = true) : (isRoot = false);
  url === '/orders/123' ? (isOrders = true) : (isOrders = false);
  url === '/profile' ? (isProfile = true) : (isProfile = false);

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
              to='/orders'
              className={`${styles.link} ${styles.link_disabled}`}
              activeClassName={isOrders ? styles.linkActive : styles.link}
            >
              <div className={styles.linkContent}>
                <ListIcon type={isOrders ? 'primary' : 'secondary'} />
                <span className={`text text_type_main-default ml-2`}>Лента заказов</span>
              </div>
            </NavLink>
          </li>
        </ul>
        <Logo className={styles.logo} />
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

  // return (
  //   <header className={styles.header}>
  //     <nav className={`${styles.content} pt-4 pb-4`}>
  //       <ul className={styles.navLinks}>
  //         <li className={`${styles.listItem} pt-5 pr-5 pb-5 mr-2`}>
  //           <NavLink
  //             to='/'
  //             className={styles.link}
  //             activeClassName={isRoot ? styles.linkActive : styles.link}
  //           >
  //             <div className={styles.linkContent}>
  //               <BurgerIcon type={isRoot ? 'primary' : 'secondary'} />
  //               <span className={`text text_type_main-default ml-2`}>Конструктор</span>
  //             </div>
  //           </NavLink>
  //         </li>
  //         <li className={`${styles.listItem} p-5`}>
  //           <NavLink
  //             to='/orders'
  //             className={`${styles.link} ${styles.link_disabled}`}
  //             activeClassName={isOrders ? styles.linkActive : styles.link}
  //           >
  //             <div className={styles.linkContent}>
  //               <ListIcon type={isOrders ? 'primary' : 'secondary'} />
  //               <span className={`text text_type_main-default ml-2`}>
  //                 Лента заказов
  //               </span>
  //             </div>
  //           </NavLink>
  //         </li>
  //       </ul>
  //       <Logo className={styles.logo} />
  //       <NavLink
  //         to='/profile'
  //         className={styles.link}
  //         activeClassName={isProfile ? styles.linkActive : styles.link}
  //       >
  //         <div className={styles.linkContent}>
  //           <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
  //           <span className={`text text_type_main-default ml-2`}>Личный кабинет</span>
  //         </div>
  //       </NavLink>
  //     </nav>
  //   </header>
  // );
};
