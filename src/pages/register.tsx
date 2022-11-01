import { FC } from 'react';
import { RegisterForm } from '../components/register-form';
import styles from './register.module.css';

export const RegisterPage: FC = () => {
  return (
    <main className={styles.container}>
      <RegisterForm />
    </main>
  );
};
