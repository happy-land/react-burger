import { AppHeader } from '../components/app-header/app-header';
import { LoginForm } from '../components/login-form';
import styles from './login.module.css';

export const LoginPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <LoginForm />
      </main>
    </>
  );
};
