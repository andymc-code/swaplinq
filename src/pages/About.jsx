import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Target, Shield, ChevronRight, Cpu, Lock, Activity, EyeOff, CheckCircle,
  Globe, Zap, ArrowRight, Layers, GitBranch, Server, ShieldCheck, Eye,
  TrendingUp, Clock, Database, Network, Fingerprint, Terminal
} from 'lucide-react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

const About = () => {
    return (
        <div className="page-container about-page">
            <SEO 
                title="About Us - Architecture & Mission" 
                description="Learn about Swaplinq, our non-custodial architecture, liquidity aggregation algorithms, and our strict privacy-first stance." 
            />
            
            {/* ─── Hero Header ─── */}
            <header className="page-header about-hero-header">
                <motion.div {...fadeUp}>
                    <span className="badge-pill">OUR ARCHITECTURE & ETHOS</span>
                    <h1>Engineering <span>Financial Freedom</span></h1>
                    <p>Swaplinq is a privacy-first, non-custodial smart routing protocol designed to aggregate liquidity and execute instant cross-chain swaps without holding your funds.</p>
                </motion.div>
                
                {/* Floating metric badges */}
                <motion.div 
                    className="about-hero-metrics"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {[
                        { value: "10+", label: "Liquidity Sources" },
                        { value: "<5s", label: "Avg. Execution" },
                        { value: "0", label: "Data Stored" },
                        { value: "99.99%", label: "Uptime SLA" }
                    ].map((m, i) => (
                        <div key={i} className="hero-metric-chip">
                            <span className="hm-value">{m.value}</span>
                            <span className="hm-label">{m.label}</span>
                        </div>
                    ))}
                </motion.div>
            </header>

            {/* ─── Core Pillars ─── */}
            <section className="about-pillars-section">
                <div className="about-grid">
                    {[
                        { icon: <Target size={22} />, title: "Smart Routing Core", desc: "Our algorithm queries 10+ major DEXs and CEXs in milliseconds to guarantee you the best possible rate across the entire market, ensuring optimal execution on every trade.", color: "emerald", action: "READ DOCS", link: "/documents" },
                        { icon: <Lock size={22} />, title: "Zero Custody Policy", desc: "We never take possession of your private keys or hold your capital. Your funds enter and exit our smart contracts in a single, atomic block execution. No honey-pots, no risk.", color: "blue", action: "SECURITY AUDIT", link: "/documents" },
                        { icon: <EyeOff size={22} />, title: "No-KYC Privacy", desc: "We believe financial privacy is a fundamental right. No ID verification, no accounts, and no logging of your personal data. We strip metadata from every request.", color: "gold", action: "PRIVACY POLICY", link: "/documents" }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            className="premium-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.5 }}
                        >
                            <div className={`glow-icon ${item.color}`}>{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <Link to={item.link} className="premium-action">
                                {item.action} <ChevronRight size={14} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── Architecture Flow ─── */}
            <section className="about-architecture">
                <div className="section-head" style={{ textAlign: 'left', marginLeft: 0 }}>
                    <span className="badge-pill">SYSTEM ARCHITECTURE</span>
                    <motion.h2 {...fadeUp}>
                        How the Swaplinq <span>Engine Works</span>
                    </motion.h2>
                    <p className="section-subtitle" style={{ textAlign: 'left' }}>
                        A visual breakdown of our non-custodial swap pipeline — from quote to settlement.
                    </p>
                </div>

                {/* Architecture Diagram */}
                <motion.div className="about-arch-diagram" {...fadeUp}>
                    <div className="arch-flow-row">
                        <div className="arch-flow-node arch-flow-node--user">
                            <div className="afn-icon"><Users size={24} /></div>
                            <span className="afn-title">User</span>
                            <span className="afn-desc">Initiates swap request</span>
                        </div>
                        <div className="arch-flow-arrow">
                            <ArrowRight size={20} />
                            <span>Quote Request</span>
                        </div>
                        <div className="arch-flow-node arch-flow-node--engine">
                            <div className="afn-icon"><Cpu size={24} /></div>
                            <span className="afn-title">Swaplinq Router</span>
                            <span className="afn-desc">Smart routing engine</span>
                        </div>
                        <div className="arch-flow-arrow">
                            <ArrowRight size={20} />
                            <span>Best Rate</span>
                        </div>
                        <div className="arch-flow-node arch-flow-node--providers">
                            <div className="afn-icon"><Server size={24} /></div>
                            <span className="afn-title">Liquidity Mesh</span>
                            <span className="afn-desc">10+ CEX & DEX sources</span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ─── Deep Dive: 4-Column Engine Breakdown ─── */}
            <section className="about-engine-grid">
                {[
                    {
                        icon: <GitBranch size={22} />,
                        title: "Liquidity Aggregation",
                        color: "emerald",
                        points: [
                            "Queries Binance, KuCoin, OKX, and 7+ more in parallel",
                            "Taps decentralized pools: Uniswap, PancakeSwap, Thorchain",
                            "Identifies optimal route in <50ms",
                            "Locks in best available rate at time of execution"
                        ]
                    },
                    {
                        icon: <ShieldCheck size={22} />,
                        title: "Non-Custodial Flow",
                        color: "blue",
                        points: [
                            "Funds enter and exit in a single atomic operation",
                            "No hot wallets storing user capital",
                            "Eliminates 'honey-pot' attack vectors entirely",
                            "Output coins broadcast directly to your wallet"
                        ]
                    },
                    {
                        icon: <Fingerprint size={22} />,
                        title: "Zero-Knowledge Execution",
                        color: "gold",
                        points: [
                            "No username, password, or email required",
                            "Only data processed: deposit & destination addresses",
                            "Metadata stripped from all frontend node requests",
                            "ISP and local network cannot profile your activity"
                        ]
                    },
                    {
                        icon: <TrendingUp size={22} />,
                        title: "Transparent Economics",
                        color: "cyan",
                        points: [
                            "Small routing fee bundled into displayed rate",
                            "No hidden spreads or withdrawal charges",
                            "What you see = what arrives (minus gas fees)",
                            "Dynamic gas adjustment prevents mempool stalls"
                        ]
                    }
                ].map((card, i) => (
                    <motion.div 
                        key={i} 
                        className="engine-breakdown-card glass"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <div className={`glow-icon ${card.color}`}>{card.icon}</div>
                        <h3>{card.title}</h3>
                        <ul>
                            {card.points.map((p, j) => (
                                <li key={j}>
                                    <CheckCircle size={14} className="check-icon" />
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </section>

            {/* ─── Infrastructure Specs ─── */}
            <section className="about-specs-section">
                <div className="section-head">
                    <span className="badge-pill">INFRASTRUCTURE</span>
                    <motion.h2 {...fadeUp}>
                        Enterprise-Grade <span>Under the Hood</span>
                    </motion.h2>
                </div>

                <div className="technical-specs">
                    <motion.div 
                        className="spec-card glass"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="spec-card-header">
                            <Cpu size={28} color="var(--accent-emerald)" />
                            <h3>Infrastructure Specs</h3>
                        </div>
                        <ul className="spec-list">
                            <li><CheckCircle size={16} color="var(--accent-emerald)" /> Sub-10ms API Quote Retrieval</li>
                            <li><CheckCircle size={16} color="var(--accent-emerald)" /> Multi-sig Cold Storage Routing</li>
                            <li><CheckCircle size={16} color="var(--accent-emerald)" /> Auto-scaling Web3 RPC Nodes</li>
                            <li><CheckCircle size={16} color="var(--accent-emerald)" /> Automated Mempool Conflict Resolution</li>
                            <li><CheckCircle size={16} color="var(--accent-emerald)" /> Geo-distributed Edge Network (5 regions)</li>
                            <li><CheckCircle size={16} color="var(--accent-emerald)" /> Real-time Rate Oracle Integration</li>
                        </ul>
                    </motion.div>

                    <motion.div 
                        className="spec-card glass"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="spec-card-header">
                            <Activity size={28} color="var(--accent-blue)" />
                            <h3>Network Defense</h3>
                        </div>
                        <ul className="spec-list">
                            <li><CheckCircle size={16} color="var(--accent-blue)" /> Strict No-Log Policy (Zero Data Retention)</li>
                            <li><CheckCircle size={16} color="var(--accent-blue)" /> Automated Risk & AML Flagging</li>
                            <li><CheckCircle size={16} color="var(--accent-blue)" /> DDoS Protection via Distributed Edge</li>
                            <li><CheckCircle size={16} color="var(--accent-blue)" /> Front-running & MEV Protection Layer</li>
                            <li><CheckCircle size={16} color="var(--accent-blue)" /> End-to-end TLS 1.3 Encryption</li>
                            <li><CheckCircle size={16} color="var(--accent-blue)" /> Regular Third-party Security Audits</li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* ─── Mission Statement CTA ─── */}
            <motion.section 
                className="about-mission-cta"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                <div className="mission-glow"></div>
                <div className="mission-inner">
                    <span className="badge-pill">OUR MISSION</span>
                    <h3>Building the infrastructure for a permissionless financial future.</h3>
                    <p>We exist to provide everyone — regardless of geography, identity, or capital — access to fair, instant, and private digital asset exchange. No gatekeepers. No middlemen. Just pure protocol.</p>
                    <div className="mission-actions">
                        <Link to="/documents" className="premium-btn cta-btn mission-btn">
                            <span>Read Full Documentation</span>
                            <ChevronRight size={20} />
                        </Link>
                        <Link to="/faq" className="secondary-btn glass blur-btn">
                            <span>Common Questions</span>
                        </Link>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default About;
