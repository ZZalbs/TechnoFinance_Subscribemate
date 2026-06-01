import { useApp } from '../../context/AppContext';
import styles from './index.module.css';

const FEATURES = [
  { icon: '📊', title: '구독 지출 분석', desc: '카테고리별 구독 지출을 한눈에 파악' },
  { icon: '🔔', title: '결제일 알림', desc: '결제 3일 전 스마트 알림 서비스' },
  { icon: '♾️', title: '무제한 구독 등록', desc: '구독 서비스 개수 제한 없이 관리' },
  { icon: '✨', title: '광고 없는 경험', desc: '모든 광고 제거, 순수하게 집중' },
];

export default function Premium() {
  const { isPremium, premiumStatus, premiumDaysLeft, subscribePremium, cancelPremium } = useApp();

  const isTrial = isPremium && premiumStatus?.type === 'trial';
  const isFull = isPremium && premiumStatus?.type === 'full';

  function handleSubscribe() {
    if (!isFull) subscribePremium();
  }

  function handleCancel() {
    if (window.confirm('프리미엄 구독을 해지할까요? 남은 기간까지는 이용 가능합니다.')) {
      cancelPremium();
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.appHeader}>
        <img className={styles.appLogo} src="/favicon.svg" alt="" />
        <span className={styles.appName}>구독 메이트</span>
      </div>

      <div className={styles.hero}>
        <div className={styles.crownWrap}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M4 26L7 14L14 20L18 8L22 20L29 14L32 26H4Z" fill="white" fillOpacity="0.95" />
            <rect x="4" y="27" width="28" height="3" rx="1.5" fill="white" fillOpacity="0.7" />
          </svg>
        </div>
        <h1 className={styles.heroTitle}>프리미엄</h1>
        <p className={styles.heroSub}>구독을 더 스마트하게 관리하세요</p>
      </div>

      <div className={styles.body}>
        <div className={`${styles.statusCard} ${isFull ? styles.statusFull : isTrial ? styles.statusTrial : styles.statusFree}`}>
          {isFull && (
            <>
              <span className={styles.statusIcon}>👑</span>
              <div>
                <p className={styles.statusTitle}>프리미엄 구독 중</p>
                <p className={styles.statusDesc}>{premiumStatus.expiresAt}까지 이용 가능</p>
              </div>
            </>
          )}
          {isTrial && (
            <>
              <span className={styles.statusIcon}>⏳</span>
              <div>
                <p className={styles.statusTitle}>7일 무료 체험 중</p>
                <p className={styles.statusDesc}>{premiumDaysLeft}일 남음 · {premiumStatus.expiresAt} 만료</p>
              </div>
            </>
          )}
          {!isPremium && (
            <>
              <span className={styles.statusIcon}>🔓</span>
              <div>
                <p className={styles.statusTitle}>무료 플랜</p>
                <p className={styles.statusDesc}>프리미엄으로 업그레이드하세요</p>
              </div>
            </>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>프리미엄 혜택</h2>
          <div className={styles.featureList}>
            {FEATURES.map(f => (
              <div key={f.title} className={styles.featureItem}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <div className={styles.featureText}>
                  <p className={styles.featureTitle}>{f.title}</p>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
                {isPremium && <span className={styles.checkMark}>✓</span>}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pricingCard}>
          <div className={styles.pricingTop}>
            <div>
              <p className={styles.pricingLabel}>연간 구독</p>
              <p className={styles.pricingAmount}>19,900<span className={styles.pricingUnit}>원/년</span></p>
            </div>
          </div>
          <p className={styles.pricingNote}>부가세 포함 · 자동 갱신 · 언제든 해지 가능</p>

          {isFull ? (
            <div className={styles.activeBtn}>✓ 현재 구독 중</div>
          ) : (
            <button className={styles.subscribeBtn} onClick={handleSubscribe}>
              {isTrial ? '정식 구독 시작하기' : '구독 시작하기'}
            </button>
          )}
        </div>

        {isPremium && (
          <button className={styles.cancelBtn} onClick={handleCancel}>
            구독 해지
          </button>
        )}

        {!isPremium && (
          <div className={styles.trialBanner}>
            <div className={styles.trialLeft}>
              <p className={styles.trialTitle}>✏️ 리뷰 작성하면 7일 무료!</p>
              <p className={styles.trialDesc}>탐색·추천 탭에서 서비스 리뷰를 남기면<br />프리미엄 7일 체험이 자동으로 시작돼요</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
