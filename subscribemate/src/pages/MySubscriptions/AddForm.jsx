import { useState } from 'react';
import BottomSheet from '../../components/BottomSheet';
import { services } from '../../data/mockData';
import styles from './AddForm.module.css';

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function AddForm({ isOpen, onClose, onAdd }) {
  const [serviceId, setServiceId] = useState('');
  const [customName, setCustomName] = useState('');
  const [price, setPrice] = useState('');
  const [billingDate, setBillingDate] = useState(1);
  const [isCustom, setIsCustom] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (isCustom) {
      if (!customName.trim() || !price) return;
      onAdd({
        service_id: null,
        custom_name: customName.trim(),
        custom_price: Number(price),
        billing_date: billingDate,
      });
    } else {
      if (!serviceId || !price) return;
      onAdd({
        service_id: Number(serviceId),
        custom_price: Number(price),
        billing_date: billingDate,
      });
    }
    handleClose();
  }

  function handleClose() {
    setServiceId('');
    setCustomName('');
    setPrice('');
    setBillingDate(1);
    setIsCustom(false);
    onClose();
  }

  function handleServiceChange(e) {
    const val = e.target.value;
    if (val === 'custom') {
      setIsCustom(true);
      setServiceId('');
      setPrice('');
    } else {
      setIsCustom(false);
      setServiceId(val);
      const found = services.find(s => s.id === Number(val));
      if (found) setPrice(String(found.base_price));
    }
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
      <h3 className={styles.title}>구독 추가</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>서비스 선택</label>
          <select
            className={styles.select}
            value={isCustom ? 'custom' : serviceId}
            onChange={handleServiceChange}
            required
          >
            <option value="">서비스를 선택하세요</option>
            {services.map(s => (
              <option key={s.id} value={s.id}>{s.logo} {s.name}</option>
            ))}
            <option value="custom">✏️ 직접 입력</option>
          </select>
        </div>

        {isCustom && (
          <div className={styles.field}>
            <label className={styles.label}>서비스명</label>
            <input
              className={styles.input}
              type="text"
              placeholder="예: 밀리의서재"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              required
            />
          </div>
        )}

        <div className={styles.field}>
          <label className={styles.label}>월 결제 금액</label>
          <div className={styles.priceWrap}>
            <input
              className={styles.input}
              type="number"
              placeholder="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min={0}
              required
            />
            <span className={styles.priceUnit}>원</span>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>결제일</label>
          <select
            className={styles.select}
            value={billingDate}
            onChange={e => setBillingDate(Number(e.target.value))}
          >
            {DAYS.map(d => (
              <option key={d} value={d}>매월 {d}일</option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitBtn}>추가하기</button>
      </form>
    </BottomSheet>
  );
}
