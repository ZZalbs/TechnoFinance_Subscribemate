import styles from './Dashboard.module.css';

function getNextPayment(subscriptions, services) {
  const today = new Date();
  const active = subscriptions.filter(s => s.is_active);
  if (active.length === 0) return null;

  let nearest = null;
  let nearestDiff = Infinity;

  active.forEach(sub => {
    const d = new Date(today.getFullYear(), today.getMonth(), sub.billing_date);
    if (d <= today) d.setMonth(d.getMonth() + 1);
    const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
    if (diff < nearestDiff) {
      nearestDiff = diff;
      nearest = { sub, diff };
    }
  });

  if (!nearest) return null;
  const service = services.find(s => s.id === nearest.sub.service_id);
  const name = service ? service.name : (nearest.sub.custom_name ?? '구독');
  return { name, diff: nearest.diff };
}

export default function Dashboard({ totalAmount, activeCount, subscriptions, services }) {
  const next = getNextPayment(subscriptions, services);

  return (
    <div className={styles.dashboard}>
      <div className={styles.appHeader}>
        <img className={styles.appLogo} src="/favicon.svg" alt="" />
        <span className={styles.appName}>구독 메이트</span>
      </div>
      <div className={styles.inner}>
        <p className={styles.label}>이번 달 고정 지출</p>
        <p className={styles.amount}>
          {totalAmount.toLocaleString('ko-KR')}
          <span className={styles.unit}>원</span>
        </p>
        <div className={styles.subRow}>
          <span className={styles.sub}>활성 구독 {activeCount}개</span>
          {next && (
            <span className={styles.nextPayment}>
              다음 결제 · {next.name} D-{next.diff}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
