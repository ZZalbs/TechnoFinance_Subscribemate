import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { services } from '../../data/mockData';
import Dashboard from './Dashboard';
import SubscriptionCard from './SubscriptionCard';
import DetailSheet from './DetailSheet';
import AddForm from './AddForm';
import SpendingAnalysis from './SpendingAnalysis';
import styles from './index.module.css';

export default function MySubscriptions({ onGoToPremium }) {
  const { subscriptions, addSubscription, toggleSubscription, deleteSubscription, editSubscription } = useApp();
  const [selectedId, setSelectedId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const activeSubscriptions = subscriptions.filter(s => s.is_active);
  const totalAmount = activeSubscriptions.reduce((sum, s) => sum + s.custom_price, 0);

  function getDday(sub) {
    const today = new Date();
    const d = new Date(today.getFullYear(), today.getMonth(), sub.billing_date);
    if (d <= today) d.setMonth(d.getMonth() + 1);
    return Math.ceil((d - today) / (1000 * 60 * 60 * 24));
  }

  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    if (a.is_active !== b.is_active) return a.is_active ? -1 : 1;
    return getDday(a) - getDday(b);
  });

  const selectedSub = subscriptions.find(s => s.id === selectedId);
  const selectedService = selectedSub
    ? (services.find(sv => sv.id === selectedSub.service_id)
        ?? { name: selectedSub.custom_name ?? '기타', logo: '📋', category: '기타', benefits: '', cancel_url: '', official_url: '', plans: [] })
    : null;

  return (
    <div className={styles.page}>
      <Dashboard totalAmount={totalAmount} activeCount={activeSubscriptions.length} subscriptions={subscriptions} services={services} />

      <SpendingAnalysis onGoToPremium={onGoToPremium} />

      <div className={styles.listSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>내 구독 목록</h2>
          <span className={styles.count}>{subscriptions.length}개</span>
          <button className={styles.addBtn} onClick={() => setShowAddForm(true)}>+ 구독 추가</button>
        </div>

        {subscriptions.length === 0 ? (
          <div className={styles.empty}>
            <p>등록된 구독이 없어요</p>
            <p>아래 + 버튼으로 추가해보세요</p>
          </div>
        ) : (
          <div className={styles.list}>
            {sortedSubscriptions.map(sub => {
              const service = services.find(s => s.id === sub.service_id)
                ?? { name: sub.custom_name ?? '기타', logo: '📋', category: '기타', benefits: '', cancel_url: '', official_url: '', plans: [] };
              return (
                <SubscriptionCard
                  key={sub.id}
                  subscription={sub}
                  service={service}
                  onToggle={() => toggleSubscription(sub.id)}
                  onClick={() => setSelectedId(sub.id)}
                />
              );
            })}
          </div>
        )}
      </div>

      <DetailSheet
        key={selectedId}
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
        subscription={selectedSub}
        service={selectedService}
        onDelete={() => deleteSubscription(selectedId)}
        onEdit={(changes) => editSubscription(selectedId, changes)}
      />

      <AddForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onAdd={addSubscription}
      />
    </div>
  );
}
