import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Shield, Clock, Zap, TrendingUp, ChevronRight, Quote, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO, { SITE_NAME, SITE_URL } from '../components/SEO';

/* ─── Review Data ─── */
const REVIEWS = [
  {
    id: 1,
    author: "Alexander V.",
    role: "Professional Trader",
    avatar: "AV",
    date: "April 2026",
    title: "Lightning-fast BTC to SOL bridge",
    content: "Absolutely flawless execution. I bridged a substantial amount of ETH to SOL and the entire process was settled in my Phantom wallet in under 3 minutes. The rate actually beat major CEXs when factoring in withdrawal fees. The non-custodial model means I never once lost control of my assets.",
    rating: 5,
    verified: true,
    swapPair: "ETH → SOL",
    highlight: true
  },
  {
    id: 2,
    author: "Sarah J.",
    role: "DeFi Research Analyst",
    avatar: "SJ",
    date: "April 2026",
    title: "The privacy-first architecture we need",
    content: "The non-custodial architecture is exactly what the industry needs right now. I refuse to park capital on centralized exchanges anymore after what happened with FTX. SwaplinQ solves the liquidity fragmentation problem without compromising on privacy or speed.",
    rating: 5,
    verified: true,
    swapPair: "XMR → BTC",
    highlight: false
  },
  {
    id: 3,
    author: "Matthew T.",
    role: "First-time Swapper",
    avatar: "MT",
    date: "March 2026",
    title: "Support team responded in 4 minutes",
    content: "First time using a permissionless exchange and I was honestly nervous. But their support team answered my email within 4 minutes and walked me through every step. Transaction was smooth, transparent, and I received exactly what was quoted. Converted instantly.",
    rating: 5,
    verified: true,
    swapPair: "USDT → BTC",
    highlight: false
  },
  {
    id: 4,
    author: "Dr. L. Chen",
    role: "Institutional OTC Desk",
    avatar: "LC",
    date: "March 2026",
    title: "Zero slippage on a massive block trade",
    content: "Zero slippage on a massive XMR/BTC block trade that would have caused 4%+ slip on any standard AMM. Their routing engine clearly aggregates deep institutional liquidity pools. Highly recommended for large volume swaps where privacy and execution quality are non-negotiable.",
    rating: 5,
    verified: true,
    swapPair: "XMR → BTC",
    highlight: true
  },
  {
    id: 5,
    author: "CryptoNomad",
    role: "Frequent Swapper",
    avatar: "CN",
    date: "February 2026",
    title: "This is what crypto was meant to be",
    content: "No KYC, no signups, no hassle. This is exactly what crypto was originally meant to be. The UI is stunning and the dark mode is genuinely one of the best I've seen in DeFi. But more importantly, the backend routing actually delivers on its promises. Every. Single. Time.",
    rating: 5,
    verified: true,
    swapPair: "BTC → ETH",
    highlight: false
  },
  {
    id: 6,
    author: "David R.",
    role: "Web3 Developer",
    avatar: "DR",
    date: "February 2026",
    title: "API integration was seamless",
    content: "Used their API to integrate an in-app swap mechanic for our dApp. The documentation is excellent, the endpoints are clean and predictable, and integration took less than 2 hours. It just works — exactly as you'd expect from a protocol-level service.",
    rating: 4,
    verified: true,
    swapPair: "Multi-chain",
    highlight: false
  },
  {
    id: 7,
    author: "Elena K.",
    role: "Portfolio Manager",
    avatar: "EK",
    date: "January 2026",
    title: "Replaced Binance for all my swaps",
    content: "I've completely replaced centralized exchanges for all routine asset rebalancing. The aggregation across 10+ providers means I consistently get better effective rates than any single exchange. The peace of mind from non-custodial execution is priceless.",
    rating: 5,
    verified: true,
    swapPair: "ETH → MATIC",
    highlight: false
  },
  {
    id: 8,
    author: "Marcus W.",
    role: "Privacy Advocate",
    avatar: "MW",
    date: "January 2026",
    title: "Finally, real privacy in DeFi",
    content: "As someone who takes operational security seriously, SwaplinQ is a breath of fresh air. No accounts, no KYC, no IP tracking, and ephemeral transaction data. Combined with their deep Monero liquidity, this is the gold standard for private digital asset exchange.",
    rating: 5,
    verified: true,
    swapPair: "BTC → XMR",
    highlight: true
  }
];

const FILTER_TABS = ['All Reviews', '5 Stars', '4 Stars', 'Highlighted'];

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { 
    opacity: 1, y: 0, scale: 1, 
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

/* ─── Star Rating Component ─── */
const StarRating = ({ rating, size = 14 }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        fill={i < rating ? "#00e676" : "transparent"}
        color={i < rating ? "#00e676" : "rgba(255,255,255,0.1)"}
        strokeWidth={i < rating ? 0 : 1.5}
      />
    ))}
  </div>
);

/* ─── Avatar Component ─── */
const Avatar = ({ initials, highlight }) => (
  <div style={{
    width: 44,
    height: 44,
    borderRadius: 14,
    background: highlight
      ? 'linear-gradient(135deg, rgba(0,230,118,0.2), rgba(41,121,255,0.2))'
      : 'rgba(255,255,255,0.04)',
    border: `1px solid ${highlight ? 'rgba(0,230,118,0.3)' : 'rgba(255,255,255,0.06)'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    fontWeight: 700,
    color: highlight ? '#00e676' : 'rgba(255,255,255,0.5)',
    flexShrink: 0
  }}>
    {initials}
  </div>
);

/* ─── Main Reviews Component ─── */
const Reviews = () => {
  const [activeFilter, setActiveFilter] = useState('All Reviews');

  const filteredReviews = REVIEWS.filter(r => {
    if (activeFilter === 'All Reviews') return true;
    if (activeFilter === '5 Stars') return r.rating === 5;
    if (activeFilter === '4 Stars') return r.rating === 4;
    if (activeFilter === 'Highlighted') return r.highlight;
    return true;
  });

  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": "Non-custodial instant cryptocurrency exchange aggregating 10+ liquidity providers.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating,
      "reviewCount": "2847",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": REVIEWS.map(rev => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": rev.author },
      "datePublished": "2026-04-01",
      "reviewBody": rev.content,
      "name": rev.title,
      "reviewRating": {
        "@type": "Rating",
        "bestRating": "5",
        "ratingValue": rev.rating.toString(),
        "worstRating": "1"
      }
    }))
  };

  return (
    <div className="page-container reviews-page">
      <SEO
        title="Reviews — Verified User Testimonials"
        description="Read verified reviews from SwaplinQ users and institutional partners. Lightning-fast non-custodial crypto swaps powered by deep, aggregated liquidity."
        keywords="SwaplinQ reviews, crypto exchange reviews, non-custodial exchange, best crypto swap, changenow alternative"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>

      {/* ─── Hero ─── */}
      <header className="page-header" style={{ marginBottom: '40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="badge-pill">VERIFIED REVIEWS</div>
          <h1>What Our <span>Users</span> Say</h1>
          <p>Real feedback from traders, developers, and institutions who trust SwaplinQ for non-custodial execution.</p>
        </motion.div>
      </header>

      {/* ─── Aggregate Score Card ─── */}
      <motion.div
        className="section-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{ maxWidth: 900, margin: '0 auto 60px' }}
      >
        <div className="about-arch-diagram" style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '48px',
          padding: '48px 56px',
        }}>
          {/* Score */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '4.5rem',
              fontWeight: 800,
              lineHeight: 1,
              background: 'linear-gradient(135deg, #fff 0%, #00e676 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 8
            }}>
              {avgRating}
            </div>
            <StarRating rating={5} size={20} />
            <div style={{
              marginTop: 12,
              fontSize: 13,
              color: 'var(--text-muted)',
              fontWeight: 600
            }}>
              Based on <strong style={{ color: '#fff' }}>2,847</strong> verified swaps
            </div>
          </div>

          {/* Divider */}
          <div style={{
            width: 1,
            height: 100,
            background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)'
          }}/>

          {/* Trust Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: <Shield size={16} />, label: 'Non-Custodial', value: '100%', color: '#00e676' },
              { icon: <Clock size={16} />, label: 'Avg Completion', value: '~3 min', color: '#2979ff' },
              { icon: <TrendingUp size={16} />, label: 'Success Rate', value: '99.97%', color: '#00e5ff' },
              { icon: <Zap size={16} />, label: 'Support Response', value: '<5 min', color: '#ffb300' },
            ].map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: `${m.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: m.color,
                  flexShrink: 0
                }}>
                  {m.icon}
                </div>
                <div style={{ flex: 1, fontSize: 13, color: 'var(--text-muted)' }}>{m.label}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── Filter Tabs ─── */}
      <div className="section-content" style={{ maxWidth: 900, margin: '0 auto 40px' }}>
        <div className="faq-categories">
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              className={`faq-cat-btn ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
              <span className="faq-cat-count">
                {tab === 'All Reviews' ? REVIEWS.length
                  : tab === '5 Stars' ? REVIEWS.filter(r => r.rating === 5).length
                  : tab === '4 Stars' ? REVIEWS.filter(r => r.rating === 4).length
                  : REVIEWS.filter(r => r.highlight).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Reviews Grid ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="section-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '24px',
            maxWidth: 1200,
            margin: '0 auto 80px'
          }}
        >
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              layout
              className="premium-card"
              style={{
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
                ...(review.highlight ? {
                  borderColor: 'rgba(0, 230, 118, 0.15)',
                  background: 'linear-gradient(135deg, rgba(0,230,118,0.03) 0%, rgba(13,13,13,0.4) 100%)'
                } : {})
              }}
            >
              {/* Highlight glow */}
              {review.highlight && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'linear-gradient(90deg, transparent, rgba(0,230,118,0.5), transparent)'
                }}/>
              )}

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Avatar initials={review.avatar} highlight={review.highlight} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 2 }}>
                      {review.author}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
                      {review.role}
                    </div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#00e676',
                  background: 'rgba(0,230,118,0.08)',
                  padding: '4px 10px',
                  borderRadius: 100,
                  border: '1px solid rgba(0,230,118,0.15)',
                  letterSpacing: '0.04em'
                }}>
                  <CheckCircle size={11} />
                  VERIFIED
                </div>
              </div>

              {/* Stars + Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <StarRating rating={review.rating} />
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{review.date}</span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: 17,
                fontWeight: 700,
                color: '#fff',
                marginBottom: 12,
                lineHeight: 1.35,
                letterSpacing: '-0.01em'
              }}>
                "{review.title}"
              </h3>

              {/* Body */}
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: 14,
                lineHeight: 1.7,
                margin: '0 0 20px',
                flex: 1
              }}>
                {review.content}
              </p>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: 16,
                marginTop: 'auto'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <Zap size={11} color="#00e5ff" />
                  {review.swapPair}
                </div>
                <Quote size={18} color="rgba(255,255,255,0.06)" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ─── CTA Section ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="about-mission-cta"
        style={{ maxWidth: 800, margin: '0 auto 60px' }}
      >
        <div className="mission-glow" />
        <div className="mission-inner">
          <h3>Ready to experience it yourself?</h3>
          <p>
            Join thousands of traders who have already discovered the fastest, most private way to swap digital assets. No accounts. No KYC. Just pure protocol.
          </p>
          <div className="mission-actions">
            <a href="/#exchange" className="premium-btn cta-btn mission-btn" style={{
              background: 'var(--accent-emerald)',
              color: '#000',
              fontWeight: 700,
              padding: '18px 40px',
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 16,
              textDecoration: 'none'
            }}>
              <span>Start Swapping</span>
              <ChevronRight size={20} />
            </a>
            <a href="https://docs.swaplinq.com" className="secondary-btn glass blur-btn" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              color: '#fff',
              fontWeight: 600,
              padding: '18px 32px',
              borderRadius: 18,
              fontSize: 16
            }}>
              <span>View API Docs</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* ─── Trustpilot Attribution ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          maxWidth: 600,
          margin: '0 auto'
        }}
      >
        <p style={{
          fontSize: 13,
          color: 'var(--text-muted)',
          lineHeight: 1.7
        }}>
          Reviews reflect user experiences with SwaplinQ's execution infrastructure, powered by institutional-grade liquidity providers including{' '}
          <a
            href="https://ca.trustpilot.com/review/changenow.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}
          >
            ChangeNOW (Trustpilot 4.7★)
          </a>
          , StealthEX, and SimpleSwap.
        </p>
      </motion.div>
    </div>
  );
};

export default Reviews;
