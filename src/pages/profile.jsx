import { Profile } from '../components/profile';
import styles from './profile.module.css';

export const ProfilePage = () => {
  return (
    <main className={styles.container}>
      <Profile />
    </main>
  );
};
