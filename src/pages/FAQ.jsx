import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronDown, Search, Shield, Zap, ArrowDownUp, 
    Wallet, HelpCircle, Clock, DollarSign, Lock, Globe, 
    ChevronRight, CheckCircle2, Layers
} from 'lucide-react';
import SEO from '../components/SEO';

const FAQ_CATEGORIES = [
    { id: 'all', label: 'All Questions', icon: <Layers size={16} /> },
    { id: 'getting-started', label: 'Getting Started', icon: <Zap size={16} /> },
    { id: 'security', label: 'Security & Privacy', icon: <Shield size={16} /> },
    { id: 'swaps', label: 'Swaps & Rates', icon: <ArrowDownUp size={16} /> },
    { id: 'wallet', label: 'Wallets & Assets', icon: <Wallet size={16} /> },
    { id: 'fees', label: 'Fees & Limits', icon: <DollarSign size={16} /> },
];

const FAQ_ITEMS = [
    { 
        category: 'getting-started',
        q: "What is Swaplinq?", 
        a: "Swaplinq is a non-custodial, instant cryptocurrency exchange that aggregates liquidity from 10+ institutional-grade providers to offer you the best possible rate — all without requiring registration, accounts, or identity verification. Simply select your pair, enter a destination address, and swap." 
    },
    { 
        category: 'getting-started',
        q: "Do I need to create an account to swap?", 
        a: "Absolutely not. Swaplinq is designed as a fully permissionless protocol. There is no signup, no email, no KYC — ever. Simply visit the exchange, select your trading pair, enter your receiving wallet address, and execute the transaction. Your privacy is fundamental to our architecture." 
    },
    { 
        category: 'getting-started',
        q: "How do I start a swap?", 
        a: "1) Select the asset you want to send and the asset you want to receive. 2) Enter the amount. 3) Provide your destination wallet address. 4) Click 'Exchange Now' and send the exact deposit amount to the address shown. Your swapped assets will arrive in your wallet within minutes." 
    },
    { 
        category: 'getting-started',
        q: "Which cryptocurrencies does Swaplinq support?", 
        a: "We support 350+ digital assets across all major blockchain networks including Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Monero (XMR), Cardano (ADA), Ripple (XRP), Polkadot (DOT), and many more. Our smart routing engine supports over 50,000 unique trading pairs." 
    },
    { 
        category: 'security',
        q: "Is Swaplinq safe to use?", 
        a: "Yes. Swaplinq uses a non-custodial architecture, meaning we never hold your funds. Your assets flow through our smart contracts in a single atomic operation — they enter and exit in the same block. There are no hot wallets, no stored balances, and therefore no \"honey-pot\" attack vector. Our infrastructure is regularly audited by third-party security firms." 
    },
    { 
        category: 'security',
        q: "Does Swaplinq store any personal data?", 
        a: "No. We operate a strict zero-log policy. We do not store IP addresses, browser fingerprints, transaction histories tied to user identities, or any form of personally identifiable information. The only data processed during a swap is the deposit address and your destination wallet address — both of which are discarded after settlement." 
    },
    { 
        category: 'security',
        q: "How does the non-custodial model protect me?", 
        a: "Traditional exchanges hold user funds in centralized hot wallets — creating massive 'honey-pot' targets for hackers. Swaplinq eliminates this entirely. When you initiate a swap, your funds enter our execution engine and are routed directly to the liquidity source. The output coins are then broadcast immediately to your destination wallet. At no point do we store, manage, or have access to your private keys or capital." 
    },
    { 
        category: 'security',
        q: "What happens if my swap gets stuck or fails?", 
        a: "In the rare event a swap encounters an issue — such as network congestion or an underpayment — our automated refund system will return your funds to the source address. Our 24/7 support team can also manually trace and resolve any stuck transactions. We maintain a 99.97% success rate across all swap executions." 
    },
    { 
        category: 'swaps',
        q: "How long does a swap take?", 
        a: "Most swaps complete in 2-30 minutes, depending on the blockchain networks involved. Bitcoin swaps typically take 10-30 minutes due to block confirmation requirements. Ethereum, Solana, and similar networks usually settle in under 5 minutes. Our average across all pairs is under 5 minutes." 
    },
    { 
        category: 'swaps',
        q: "What is the difference between fixed and floating rates?", 
        a: "Fixed Rate locks the exchange rate at the time of your swap, protecting you from market volatility. You get exactly what was quoted. Floating Rate gives you the market rate at the time of execution, which may be slightly higher or lower than the initial estimate. Floating rates typically offer slightly better spreads when volatility is low." 
    },
    { 
        category: 'swaps',
        q: "How does Swaplinq find the best rate?", 
        a: "Our Smart Routing Engine queries 10+ liquidity sources simultaneously — including Binance, KuCoin, OKX, Uniswap, PancakeSwap, and Thorchain. In under 50ms, it evaluates every available rate, calculates network fees, and selects the optimal execution path. This multi-provider approach consistently delivers rates 1-3% better than single-source exchanges." 
    },
    { 
        category: 'wallet',
        q: "Which wallets are compatible with Swaplinq?", 
        a: "Swaplinq is compatible with all standard cryptocurrency wallets. As long as you have a valid receiving address for the asset you're swapping to, any wallet will work — including MetaMask, Trust Wallet, Ledger, Trezor, Phantom, Exodus, and native blockchain wallets. We recommend using hardware wallets for maximum security." 
    },
    { 
        category: 'wallet',
        q: "Can I swap directly from my hardware wallet?", 
        a: "Yes! Simply generate a receiving address from your hardware wallet (Ledger, Trezor, etc.) and paste it into the recipient field on Swaplinq. After you send the deposit, the swapped coins will arrive directly in your hardware wallet." 
    },
    { 
        category: 'wallet',
        q: "What if I send the wrong amount?", 
        a: "If you send less than the minimum amount, you can contact our support team to arrange a refund (minus network fees). If you send more than the quoted amount, the excess will typically be exchanged at the current market rate and sent to your destination wallet. Always double-check the exact amount before sending." 
    },
    { 
        category: 'fees',
        q: "Are there any hidden fees?", 
        a: "No hidden fees — ever. The rate displayed on the swap screen includes our routing fee (typically 0.25-0.5%). The only additional cost is the blockchain network fee (gas/miner fee) required to broadcast the transaction. We display the final received amount upfront so there are never surprises." 
    },
    { 
        category: 'fees',
        q: "What are the minimum and maximum swap amounts?", 
        a: "Minimum amounts vary by asset but are typically very low (e.g., ~$2-5 equivalent). Maximum amounts vary based on available liquidity — for major pairs like BTC/ETH, we routinely handle swaps exceeding $500,000. For very large transactions, our OTC desk can facilitate even larger volumes." 
    },
    { 
        category: 'fees',
        q: "How do network (gas) fees work?", 
        a: "Network fees are not set by Swaplinq — they are the standard blockchain transaction costs required to broadcast your swap. These fees vary by network congestion. Our smart engine dynamically adjusts gas to balance speed and cost, preventing your transaction from getting stuck in the mempool during high-traffic periods." 
    },
];

const FAQItem = ({ item, isOpen, onToggle }) => (
    <motion.div 
        className={`faq-item ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
        layout
    >
        <div className="faq-question">
            <h4>{item.q}</h4>
            <motion.div 
                className="faq-toggle"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <ChevronDown size={20} />
            </motion.div>
        </div>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div 
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <p>{item.a}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

const FAQ = () => {
    const [openIdx, setOpenIdx] = useState(0);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = useMemo(() => {
        return FAQ_ITEMS.filter(item => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesSearch = searchQuery === '' || 
                item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.a.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const categoryCount = (catId) => {
        if (catId === 'all') return FAQ_ITEMS.length;
        return FAQ_ITEMS.filter(i => i.category === catId).length;
    };

    return (
        <div className="page-container faq-page">
            <SEO title="FAQ - Frequently Asked Questions" />

            {/* ─── Hero ─── */}
            <header className="page-header faq-hero-header">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="badge-pill">HELP CENTER</span>
                    <h1>Frequently Asked <span>Questions</span></h1>
                    <p>Everything you need to know about using Swaplinq for instant, anonymous cryptocurrency swaps.</p>
                </motion.div>

                {/* Search Bar */}
                <motion.div 
                    className="faq-search-wrapper"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Search size={18} className="faq-search-icon" />
                    <input 
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setOpenIdx(-1); }}
                        className="faq-search-input"
                    />
                </motion.div>
            </header>

            {/* ─── Category Tabs ─── */}
            <motion.div 
                className="faq-categories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {FAQ_CATEGORIES.map(cat => (
                    <button 
                        key={cat.id}
                        className={`faq-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); setOpenIdx(-1); }}
                    >
                        {cat.icon}
                        <span>{cat.label}</span>
                        <span className="faq-cat-count">{categoryCount(cat.id)}</span>
                    </button>
                ))}
            </motion.div>

            {/* ─── Results Count ─── */}
            <div className="faq-results-count">
                {filteredItems.length === 0 
                    ? <span>No questions found. Try a different search term.</span>
                    : <span>
                        Showing <strong>{filteredItems.length}</strong> of {FAQ_ITEMS.length} questions
                        {searchQuery && <> matching "<em>{searchQuery}</em>"</>}
                      </span>
                }
            </div>

            {/* ─── Accordion ─── */}
            <div className="faq-accordion">
                {filteredItems.map((item, i) => (
                    <FAQItem 
                        key={item.q}
                        item={item}
                        isOpen={openIdx === i}
                        onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                    />
                ))}
            </div>

            {/* ─── Still Need Help ─── */}
            <motion.section 
                className="faq-cta-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="faq-cta-glow"></div>
                <div className="faq-cta-inner">
                    <HelpCircle size={40} color="var(--accent-emerald)" />
                    <h3>Still have questions?</h3>
                    <p>Our 24/7 support team is ready to help. Check our documentation for detailed technical guides, or reach out directly.</p>
                    <div className="faq-cta-buttons">
                        <Link to="/documents" className="premium-btn cta-btn faq-cta-btn">
                            <span>Read Documentation</span>
                            <ChevronRight size={18} />
                        </Link>
                        <a href="mailto:support@swaplinq.io" className="secondary-btn glass blur-btn">
                            Contact Support
                        </a>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default FAQ;
