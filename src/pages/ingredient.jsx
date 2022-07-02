import { AppHeader } from '../components/app-header/app-header';
import styles from './ingredient.module.css';

export const IngredientPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        Страница ингредиента
      </main>
    </>
  );
};