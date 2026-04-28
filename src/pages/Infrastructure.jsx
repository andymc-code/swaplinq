import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Server, Shield, Zap, ChevronRight, CheckCircle, Globe, Layers,
  Network, ArrowRight, GitBranch, ShieldCheck, Lock, Eye, Activity,
  RefreshCw, Cpu, TrendingUp, ExternalLink
} from 'lucide-react';
import SEO, { buildBreadcrumbSchema } from '../components/SEO';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

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

/* ── Partner Data ── */
const LIQUIDITY_PARTNERS = [
  {
    name: 'ChangeNOW',
    role: 'Primary Liquidity Provider',
    description: 'Non-custodial instant crypto exchange powering 900+ trading pairs with fixed and floating rates. Licensed and regulated with a proven track record since 2017.',
    url: 'https://changenow.io',
    features: ['900+ Pairs', 'Fixed & Floating Rates', 'No KYC Required', '24/7 Support'],
    color: 'emerald',
    icon: <RefreshCw size={22} />
  },
  {
    name: 'Additional DEX Aggregators',
    role: 'Decentralized Liquidity',
    description: 'We tap into decentralized exchange aggregators to access deep on-chain liquidity pools across Ethereum, BSC, Polygon, and other major EVM chains.',
    url: null,
    features: ['On-chain Execution', 'Multi-chain Support', 'MEV Protection', 'Atomic Swaps'],
    color: 'blue',
    icon: <Layers size={22} />
  },
  {
    name: 'Cross-chain Bridges',
    role: 'Bridge Liquidity',
    description: 'Integrated bridge partners enable seamless cross-chain transfers between non-EVM networks like Bitcoin, Monero, Solana, and Cosmos ecosystem chains.',
    url: null,
    features: ['Cross-chain Routing', 'Native Asset Support', 'Trustless Bridges', 'Low Slippage'],
    color: 'cyan',
    icon: <Network size={22} />
  }
];

const ROUTING_STEPS = [
  {
    step: '01',
    title: 'Quote Aggregation',
    description: 'SwaplinQ simultaneously queries all connected liquidity partners to fetch real-time rates for your requested pair.',
    icon: <Globe size={22} />,
    color: 'emerald'
  },
  {
    step: '02',
    title: 'Smart Route Selection',
    description: 'Our routing algorithm compares rates, fees, and estimated delivery times to select the optimal execution path.',
    icon: <GitBranch size={22} />,
    color: 'blue'
  },
  {
    step: '03',
    title: 'Non-Custodial Execution',
    description: 'Your funds are sent directly to the selected provider. SwaplinQ never takes custody — we only facilitate the route.',
    icon: <ShieldCheck size={22} />,
    color: 'gold'
  },
  {
    step: '04',
    title: 'Direct Settlement',
    description: 'The output asset is sent directly from the provider to your destination wallet. No intermediary holding period.',
    icon: <ArrowRight size={22} />,
    color: 'cyan'
  }
];

const TRANSPARENCY_POINTS = [
  {
    icon: <Lock size={20} />,
    title: 'Zero Fund Custody',
    desc: 'SwaplinQ never holds, stores, or has access to your funds at any point during the exchange process.'
  },
  {
    icon: <Eye size={20} />,
    title: 'Full Provider Transparency',
    desc: 'Every swap receipt shows which provider executed your trade, the exact rate applied, and network fees incurred.'
  },
  {
    icon: <Shield size={20} />,
    title: 'Partner Vetting',
    desc: 'All liquidity partners are evaluated for security, uptime, regulatory standing, and execution reliability before integration.'
  },
  {
    icon: <Activity size={20} />,
    title: 'Real-time Monitoring',
    desc: 'We continuously monitor partner health, rate accuracy, and settlement times to ensure optimal performance.'
  }
];

const Infrastructure = () => {
  return (
    <div className="page-container infra-page">
      <SEO
        title="Infrastructure & Liquidity Partners"
        description="SwaplinQ is a smart-routing layer that aggregates and routes through established non-custodial providers including ChangeNOW and other liquidity partners. We never custody funds."
        keywords="SwaplinQ infrastructure, liquidity partners, ChangeNOW, non-custodial exchange, smart routing, crypto aggregator, liquidity aggregation, decentralized exchange"
        jsonLd={[
          buildBreadcrumbSchema([
            { name: 'SwaplinQ', url: 'https://swaplinq.com' },
            { name: 'Infrastructure & Liquidity Partners', url: 'https://swaplinq.com/infrastructure' }
          ])
        ]}
      />

      {/* ─── Hero Header ─── */}
      <header className="page-header">
        <motion.div {...fadeUp}>
          <span className="badge-pill">INFRASTRUCTURE & LIQUIDITY</span>
          <h1>Infrastructure & <span>Liquidity Partners</span></h1>
          <p style={{ maxWidth: 720, margin: '0 auto' }}>
            SwaplinQ is a smart-routing layer that aggregates and routes through established non-custodial providers
            including ChangeNOW and other liquidity partners. We never custody funds.
          </p>
        </motion.div>

        {/* Metric chips */}
        <motion.div
          className="about-hero-metrics"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { value: '10+', label: 'Liquidity Sources' },
            { value: '900+', label: 'Trading Pairs' },
            { value: '0', label: 'Funds Custodied' },
            { value: '<50ms', label: 'Route Selection' }
          ].map((m, i) => (
            <div key={i} className="hero-metric-chip">
              <span className="hm-value">{m.value}</span>
              <span className="hm-label">{m.label}</span>
            </div>
          ))}
        </motion.div>
      </header>

      {/* ─── Core Disclosure Banner ─── */}
      <motion.section {...fadeUp} style={{ maxWidth: 900, margin: '0 auto 60px', padding: '0 20px' }}>
        <div className="about-arch-diagram" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontWeight: 700, color: '#00e676',
            background: 'rgba(0,230,118,0.08)',
            padding: '6px 14px', borderRadius: 100,
            border: '1px solid rgba(0,230,118,0.15)',
            letterSpacing: '0.06em', marginBottom: 20
          }}>
            <ShieldCheck size={14} />
            NON-CUSTODIAL SMART ROUTING PROTOCOL
          </div>
          <h3 style={{
            fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 700,
            color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 16
          }}>
            SwaplinQ is a smart-routing layer that aggregates and routes through established non-custodial
            providers including <span style={{ color: 'var(--accent-emerald)' }}>ChangeNOW</span> and
            other liquidity partners. <em style={{ color: 'var(--accent-emerald)', fontStyle: 'normal', fontWeight: 800 }}>We never custody funds.</em>
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 700, margin: '0 auto' }}>
            When you initiate a swap, our routing engine compares rates from multiple non-custodial providers in real time
            and connects you directly to the best option. Your assets flow from your wallet → provider → your destination wallet.
            SwaplinQ acts solely as the intelligence layer — we facilitate the route, never touch the funds.
          </p>
        </div>
      </motion.section>

      {/* ─── How Smart Routing Works ─── */}
      <section style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 20px' }}>
        <div className="section-head">
          <span className="badge-pill">SMART ROUTING ENGINE</span>
          <motion.h2 {...fadeUp}>
            How Our <span>Routing Works</span>
          </motion.h2>
          <p className="section-subtitle">
            A transparent look at how SwaplinQ finds and executes the best rate — without ever holding your funds.
          </p>
        </div>

        <motion.div
          className="infra-routing-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {ROUTING_STEPS.map((step, i) => (
            <motion.div key={i} className="premium-card infra-step-card" variants={cardVariants}>
              <div className="infra-step-number">{step.step}</div>
              <div className={`glow-icon ${step.color}`}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {i < ROUTING_STEPS.length - 1 && (
                <div className="infra-step-connector">
                  <ArrowRight size={16} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Liquidity Partners ─── */}
      <section style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 20px' }}>
        <div className="section-head">
          <span className="badge-pill">OUR PARTNERS</span>
          <motion.h2 {...fadeUp}>
            Liquidity <span>Partners</span>
          </motion.h2>
          <p className="section-subtitle">
            We integrate with established, reputable non-custodial providers to ensure deep liquidity and reliable execution.
          </p>
        </div>

        <motion.div
          className="infra-partners-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {LIQUIDITY_PARTNERS.map((partner, i) => (
            <motion.div
              key={i}
              className="premium-card infra-partner-card"
              variants={cardVariants}
              style={i === 0 ? {
                borderColor: 'rgba(0, 230, 118, 0.15)',
                background: 'linear-gradient(135deg, rgba(0,230,118,0.03) 0%, rgba(13,13,13,0.4) 100%)'
              } : {}}
            >
              {i === 0 && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: 'linear-gradient(90deg, transparent, rgba(0,230,118,0.5), transparent)',
                  borderRadius: '20px 20px 0 0'
                }} />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                <div className={`glow-icon ${partner.color}`}>{partner.icon}</div>
                <div>
                  <h3 style={{ margin: 0 }}>{partner.name}</h3>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.1em'
                  }}>{partner.role}</span>
                </div>
              </div>

              <p style={{ marginTop: 12 }}>{partner.description}</p>

              <div className="infra-partner-features">
                {partner.features.map((feat, j) => (
                  <div key={j} className="infra-feature-chip">
                    <CheckCircle size={12} />
                    {feat}
                  </div>
                ))}
              </div>

              {partner.url && (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-action"
                  style={{ marginTop: 16 }}
                >
                  VISIT PARTNER <ExternalLink size={13} />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Transparency & Trust ─── */}
      <section style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 20px' }}>
        <div className="section-head">
          <span className="badge-pill">TRANSPARENCY</span>
          <motion.h2 {...fadeUp}>
            Trust Through <span>Transparency</span>
          </motion.h2>
          <p className="section-subtitle">
            Our commitment to never custodying funds is backed by architectural decisions, not just promises.
          </p>
        </div>

        <motion.div
          className="infra-transparency-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TRANSPARENCY_POINTS.map((item, i) => (
            <motion.div key={i} className="engine-breakdown-card glass" variants={cardVariants}>
              <div className="glow-icon emerald">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Architecture Flow Diagram ─── */}
      <section style={{ maxWidth: 1000, margin: '0 auto 80px', padding: '0 20px' }}>
        <div className="section-head">
          <span className="badge-pill">FUND FLOW</span>
          <motion.h2 {...fadeUp}>
            How Funds <span>Flow</span>
          </motion.h2>
        </div>

        <motion.div className="about-arch-diagram" {...fadeUp}>
          <div className="arch-flow-row">
            <div className="arch-flow-node arch-flow-node--user">
              <div className="afn-icon"><Lock size={24} /></div>
              <span className="afn-title">Your Wallet</span>
              <span className="afn-desc">You send funds</span>
            </div>
            <div className="arch-flow-arrow">
              <ArrowRight size={20} />
              <span>Direct Transfer</span>
            </div>
            <div className="arch-flow-node arch-flow-node--engine">
              <div className="afn-icon"><Cpu size={24} /></div>
              <span className="afn-title">SwaplinQ Router</span>
              <span className="afn-desc">Routes only — no custody</span>
            </div>
            <div className="arch-flow-arrow">
              <ArrowRight size={20} />
              <span>Best Route</span>
            </div>
            <div className="arch-flow-node arch-flow-node--providers">
              <div className="afn-icon"><Server size={24} /></div>
              <span className="afn-title">Provider (e.g. ChangeNOW)</span>
              <span className="afn-desc">Executes the swap</span>
            </div>
            <div className="arch-flow-arrow">
              <ArrowRight size={20} />
              <span>Settlement</span>
            </div>
            <div className="arch-flow-node arch-flow-node--user">
              <div className="afn-icon"><Lock size={24} /></div>
              <span className="afn-title">Your Wallet</span>
              <span className="afn-desc">Receives output</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Mission CTA ─── */}
      <motion.section
        className="about-mission-cta"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="mission-glow"></div>
        <div className="mission-inner">
          <span className="badge-pill">START SWAPPING</span>
          <h3>Transparent routing. Zero custody. Maximum privacy.</h3>
          <p>Experience the power of smart-routed, non-custodial exchanges aggregated from the best liquidity partners in the industry.</p>
          <div className="mission-actions">
            <Link to="/" className="premium-btn cta-btn mission-btn">
              <span>Launch Exchange</span>
              <ChevronRight size={20} />
            </Link>
            <Link to="/about" className="secondary-btn glass blur-btn">
              <span>Our Architecture</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Infrastructure;
