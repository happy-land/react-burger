import { FC } from 'react';
import { RestorePasswordForm } from '../components/restore-password-form';
import styles from './forgot-password.module.css';

export const ForgotPasswordPage: FC = () => {
  return (
    <main className={styles.container}>
      <RestorePasswordForm />
    </main>
  );
};
