import { AppHeader } from '../components/app-header/app-header';
import { RegisterForm } from '../components/register-form';
import styles from './register.module.css';

export const RegisterPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <RegisterForm />
      </main>
    </>
  );
};
