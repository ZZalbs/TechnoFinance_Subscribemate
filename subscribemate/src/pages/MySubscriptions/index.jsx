import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { services } from '../../data/mockData';
import Dashboard from './Dashboard';
import SubscriptionCard from './SubscriptionCard';
import DetailSheet from './DetailSheet';
import AddForm from './AddForm';
import styles from './index.module.css';

export default function MySubscriptions() {
  const { subscriptions, addSubscription, toggleSubscription, deleteSubscription } = useApp();
  const [selectedId, setSelectedId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const activeSubscriptions = subscriptions.filter(s => s.is_active);
  const totalAmount = activeSubscriptions.reduce((sum, s) => sum + s.custom_price, 0);

  const selectedSub = subscriptions.find(s => s.id === selectedId);
  const selectedService = selectedSub
    ? services.find(sv => sv.id === selectedSub.service_id)
    : null;

  return (
    <div className={styles.page}>
      <Dashboard totalAmount={totalAmount} activeCount={activeSubscriptions.length} subscriptions={subscriptions} services={services} />

      <div className={styles.listSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>내 구독 목록</h2>
          <span className={styles.count}>{subscriptions.length}개</span>
        </div>

        {subscriptions.length === 0 ? (
          <div className={styles.empty}>
            <p>등록된 구독이 없어요</p>
            <p>아래 + 버튼으로 추가해보세요</p>
          </div>
        ) : (
          <div className={styles.list}>
            {subscriptions.map(sub => {
              const service = services.find(s => s.id === sub.service_id);
              if (!service) return null;
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

      <button
        className={styles.fab}
        onClick={() => setShowAddForm(true)}
        aria-label="구독 추가"
      >
        +
      </button>

      <DetailSheet
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
        subscription={selectedSub}
        service={selectedService}
        onDelete={() => deleteSubscription(selectedId)}
      />

      <AddForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onAdd={addSubscription}
      />
    </div>
  );
}
