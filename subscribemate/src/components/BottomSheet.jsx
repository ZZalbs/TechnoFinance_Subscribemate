import { useEffect } from 'react';
import styles from './BottomSheet.module.css';

export default function BottomSheet({ isOpen, onClose, children, footer }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.sheet} ${footer ? styles.sheetWithFooter : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.handle} />
        {footer ? (
          <>
            <div className={styles.body}>{children}</div>
            <div className={styles.footer}>{footer}</div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
