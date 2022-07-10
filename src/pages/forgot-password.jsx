import { RestorePasswordForm } from '../components/restore-password-form';
import styles from './forgot-password.module.css';

export const ForgotPasswordPage = () => {
  return (
    <main className={styles.container}>
      <RestorePasswordForm />
    </main>
  );
};
