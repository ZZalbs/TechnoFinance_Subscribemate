import styles from './Dashboard.module.css';

export default function Dashboard({ totalAmount, activeCount }) {
  return (
    <div className={styles.dashboard}>
      <p className={styles.label}>이번 달 고정 지출</p>
      <p className={styles.amount}>
        {totalAmount.toLocaleString('ko-KR')}
        <span className={styles.unit}>원</span>
      </p>
      <p className={styles.sub}>활성 구독 {activeCount}개</p>
    </div>
  );
}
