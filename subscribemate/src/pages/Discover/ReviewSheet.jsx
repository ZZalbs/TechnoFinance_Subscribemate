import { useState } from 'react';
import BottomSheet from '../../components/BottomSheet';
import StarRating from '../../components/StarRating';
import { useApp } from '../../context/AppContext';
import styles from './ReviewSheet.module.css';

const REVIEW_TAGS = ['#가성비최고', '#볼게없음', '#광고없음', '#추천', '#생활필수', '#생산성UP', '#가격이부담', '#콘텐츠풍부'];

export default function ReviewSheet({ isOpen, onClose, service }) {
  const { reviews, addReview, subscriptions, addSubscription } = useApp();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planError, setPlanError] = useState(false);

  if (!service) return null;

  const serviceReviews = reviews.filter(r => r.service_id === service.id);
  const isSubscribed = subscriptions.some(s => s.service_id === service.id);
  const avgRating = serviceReviews.length > 0
    ? serviceReviews.reduce((sum, r) => sum + r.rating, 0) / serviceReviews.length
    : null;
  const plans = service.plans ?? [{ name: service.plan_name, price: service.base_price }];
  const hasMultiplePlans = plans.length > 1;

  function toggleTag(tag) {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  function handleSubmitReview(e) {
    e.preventDefault();
    if (rating === 0 || !content.trim()) return;
    addReview({
      service_id: service.id,
      user_name: '나',
      rating,
      content: content.trim(),
      tags: selectedTags,
    });
    setRating(0);
    setContent('');
    setSelectedTags([]);
    setShowWriteForm(false);
  }

  function handleAddSubscription() {
    if (hasMultiplePlans && !selectedPlan) {
      setPlanError(true);
      setShowPlans(true);
      return;
    }
    const plan = selectedPlan ?? plans[0];
    addSubscription({
      service_id: service.id,
      plan_name: plan.name,
      custom_price: plan.price,
      billing_date: 1,
    });
    onClose();
  }

  const needsPlanSelect = hasMultiplePlans && !selectedPlan;

  const footer = (
    <>
      {!isSubscribed ? (
        <button
          className={`${styles.addBtn} ${needsPlanSelect ? styles.addBtnDisabled : ''}`}
          onClick={handleAddSubscription}
        >
          {needsPlanSelect ? '요금제를 먼저 선택해주세요' : `+ 내 구독에 추가${selectedPlan ? ` (${selectedPlan.name})` : ''}`}
        </button>
      ) : (
        <div className={styles.subscribedBadge}>✓ 이미 구독 중</div>
      )}
      <a
        href={service.official_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.officialBtn}
      >
        공식 홈페이지
      </a>
    </>
  );

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} footer={footer}>
      <div className={styles.header}>
        <span className={styles.logo}>{service.logo}</span>
        <div className={styles.headerInfo}>
          <h3 className={styles.name}>{service.name}</h3>
          {avgRating !== null && (
            <div className={styles.ratingRow}>
              <StarRating rating={Math.round(avgRating)} size="sm" />
              <span className={styles.ratingNum}>{avgRating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>

      <p className={styles.benefits}>{service.benefits}</p>

      <div className={styles.plansSection}>
        <button
          className={styles.plansToggle}
          onClick={() => setShowPlans(v => !v)}
        >
          <span>요금제 {plans.length}개</span>
          <span className={styles.plansArrow}>{showPlans ? '▲' : '▼'}</span>
        </button>
        {showPlans && (
          <div className={styles.plansList}>
            {plans.map(plan => (
              <button
                key={plan.name}
                className={`${styles.planItem} ${selectedPlan?.name === plan.name ? styles.planSelected : ''} ${planError && !selectedPlan ? styles.planItemError : ''}`}
                onClick={() => { setSelectedPlan(plan); setPlanError(false); }}
              >
                <span className={styles.planName}>{plan.name}</span>
                <span className={styles.planPrice}>
                  {plan.price === 0 ? '무료' : `${plan.price.toLocaleString('ko-KR')}원/월`}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.reviewSection}>
        <div className={styles.reviewHeader}>
          <h4 className={styles.reviewTitle}>리뷰 {serviceReviews.length}개</h4>
          <button
            className={styles.writeBtn}
            onClick={() => setShowWriteForm(prev => !prev)}
          >
            {showWriteForm ? '취소' : '✏️ 리뷰 작성'}
          </button>
        </div>

        {showWriteForm && (
          <form className={styles.writeForm} onSubmit={handleSubmitReview}>
            <div className={styles.starPick}>
              <p className={styles.starLabel}>별점 선택</p>
              <StarRating rating={rating} onRate={setRating} size="lg" />
            </div>
            <textarea
              className={styles.textarea}
              placeholder="이 서비스를 사용해 본 솔직한 경험을 남겨주세요"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={3}
            />
            <div className={styles.tagWrap}>
              {REVIEW_TAGS.map(tag => (
                <button
                  type="button"
                  key={tag}
                  className={`${styles.tagChip} ${selectedTags.includes(tag) ? styles.tagActive : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <button type="submit" className={styles.submitBtn} disabled={rating === 0 || !content.trim()}>
              리뷰 등록
            </button>
          </form>
        )}

        {serviceReviews.length === 0 && !showWriteForm && (
          <p className={styles.noReview}>아직 리뷰가 없어요. 첫 번째 리뷰를 남겨보세요!</p>
        )}

        <div className={styles.reviewList}>
          {serviceReviews.map(review => (
            <div key={review.id} className={styles.reviewItem}>
              <div className={styles.reviewTop}>
                <span className={styles.reviewer}>{review.user_name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <StarRating rating={review.rating} size="sm" />
                  <span className={styles.reviewDate}>{review.created_at}</span>
                </div>
              </div>
              <p className={styles.reviewContent}>{review.content}</p>
              {review.tags && review.tags.length > 0 && (
                <div className={styles.reviewTags}>
                  {review.tags.map(tag => (
                    <span key={tag} className={styles.reviewTag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
