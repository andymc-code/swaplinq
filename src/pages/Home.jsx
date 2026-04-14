import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate, useInView } from 'framer-motion';
import { 
  ArrowDownUp, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Lock,
  Globe,
  TrendingUp,
  Wallet,
  Shield,
  EyeOff,
  Headset,
  Cpu,
  Activity,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import SEO, { buildFAQSchema, buildHowToSchema } from '../components/SEO';
import CustomSwapWidget from '../components/CustomSwapWidget';

import SystemStatusBadge from '../components/SystemStatusBadge';
import HomeFAQSection from '../components/HomeFAQSection';
import { PROVIDERS, DEFAULT_PROVIDER } from '../config/providers';

import { SiBinance, SiKucoin, SiCoinbase, SiChainlink, SiSolana, SiEthereum } from 'react-icons/si';

const LIQUIDITY_PARTNERS = [
    { name: 'Binance', Icon: SiBinance, color: '#F3BA2F', url: 'https://www.binance.com' },
    { name: 'KuCoin', Icon: SiKucoin, color: '#24a159', url: 'https://www.kucoin.com' },
    { name: 'Coinbase', Icon: SiCoinbase, color: '#0052FF', url: 'https://www.coinbase.com' },
    { name: 'Chainlink', Icon: SiChainlink, color: '#2A5ADA', url: 'https://chain.link' },
    { name: 'Solana', Icon: SiSolana, color: '#14F195', url: 'https://solana.com' },
    { name: 'Ethereum', Icon: SiEthereum, color: '#627EEA', url: 'https://ethereum.org' }
];

const AnimatedCounter = ({ value, decimals = 0, prefix = "", suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useMotionValue(0);
    const [displayValue, setDisplayValue] = useState(prefix + (0).toFixed(decimals) + suffix);

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(count, value, {
            duration: 4,
            ease: [0.25, 0.1, 0.25, 1],
            onUpdate: (latest) => {
                setDisplayValue(prefix + latest.toFixed(decimals) + suffix);
            }
        });
        return () => controls.stop();
    }, [value, decimals, prefix, suffix, count, isInView]);

    return <span ref={ref}>{displayValue}</span>;
};

const Ticker = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,monero,cardano,ripple,polkadot,dogecoin,chainlink,matic-network&vs_currencies=usd&include_24hr_change=true');
                const data = await res.json();
                
                const getCoinData = (id, symbol, label) => {
                    const coin = data[id];
                    if (!coin || coin.usd === undefined) return null;
                    return { id: symbol, label, price: coin.usd, change: coin.usd_24h_change || 0 };
                };

                const tickerData = [
                    { ...getCoinData('bitcoin', 'BTC', 'Bitcoin'), logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/BTC.svg' },
                    { ...getCoinData('ethereum', 'ETH', 'Ethereum'), logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/ETH.svg' },
                    { ...getCoinData('solana', 'SOL', 'Solana'), logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/SOL.svg' },
                    { ...getCoinData('monero', 'XMR', 'Monero'), logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/XMR.svg' },
                    { ...getCoinData('cardano', 'ADA', 'Cardano'), logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/ADA.svg' },
                    { ...getCoinData('ripple', 'XRP', 'Ripple'), logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/XRP.svg' },
                    { ...getCoinData('polkadot', 'DOT', 'Polkadot'), logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/DOT.svg' },
                    { ...getCoinData('dogecoin', 'DOGE', 'Dogecoin'), logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/DOGE.svg' },
                    { ...getCoinData('chainlink', 'LINK', 'Chainlink'), logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/LINK.svg' },
                    { ...getCoinData('matic-network', 'MATIC', 'Polygon'), logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/MATIC.svg' }
                ].filter(item => item.id !== undefined);

                if (tickerData.length > 0) {
                    setPrices([...tickerData, ...tickerData]);
                    setLoading(false);
                }
            } catch (err) {
                console.error("CoinGecko API Rate Limit or Error", err);
            }
        };
        fetchPrices();
        const interval = setInterval(fetchPrices, 60000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return null;

    return (
        <div className="ticker-wrapper">
            <div className="ticker-scroll">
                {prices.map((coin, i) => (
                    <div key={i} className="ticker-item">
                        <img src={coin.logo} alt={coin.id} className="ticker-logo" />
                        <span className="ticker-symbol">{coin.id}</span>
                        <span className="ticker-price">
                            ${coin.price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                        <span className={`ticker-change ${coin.change >= 0 ? 'up' : 'down'}`}>
                            {coin.change >= 0 ? '▲' : '▼'} {Math.abs(coin.change || 0).toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SwapCard = () => {
    return (
        <motion.div 
            className="swap-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <CustomSwapWidget defaultFrom="btc" defaultTo="eth" />
        </motion.div>
    );
};

/* Floating orb decoration */
const FloatingOrb = ({ size, color, top, left, delay }) => (
    <motion.div
        className="floating-orb"
        style={{
            width: size,
            height: size,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            top,
            left,
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0,
        }}
        animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay,
            ease: "easeInOut",
        }}
    />
);

const Home = () => {

    const homeFaqItems = [
        { q: "Do I really need absolutely no account or ID?", a: "Yes. SwaplinQ is a strict non-KYC, non-custodial exchange. You will never be asked to provide identifying documents, email addresses, or phone numbers to swap your assets." },
        { q: "How long does a typical swap take to complete?", a: "Most swaps are completed within 2 to 10 minutes. The exact duration depends on the block time and network congestion of the specific blockchains you are trading across." },
        { q: "Are there any maximum trading limits?", a: "No. Since SwaplinQ does not employ traditional custodial accounts, there are no tiered verification limits. You can execute swaps of virtually any size." },
        { q: "What happens if I send the wrong amount or the swap fails?", a: "SwaplinQ employs precise auto-refund parameters. If your deposit underpays the required network fees, or if extreme volatility causes a rate failure, your funds are automatically returned." },
        { q: "Is my transaction completely untraceable?", a: "SwaplinQ does not store user IP addresses, browser fingerprints, or transaction histories. For absolute anonymity, we recommend utilizing privacy coins like Monero (XMR)." }
    ];

    const howToSteps = [
        { title: "Select Your Pair", desc: "Choose the cryptocurrency you want to exchange and the asset you'd like to receive. Enter the amount to see an instant estimate for your anonymous swap." },
        { title: "Enter Your Address", desc: "Provide the recipient's wallet address for the asset you want to receive." },
        { title: "Send Your Coins", desc: "Send the exact amount of the original asset to the deposit address provided by SwaplinQ." },
        { title: "Receive Your Assets", desc: "Our smart routing system swaps your coins at the best rate and sends them directly to your wallet in minutes." }
    ];

    return (
        <>
            <SEO 
                title="Swap BTC, ETH, XMR Instant & Anonymous" 
                description="SwaplinQ is the leading non-custodial instant cryptocurrency exchange. Swap 1,500+ assets with no KYC, no accounts. Best rates from 10+ liquidity providers. Average swap time under 5 minutes."
                keywords="SwaplinQ, instant crypto swap, non-custodial exchange, no KYC, anonymous crypto exchange, Bitcoin swap, Ethereum exchange, Monero swap, best crypto rates, privacy exchange"
                jsonLd={[
                    buildFAQSchema(homeFaqItems),
                    buildHowToSchema(
                        "How to Swap Crypto on SwaplinQ Without KYC",
                        "Exchange any cryptocurrency instantly on SwaplinQ with no registration, no KYC, and no accounts required. Follow these 4 simple steps.",
                        howToSteps
                    )
                ]}
            />

            {/* ─── HERO ─── */}
            <section className="hero">
                <div className="hero-content">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <span className="hero-badge">Professional Grade Infrastructure</span>
                        <h1>The Future of <span>Instant</span> Asset Exchange.</h1>
                        <p>Experience the ultimate frictionless swap. Anonymous, secure, and powered by global liquidity leaders.</p>
                        
                        <div className="hero-actions">
                            <a href="#swap" onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#swap').scrollIntoView({ behavior: 'smooth' });
                            }} className="primary-btn">
                                <span>Start Swapping</span>
                                <ChevronRight size={18} />
                            </a>
                            <a href="https://docs.swaplinq.com" className="secondary-btn glass blur-btn">
                                <span>View Documentation</span>
                            </a>
                        </div>
                        
                        <div className="hero-system-status">
                            <SystemStatusBadge />
                        </div>
                    </motion.div>
                </div>
                
                <div className="hero-visual" id="swap">
                    <SwapCard />
                </div>
            </section>

            {/* ─── PARTNERS ─── */}
            <div className="partners-strip">
                <p className="partners-label">LIQUIDITY & INFRASTRUCTURE PARTNERS</p>
                <div className="partners-marquee">
                    <div className="partners-track">
                        {[...LIQUIDITY_PARTNERS, ...LIQUIDITY_PARTNERS].map((partner, idx) => {
                            const Icon = partner.Icon;
                            return (
                                <a 
                                    key={idx} 
                                    href={partner.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="partner-logo" 
                                    style={{'--brand-color': partner.color}}
                                >
                                    <Icon size={28} className="partner-icon" />
                                    <span>{partner.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ─── STATS BAR (moved up for impact) ─── */}
            <section className="stats-bar">
                <div className="stats-grid">
                    {[
                        { end: 350, suffix: "+", label: "Assets Supported", icon: <Layers size={20} /> },
                        { end: 2.4, decimals: 1, suffix: "M", label: "Completed Swaps", icon: <Activity size={20} /> },
                        { end: 5, prefix: "< ", suffix: "s", label: "Avg. Duration", icon: <Zap size={20} /> },
                        { end: 4.9, decimals: 1, suffix: "/5", label: "User Rating", icon: <Sparkles size={20} /> }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            className="stat-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="stat-icon-ring">
                                {stat.icon}
                            </div>
                            <span className="stat-value">
                                <AnimatedCounter 
                                    value={stat.end} 
                                    decimals={stat.decimals || 0}
                                    suffix={stat.suffix || ""}
                                    prefix={stat.prefix || ""}
                                />
                            </span>
                            <span className="stat-label">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="features-section" id="features">
                <div className="section-head">
                    <span className="badge-pill">PLATFORM FEATURES</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Why choose <span>Swaplinq?</span>
                    </motion.h2>
                    <p className="section-subtitle">
                        Experience the next generation of digital asset management with high-speed protocols and enterprise-grade security.
                    </p>
                </div>

                <div className="features-grid">
                    {[
                        { icon: <Zap size={20} />, title: "Instant Swaps", desc: "No registration required. Exchange your assets in seconds with lightning speed. Our protocol executes atomic swaps across 1,500+ trading pairs.", color: "cyan", action: "EXECUTE PROTOCOL" },
                        { icon: <Globe size={20} />, title: "Global Access", desc: "Available 24/7 across any borders. Access 50,000+ currency pairs effortlessly with deep liquidity from institutional-grade providers.", color: "emerald", action: "VIEW NETWORK" },
                        { icon: <Shield size={20} />, title: "Premium Security", desc: "Your keys, your coins. We never hold your assets. Total non-custodial architecture means zero counterparty risk.", color: "blue", action: "AUDIT REPORT" }
                    ].map((feature, i) => (
                        <motion.div 
                            key={i}
                            className="premium-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div className={`glow-icon ${feature.color}`}>{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                            <a href="https://docs.swaplinq.com" className="premium-action">
                                {feature.action} <ChevronRight size={14} />
                            </a>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    className="data-monitoring-panel glass"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="panel-header">
                        <div className="pulse-content">
                            <h4>Real-time Data Pulse</h4>
                            <p>Monitoring over 1.2M transactions per second across the decentralized mesh network.</p>
                        </div>
                        <div className="pulse-stats">
                            <div className="pulse-stat-box">
                                <span className="stat-label">LATENCY</span>
                                <span className="stat-value">14ms</span>
                            </div>
                            <div className="pulse-stat-box">
                                <span className="stat-label">UP-TIME</span>
                                <span className="stat-value">99.99%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="panel-ticker-zone">
                        <Ticker />
                    </div>
                </motion.div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="how-it-works-section" id="how-it-works">
                <div className="section-head">
                    <span className="badge-pill">NON KYC EXCHANGE</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Simple. Fast. <span>Secure.</span>
                    </motion.h2>
                    <p className="section-subtitle">
                        Learn how to swap your assets instantly in four simple steps without ever creating an account. Swaplinq is the premier instant crypto exchange for trading without verification.
                    </p>
                </div>

                <div className="timeline-grid">
                    {[
                        { num: "01", title: "Select Your Pair", desc: "Choose the cryptocurrency you want to exchange and the asset you'd like to receive. Enter the amount to see an instant estimate for your anonymous swap.", icon: <ArrowDownUp size={18} /> },
                        { num: "02", title: "Enter Your Address", desc: "Provide the recipient's wallet address for the asset you want to receive. This is where your coins will be sent seamlessly after the exchange.", icon: <Wallet size={18} /> },
                        { num: "03", title: "Send Your Coins", desc: "Send the exact amount of the original asset to the deposit address provided by Swaplinq. We handle the rest instantly without KYC.", icon: <ArrowRight size={18} /> },
                        { num: "04", title: "Receive Your Assets", desc: "Our smart routing system swaps your coins at the best rate and sends them directly to your wallet in minutes. True no-account crypto trading.", icon: <CheckCircle2 size={18} /> }
                    ].map((step, i) => (
                        <motion.div 
                            key={i}
                            className="timeline-step glass"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                        >
                            <div className="step-number-huge">{step.num}</div>
                            <div className="step-content">
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── TRUST & GUARANTEE ─── */}
            <section className="trust-section" id="trust">
                <div className="section-head">
                    <span className="badge-pill">OUR GUARANTEE</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Total Privacy. <span>Zero Risk.</span>
                    </motion.h2>
                    <p className="section-subtitle">
                        We believe financial privacy is a fundamental human right. Swaplinq operates without custody, without KYC, and with complete transparency.
                    </p>
                </div>

                <div className="guarantee-grid">
                    {[
                        { icon: <ShieldCheck size={24} />, title: "Non-Custodial", desc: "We never hold your funds. Crypto is sent directly to your wallet instantly. Nothing to hack, nothing to steal.", color: "emerald" },
                        { icon: <EyeOff size={24} />, title: "Total Anonymity", desc: "No email, no accounts, no ID verification. We don't track your IP or log activity. Pure anonymous swaps.", color: "cyan" },
                        { icon: <Lock size={24} />, title: "Fixed Rates", desc: "Complete transparency in execution. Lock in your rate to ensure you get exactly what you expect, protected against volatility.", color: "blue" },
                        { icon: <Headset size={24} />, title: "24/7 Support", desc: "Real, experienced human support available around the clock to assist you with any network routing issues.", color: "purple" }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            className="guarantee-card glass"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div className={`glow-icon ${item.color}`}>{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <HomeFAQSection />

            {/* ─── CTA ─── */}
            <section className="cta-section">
                <div className="cta-bg-glow"></div>
                <div className="cta-inner" style={{ position: 'relative', zIndex: 2 }}>
                    <h3>Reclaim your financial privacy today.</h3>
                    <p>Join the thousands of users seamlessly swapping crypto with zero KYC, absolute security, and total anonymity.</p>
                    <a href="#swap" onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#swap').scrollIntoView({ behavior: 'smooth' });
                    }} className="premium-btn cta-btn">
                        <span>Start Swapping Anonymously</span>
                        <ChevronRight size={22} className="cta-icon" />
                    </a>
                </div>
            </section>
        </>
    );
};

export default Home;
