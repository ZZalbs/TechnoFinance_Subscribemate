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
  const [query, setQuery] = useState('');

  const filtered = services
    .filter(s => selectedCategory === '전체' || s.category === selectedCategory)
    .filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  const selectedService = services.find(s => s.id === selectedServiceId);

  function getReviewCount(serviceId) {
    return reviews.filter(r => r.service_id === serviceId).length;
  }

  function getAvgRating(serviceId) {
    const rs = reviews.filter(r => r.service_id === serviceId);
    if (rs.length === 0) return null;
    return rs.reduce((sum, r) => sum + r.rating, 0) / rs.length;
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>탐색·추천</h1>
        <p className={styles.subtitle}>다른 사람들의 리얼 리뷰를 확인하세요</p>
      </div>

      <div className={styles.searchWrap}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M17 17L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="서비스 검색"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className={styles.searchClear} onClick={() => setQuery('')}>✕</button>
          )}
        </div>
      </div>

      <div className={styles.chips}>
        <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      <div className={styles.grid}>
        {filtered.length === 0 && (
          <p className={styles.empty}>검색 결과가 없어요</p>
        )}
        {filtered.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            reviewCount={getReviewCount(service.id)}
            avgRating={getAvgRating(service.id)}
            onClick={() => setSelectedServiceId(service.id)}
          />
        ))}
      </div>

      <ReviewSheet
        key={selectedServiceId}
        isOpen={!!selectedServiceId}
        onClose={() => setSelectedServiceId(null)}
        service={selectedService}
      />
    </div>
  );
}
