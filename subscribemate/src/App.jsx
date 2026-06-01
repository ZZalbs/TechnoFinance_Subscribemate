import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import BottomNav from './components/BottomNav';
import MySubscriptions from './pages/MySubscriptions';
import Discover from './pages/Discover';
import Premium from './pages/Premium';
import './index.css';

export default function App() {
  const [currentTab, setCurrentTab] = useState('subscriptions');

  return (
    <AppProvider>
      <div className="app-wrapper">
        {currentTab === 'subscriptions' && <MySubscriptions />}
        {currentTab === 'discover' && <Discover />}
        {currentTab === 'premium' && <Premium />}
        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </AppProvider>
  );
}
