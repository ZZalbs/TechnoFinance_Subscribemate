import { useState } from 'react';
import BottomSheet from '../../components/BottomSheet';
import styles from './DetailSheet.module.css';

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function DetailSheet({ isOpen, onClose, subscription, service, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [price, setPrice] = useState('');
  const [billingDate, setBillingDate] = useState(1);

  if (!subscription || !service) return null;

  const plans = service.plans ?? [];
  const planLabel = subscription.plan_name ?? service.plan_name;

  function handleEditOpen() {
    const currentPlan = plans.find(p => p.name === subscription.plan_name) ?? null;
    setSelectedPlan(currentPlan);
    setPrice(String(subscription.custom_price));
    setBillingDate(subscription.billing_date);
    setEditing(true);
  }

  function handlePlanChange(e) {
    const plan = plans.find(p => p.name === e.target.value);
    if (plan) {
      setSelectedPlan(plan);
      setPrice(String(plan.price));
    }
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    onEdit({
      plan_name: selectedPlan?.name ?? subscription.plan_name,
      custom_price: Number(price),
      billing_date: billingDate,
    });
    setEditing(false);
  }

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
        <div className={styles.headerInfo}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{service.name}</h3>
            <button className={styles.editBtn} onClick={handleEditOpen}>편집</button>
          </div>
          {!editing && planLabel && <p className={styles.plan}>{planLabel}</p>}
        </div>
      </div>

      {editing ? (
        <form className={styles.editForm} onSubmit={handleEditSubmit}>
          {plans.length > 0 && (
            <div className={styles.editField}>
              <label className={styles.editLabel}>요금제</label>
              <select
                className={styles.editSelect}
                value={selectedPlan?.name ?? ''}
                onChange={handlePlanChange}
              >
                {plans.map(p => (
                  <option key={p.name} value={p.name}>
                    {p.name} — {p.price === 0 ? '무료' : `${p.price.toLocaleString('ko-KR')}원`}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className={styles.editField}>
            <label className={styles.editLabel}>월 결제 금액</label>
            <div className={styles.priceWrap}>
              <input
                className={styles.editInput}
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                min={0}
                required
              />
              <span className={styles.priceUnit}>원</span>
            </div>
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel}>결제일</label>
            <select
              className={styles.editSelect}
              value={billingDate}
              onChange={e => setBillingDate(Number(e.target.value))}
            >
              {DAYS.map(d => (
                <option key={d} value={d}>매월 {d}일</option>
              ))}
            </select>
          </div>
          <div className={styles.editActions}>
            <button type="button" className={styles.editCancelBtn} onClick={() => setEditing(false)}>취소</button>
            <button type="submit" className={styles.editSaveBtn}>저장</button>
          </div>
        </form>
      ) : (
        <>
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

          {(service.cancel_url || service.official_url) && (
            <div className={styles.actions}>
              {service.cancel_url && (
                <a
                  href={service.cancel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cancelBtn}
                >
                  🚫 해지하러 가기
                </a>
              )}
              {service.official_url && (
                <a
                  href={service.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.officialBtn}
                >
                  공식 홈페이지
                </a>
              )}
            </div>
          )}

          <button className={styles.deleteBtn} onClick={handleDelete}>
            목록에서 삭제
          </button>
        </>
      )}
    </BottomSheet>
  );
}
