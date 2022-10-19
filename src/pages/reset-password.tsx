import { FC } from 'react';
import { ResetPasswordForm } from '../components/reset-password-form';
import styles from './reset-password.module.css';

export const ResetPasswordPage: FC = () => {
  return (
    <main className={styles.container}>
      <ResetPasswordForm />
    </main>
  );
};
