import { RegisterForm } from '../components/register-form';
import styles from './register.module.css';

export const RegisterPage = () => {
  return (
    <main className={styles.container}>
      <RegisterForm />
    </main>
  );
};
