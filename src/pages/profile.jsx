import { AppHeader } from '../components/app-header/app-header';
import { Profile } from '../components/profile';
import styles from './profile.module.css';

export const ProfilePage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <Profile />
      </main>
    </>
  );
};