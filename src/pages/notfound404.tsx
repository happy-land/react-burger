import { FC } from 'react';
import styles from './notfound404.module.css';

export const NotFound404Page: FC = () => {
  return (
    <main className={styles.container}>
      <h1>Упс, страница не найдена.</h1>
    </main>
  );
};
