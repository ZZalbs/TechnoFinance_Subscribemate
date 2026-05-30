import styles from './StarRating.module.css';

export default function StarRating({ rating, onRate, size = 'md' }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`${styles.stars} ${styles[size]}`}>
      {stars.map(star => (
        <span
          key={star}
          className={`${styles.star} ${star <= rating ? styles.filled : ''} ${onRate ? styles.interactive : ''}`}
          onClick={() => onRate && onRate(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
