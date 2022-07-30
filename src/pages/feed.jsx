import { FeedOrderStats } from '../components/feed-order-stats';
import { FeedOrderList } from '../components/feed-order-list';
import styles from './feed.module.css';

export const FeedPage = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Лента заказов</h1>
      <div className={styles.feedWrapper}>
        <FeedOrderList />
        <FeedOrderStats />
      </div>
    </main>
  );
};
