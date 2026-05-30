import StarRating from '../../components/StarRating';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, reviewCount, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      {service.promo_tag && (
        <span className={styles.promoTag}>{service.promo_tag}</span>
      )}
      <div className={styles.logo}>{service.logo}</div>
      <h3 className={styles.name}>{service.name}</h3>
      <div className={styles.rating}>
        <StarRating rating={Math.round(service.avg_rating)} size="sm" />
        <span className={styles.ratingNum}>{service.avg_rating.toFixed(1)}</span>
        <span className={styles.reviewCount}>({reviewCount})</span>
      </div>
      <p className={styles.benefits}>{service.benefits}</p>
      <p className={styles.price}>{service.base_price.toLocaleString('ko-KR')}원~</p>
    </div>
  );
}
