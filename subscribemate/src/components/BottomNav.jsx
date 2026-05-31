import styles from './BottomNav.module.css';

function IconSubscriptions({ active }) {
  const color = active ? 'var(--color-primary)' : 'var(--color-muted)';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="3.5" rx="1.5" fill={color} opacity={active ? 1 : 0.5} />
      <rect x="4" y="10.25" width="16" height="3.5" rx="1.5" fill={color} opacity={active ? 1 : 0.5} />
      <rect x="4" y="16.5" width="10" height="3.5" rx="1.5" fill={color} opacity={active ? 1 : 0.5} />
    </svg>
  );
}

function IconDiscover({ active }) {
  const color = active ? 'var(--color-primary)' : 'var(--color-muted)';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" opacity={active ? 1 : 0.6} />
      <path d="M17 17L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={active ? 1 : 0.6} />
    </svg>
  );
}

export default function BottomNav({ currentTab, onTabChange }) {
  return (
    <nav className={styles.nav}>
      <button
        className={`${styles.tab} ${currentTab === 'subscriptions' ? styles.active : ''}`}
        onClick={() => onTabChange('subscriptions')}
      >
        <span className={styles.icon}>
          <IconSubscriptions active={currentTab === 'subscriptions'} />
        </span>
        <span className={styles.label}>내 구독</span>
      </button>
      <button
        className={`${styles.tab} ${currentTab === 'discover' ? styles.active : ''}`}
        onClick={() => onTabChange('discover')}
      >
        <span className={styles.icon}>
          <IconDiscover active={currentTab === 'discover'} />
        </span>
        <span className={styles.label}>탐색·추천</span>
      </button>
    </nav>
  );
}
