import BottomSheet from '../../components/BottomSheet';
import styles from './DetailSheet.module.css';

export default function DetailSheet({ isOpen, onClose, subscription, service, onDelete }) {
  if (!subscription || !service) return null;

  function handleDelete() {
    if (window.confirm(`${service.name} 구독을 목록에서 삭제할까요?`)) {
      onDelete();
      onClose();
    }
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <span className={styles.logo}>{service.logo}</span>
        <div>
          <h3 className={styles.name}>{service.name}</h3>
          <p className={styles.plan}>{service.plan_name}</p>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>월 결제 금액</span>
          <span className={styles.infoValue}>{subscription.custom_price.toLocaleString('ko-KR')}원</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>결제일</span>
          <span className={styles.infoValue}>매월 {subscription.billing_date}일</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>상태</span>
          <span className={`${styles.infoValue} ${subscription.is_active ? styles.statusActive : styles.statusInactive}`}>
            {subscription.is_active ? '● 활성' : '● 비활성'}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>카테고리</span>
          <span className={styles.infoValue}>{service.category}</span>
        </div>
      </div>

      <p className={styles.benefits}>{service.benefits}</p>

      <div className={styles.actions}>
        <a
          href={service.cancel_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cancelBtn}
        >
          🚫 해지하러 가기
        </a>
        <a
          href={service.official_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.officialBtn}
        >
          공식 홈페이지
        </a>
      </div>

      <button className={styles.deleteBtn} onClick={handleDelete}>
        목록에서 삭제
      </button>
    </BottomSheet>
  );
}
