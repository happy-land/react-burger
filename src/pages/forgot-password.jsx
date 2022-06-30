import { AppHeader } from '../components/app-header/app-header';
import { RestorePasswordForm } from '../components/restore-password-form';
import styles from './forgot-password.module.css';

export const ForgotPasswordPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <RestorePasswordForm />
      </main>
    </>
  );
};