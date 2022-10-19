import { FC } from 'react';
import { LoginForm } from '../components/login-form';
import styles from './login.module.css';

export const LoginPage: FC = () => {
  return (
    <main className={styles.container}>
      <LoginForm />
    </main>
  );
};
