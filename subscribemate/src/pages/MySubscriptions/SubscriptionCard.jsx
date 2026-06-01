import styles from './SubscriptionCard.module.css';

function getDDay(billingDate) {
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), billingDate);
  if (thisMonth < today) {
    thisMonth.setMonth(thisMonth.getMonth() + 1);
  }
  const diff = Math.ceil((thisMonth - today) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'D-Day';
  return `D-${diff}`;
}

export default function SubscriptionCard({ subscription, service, onToggle, onClick }) {
  const dday = getDDay(subscription.billing_date);
  const isUrgent = dday === 'D-Day' || dday === 'D-1' || dday === 'D-2' || dday === 'D-3';

  return (
    <div
      className={`${styles.card} ${!subscription.is_active ? styles.inactive : ''}`}
      onClick={onClick}
    >
      <div className={styles.logo}>{service.logo}</div>
      <div className={styles.info}>
        <p className={styles.name}>{service.name}</p>
        <p className={styles.plan}>{subscription.plan_name}</p>
      </div>
      <div className={styles.right}>
        <p className={styles.price}>{subscription.custom_price.toLocaleString('ko-KR')}원</p>
        <span className={`${styles.dday} ${isUrgent && subscription.is_active ? styles.urgent : ''}`}>
          {dday}
        </span>
      </div>
      <button
        className={`${styles.toggle} ${subscription.is_active ? styles.toggleOn : styles.toggleOff}`}
        onClick={e => { e.stopPropagation(); onToggle(); }}
        aria-label="구독 활성화 토글"
      >
        <span className={styles.toggleThumb} />
      </button>
    </div>
  );
}
