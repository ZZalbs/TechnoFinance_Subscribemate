import StarRating from '../../components/StarRating';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, reviewCount, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.logo}>{service.logo}</div>
      <div className={styles.body}>
        <div className={styles.top}>
          <h3 className={styles.name}>{service.name}</h3>
          {service.promo_tag && (
            <span className={styles.promoTag}>{service.promo_tag}</span>
          )}
        </div>
        <div className={styles.rating}>
          <StarRating rating={Math.round(service.avg_rating)} size="sm" />
          <span className={styles.ratingNum}>{service.avg_rating.toFixed(1)}</span>
          <span className={styles.reviewCount}>리뷰 {reviewCount}개</span>
        </div>
        <p className={styles.benefits}>{service.benefits}</p>
      </div>
      <div className={styles.tail}>
        <p className={styles.price}>{service.base_price.toLocaleString('ko-KR')}원</p>
        <p className={styles.priceLabel}>월</p>
      </div>
    </div>
  );
}
