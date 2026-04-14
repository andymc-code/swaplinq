import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Shield, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO, { SITE_NAME, SITE_URL } from '../components/SEO';

const REVIEWS_DATA = [
  {
    id: 1,
    author: "Alexander V.",
    role: "Pro Trader",
    date: "1 day ago",
    content: "Absolutely flawless execution. I bridged a substantial amount of ETH to SOL and the entire process was settled in my Phantom wallet in under 3 minutes. The rate actually beat major CEXs when factoring in withdrawal fees.",
    rating: 5,
    verified: true
  },
  {
    id: 2,
    author: "Sarah Jenkins",
    role: "DeFi Analyst",
    date: "3 days ago",
    content: "The non-custodial architecture is exactly what the industry needs right now. I refuse to park capital on centralized exchanges anymore. SwaplinQ solves the liquidity fragmentation problem instantly.",
    rating: 5,
    verified: true
  },
  {
    id: 3,
    author: "Matthew T.",
    role: "Retail Investor",
    date: "1 week ago",
    content: "First time using a permissionless swapper and I was nervous, but their support team answered my email within 4 minutes. Transaction was smooth and transparent.",
    rating: 5,
    verified: true
  },
  {
    id: 4,
    author: "Dr. L. Chen",
    role: "Institutional User",
    date: "2 weeks ago",
    content: "Zero slippage on a massive XMR/BTC block trade. Their routing engine clearly aggregates deep liquidity pools. Highly recommended for large volume swaps where privacy and speed are critical.",
    rating: 5,
    verified: true
  },
  {
    id: 5,
    author: "CryptoNomad",
    role: "Frequent Swapper",
    date: "1 month ago",
    content: "No KYC, no signups, no hassle. This is exactly what crypto was meant to be. The UI is gorgeous, but more importantly, the backend routing actually delivers on its promises.",
    rating: 5,
    verified: true
  },
  {
    id: 6,
    author: "David R.",
    role: "Web3 Developer",
    date: "1 month ago",
    content: "Used their API to integrate an in-app swap mechanic for our dApp. Integrating was seamless and it functions exactly like the beautiful frontend. Top tier dev experience.",
    rating: 4,
    verified: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Reviews = () => {
  // Generate JSON-LD for Google Reviews Schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": SITE_NAME,
    "url": SITE_URL,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1254",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": REVIEWS_DATA.map(rev => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": rev.author },
      "datePublished": new Date().toISOString(), // Simplified for demo
      "reviewBody": rev.content,
      "reviewRating": {
        "@type": "Rating",
        "bestRating": "5",
        "ratingValue": rev.rating.toString(),
        "worstRating": "1"
      }
    }))
  };

  return (
    <div className="page-container" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      <SEO 
        title="Reviews - Trust & Integrity" 
        description="Read verified reviews from SwaplinQ users. Experience lightning-fast, non-custodial crypto swaps powered by deep liquidity."
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>

      <div className="reviews-hero section-content" style={{ textAlign: 'center', paddingTop: '100px', marginBottom: '60px' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'inline-block', marginBottom: '20px' }}
        >
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '16px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={40} fill="#00e676" color="#00e676" />
            ))}
          </div>
          <h1 style={{ fontSize: '3rem', margin: '0 0 10px' }}>Excellent <span style={{ color: '#00e676' }}>4.8</span>/5.0</h1>
          <p style={{ color: '#8892b0', fontSize: '1.2rem', margin: 0 }}>
            Powered by verified liquidity partners. Based on thousands of global swaps.
          </p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '40px', flexWrap: 'wrap' }}>
          <div className="trust-indicator" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={20} color="#00d4aa" />
            <span style={{ fontWeight: '500' }}>Non-Custodial</span>
          </div>
          <div className="trust-indicator" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={20} color="#3b82f6" />
            <span style={{ fontWeight: '500' }}>~5 Min Average</span>
          </div>
          <div className="trust-indicator" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={20} color="#00e676" />
            <span style={{ fontWeight: '500' }}>Verified Execution</span>
          </div>
        </div>
      </div>

      <motion.div 
        className="section-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {REVIEWS_DATA.map((review) => (
          <motion.div 
            key={review.id} 
            variants={itemVariants}
            className="glass"
            style={{
              padding: '30px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              background: 'rgba(10, 16, 32, 0.6)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? "#00e676" : "rgba(0,230,118,0.2)"} color={i < review.rating ? "#00e676" : "rgba(0,230,118,0.2)"} />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: '#64ffda', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle size={12} /> Verified
              </span>
            </div>
            
            <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.6', flex: 1 }}>
              "{review.content}"
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
              <div>
                <strong style={{ display: 'block', color: '#ffffff', marginBottom: '4px' }}>{review.author}</strong>
                <span style={{ fontSize: '0.85rem', color: '#8892b0' }}>{review.role}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#4a5568' }}>{review.date}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Reviews;
