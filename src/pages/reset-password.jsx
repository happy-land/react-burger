import { AppHeader } from '../components/app-header/app-header';
import { ResetPasswordForm } from '../components/reset-password-form';
import styles from './reset-password.module.css';

export const ResetPasswordPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <ResetPasswordForm />
      </main>
    </>
  );
};