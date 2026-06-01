import { createContext, useContext, useState } from 'react';
import { initialSubscriptions, initialReviews } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [reviews, setReviews] = useState(initialReviews);
  const [premiumStatus, setPremiumStatus] = useState(null);
  // premiumStatus = null | { type: 'trial'|'full', expiresAt: 'YYYY-MM-DD' }

  const premiumDaysLeft = premiumStatus
    ? Math.max(0, Math.ceil((new Date(premiumStatus.expiresAt) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0;
  const isPremium = !!premiumStatus && premiumDaysLeft > 0;

  function activatePremiumTrial(days = 7) {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + days);
    setPremiumStatus({ type: 'trial', expiresAt: expiry.toISOString().slice(0, 10) });
  }

  function subscribePremium() {
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    setPremiumStatus({ type: 'full', expiresAt: expiry.toISOString().slice(0, 10) });
  }

  function cancelPremium() {
    setPremiumStatus(null);
  }

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
      isPremium, premiumStatus, premiumDaysLeft, activatePremiumTrial, subscribePremium, cancelPremium,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
