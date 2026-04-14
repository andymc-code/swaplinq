import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import HowItWorks from './pages/HowItWorks';
import PairPage from './pages/PairPage';
import CoinPage from './pages/CoinPage';
import CoinsList from './pages/CoinsList';
import { Contact, Blog } from './pages/Sections';
import Reviews from './pages/Reviews';
import Documents from './pages/Documents';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout><Home /></PageLayout>} />
      <Route path="/about" element={<PageLayout><About /></PageLayout>} />
      <Route path="/faq" element={<PageLayout><FAQ /></PageLayout>} />
      <Route path="/how-it-works" element={<PageLayout><HowItWorks /></PageLayout>} />
      <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
      <Route path="/blog" element={<PageLayout><Blog /></PageLayout>} />
      <Route path="/reviews" element={<PageLayout><Reviews /></PageLayout>} />
      <Route path="/coins" element={<PageLayout><CoinsList /></PageLayout>} />
      <Route path="/coins/:id" element={<PageLayout><CoinPage /></PageLayout>} />
      <Route path="/pair/:pairId" element={<PageLayout><PairPage /></PageLayout>} />
      
      {/* Dynamic SEO pairs could also be explicitly defined or handled via :pairId */}
      <Route path="/buy-crypto" element={<PageLayout><PairPage type="buy" /></PageLayout>} />
      <Route path="/sell-crypto" element={<PageLayout><PairPage type="sell" /></PageLayout>} />
      <Route path="/mobile-app" element={<PageLayout><HowItWorks /></PageLayout>} />
      <Route path="/api" element={<PageLayout><Documents /></PageLayout>} />
      <Route path="/documents" element={<PageLayout><Documents /></PageLayout>} />
      <Route path="/privacy" element={<PageLayout><About /></PageLayout>} />
      <Route path="/terms" element={<PageLayout><About /></PageLayout>} />
    </Routes>
  );
}

export default App;
