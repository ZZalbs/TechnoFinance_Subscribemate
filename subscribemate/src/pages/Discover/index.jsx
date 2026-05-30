import { useState } from 'react';
import { services } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import CategoryChips from './CategoryChips';
import ServiceCard from './ServiceCard';
import ReviewSheet from './ReviewSheet';
import styles from './index.module.css';

export default function Discover() {
  const { reviews } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const filtered = selectedCategory === '전체'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const selectedService = services.find(s => s.id === selectedServiceId);

  function getReviewCount(serviceId) {
    return reviews.filter(r => r.service_id === serviceId).length;
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>탐색·추천</h1>
        <p className={styles.subtitle}>다른 사람들의 리얼 리뷰를 확인하세요</p>
      </div>

      <div className={styles.chips}>
        <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      <div className={styles.grid}>
        {filtered.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            reviewCount={getReviewCount(service.id)}
            onClick={() => setSelectedServiceId(service.id)}
          />
        ))}
      </div>

      <ReviewSheet
        isOpen={!!selectedServiceId}
        onClose={() => setSelectedServiceId(null)}
        service={selectedService}
      />
    </div>
  );
}
