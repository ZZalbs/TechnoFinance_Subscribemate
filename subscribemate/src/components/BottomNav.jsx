import styles from './BottomNav.module.css';

export default function BottomNav({ currentTab, onTabChange }) {
  return (
    <nav className={styles.nav}>
      <button
        className={`${styles.tab} ${currentTab === 'subscriptions' ? styles.active : ''}`}
        onClick={() => onTabChange('subscriptions')}
      >
        <span className={styles.icon}>📋</span>
        <span className={styles.label}>내 구독</span>
      </button>
      <button
        className={`${styles.tab} ${currentTab === 'discover' ? styles.active : ''}`}
        onClick={() => onTabChange('discover')}
      >
        <span className={styles.icon}>🔍</span>
        <span className={styles.label}>탐색·추천</span>
      </button>
    </nav>
  );
}
