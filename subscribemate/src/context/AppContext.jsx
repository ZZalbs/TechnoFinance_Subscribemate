import { createContext, useContext, useState } from 'react';
import { initialSubscriptions, initialReviews } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [reviews, setReviews] = useState(initialReviews);

  function addSubscription(sub) {
    setSubscriptions(prev => [
      ...prev,
      { ...sub, id: Date.now(), is_active: true },
    ]);
  }

  function toggleSubscription(id) {
    setSubscriptions(prev =>
      prev.map(s => s.id === id ? { ...s, is_active: !s.is_active } : s)
    );
  }

  function deleteSubscription(id) {
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  }

  function editSubscription(id, changes) {
    setSubscriptions(prev =>
      prev.map(s => s.id === id ? { ...s, ...changes } : s)
    );
  }

  function addReview(review) {
    setReviews(prev => [
      { ...review, id: Date.now(), created_at: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
  }

  return (
    <AppContext.Provider value={{
      subscriptions, addSubscription, toggleSubscription, deleteSubscription, editSubscription,
      reviews, addReview,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
