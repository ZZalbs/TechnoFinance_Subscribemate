import styles from './CategoryChips.module.css';

const CATEGORIES = ['전체', 'OTT', '음악', '생활·배송', '생산성'];

export default function CategoryChips({ selected, onSelect }) {
  return (
    <div className={styles.wrap}>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          className={`${styles.chip} ${selected === cat ? styles.active : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
