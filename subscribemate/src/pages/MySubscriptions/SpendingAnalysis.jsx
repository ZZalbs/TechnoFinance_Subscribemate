import { useApp } from '../../context/AppContext';
import { services } from '../../data/mockData';
import styles from './SpendingAnalysis.module.css';

const CATEGORY_COLORS = {
  'OTT': '#5B5FED',
  '음악': '#7B3FE4',
  '생활·배송': '#34C759',
  '생산성': '#FF9500',
  '기타': '#AEAEB2',
};

export default function SpendingAnalysis({ onGoToPremium }) {
  const { isPremium, subscriptions } = useApp();

  if (!isPremium) {
    return (
      <div className={styles.lockedCard}>
        <span className={styles.lockIcon}>👑</span>
        <p className={styles.lockTitle}>프리미엄 전용 기능</p>
        <p className={styles.lockDesc}>카테고리별 구독 지출을 한눈에 분석해보세요</p>
        <button className={styles.lockBtn} onClick={onGoToPremium}>
          프리미엄 시작하기
        </button>
      </div>
    );
  }

  const active = subscriptions.filter(s => s.is_active);
  const total = active.reduce((sum, s) => sum + s.custom_price, 0);

  const categoryMap = {};
  active.forEach(sub => {
    const service = services.find(s => s.id === sub.service_id);
    const cat = service?.category ?? '기타';
    categoryMap[cat] = (categoryMap[cat] ?? 0) + sub.custom_price;
  });

  const categories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

  const topSub = [...active].sort((a, b) => b.custom_price - a.custom_price)[0];
  const topService = topSub
    ? (services.find(s => s.id === topSub.service_id) ?? { name: topSub.custom_name ?? '기타', logo: '📋' })
    : null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>지출 분석</h2>
        <span className={styles.badge}>활성 {active.length}개</span>
      </div>

      {active.length === 0 ? (
        <p className={styles.empty}>활성 구독이 없어요</p>
      ) : (
        <>
          <div className={styles.barList}>
            {categories.map(([cat, amount]) => (
              <div key={cat} className={styles.barRow}>
                <div className={styles.barLabel}>
                  <span className={styles.catName}>{cat}</span>
                  <span className={styles.catAmount}>{amount.toLocaleString('ko-KR')}원</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${(amount / total) * 100}%`,
                      background: CATEGORY_COLORS[cat] ?? CATEGORY_COLORS['기타'],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {topService && (
            <div className={styles.topRow}>
              <span className={styles.topLabel}>최다 지출</span>
              <span className={styles.topValue}>
                {topService.logo} {topService.name} · {topSub.custom_price.toLocaleString('ko-KR')}원
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
