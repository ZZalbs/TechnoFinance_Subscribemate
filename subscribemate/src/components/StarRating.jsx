import { useState } from 'react';
import styles from './StarRating.module.css';

export default function StarRating({ rating, onRate, size = 'md' }) {
  const [hovered, setHovered] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  function getState(star) {
    if (onRate) {
      if (hovered > 0) return star <= hovered ? 'hover' : 'empty';
      return star <= rating ? 'filled' : 'empty';
    }
    return star <= rating ? 'filled' : 'empty';
  }

  return (
    <div className={`${styles.stars} ${styles[size]}`}>
      {stars.map(star => {
        const state = getState(star);
        return (
          <span
            key={star}
            className={`${styles.star} ${styles[state]} ${onRate ? styles.interactive : ''}`}
            onClick={() => onRate && onRate(star)}
            onMouseEnter={() => onRate && setHovered(star)}
            onMouseLeave={() => onRate && setHovered(0)}
          >
            {state === 'empty' ? '☆' : '★'}
          </span>
        );
      })}
    </div>
  );
}
