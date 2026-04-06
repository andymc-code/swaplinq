import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
    BookOpen, ChevronRight, Zap, Shield, Globe, ArrowLeftRight, 
    Lock, Eye, Server, Code, Terminal, CheckCircle, Copy, 
    ExternalLink, Layers, Activity, Database, Cpu, FileText,
    Users, TrendingUp, AlertTriangle, Clock, Hash, Menu, X
} from 'lucide-react';

/* ─── Sidebar Navigation Structure ─── */
const SIDEBAR_SECTIONS = [
    {
        group: 'Get Started',
        items: [
            { id: 'welcome', label: 'Welcome to Swaplinq' },
            { id: 'architecture', label: 'Architecture Overview' },
            { id: 'how-swaps-work', label: 'How Swaps Work' },
        ]
    },
    {
        group: 'Protocol',
        items: [
            { id: 'liquidity-engine', label: 'Liquidity Engine' },
            { id: 'smart-routing', label: 'Smart Routing' },
            { id: 'rate-optimization', label: 'Rate Optimization' },
            { id: 'supported-assets', label: 'Supported Assets' },
        ]
    },
    {
        group: 'Security',
        items: [
            { id: 'non-custodial', label: 'Non-Custodial Model' },
            { id: 'privacy', label: 'Privacy & No-KYC' },
            { id: 'network-defense', label: 'Network Defense' },
        ]
    },
    {
        group: 'API Reference',
        items: [
            { id: 'api-providers', label: 'Integration Partners' },
            { id: 'api-endpoints', label: 'Core Endpoints' },
            { id: 'response-codes', label: 'Response Codes' },
        ]
    },
    {
        group: 'Resources',
        items: [
            { id: 'faq', label: 'FAQ' },
            { id: 'status', label: 'System Status' },
        ]
    },
];

/* ─── Code Block Component ─── */
const CodeBlock = ({ code, language = 'bash', title }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="docs-code-block">
            {title && <div className="code-block-header"><span>{title}</span><span className="code-lang">{language}</span></div>}
            <pre>
                <code>{code}</code>
            </pre>
            <button className="code-copy-btn" onClick={handleCopy}>
                {copied ? <><CheckCircle size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
        </div>
    );
};

/* ─── Info Callout Component ─── */
const Callout = ({ type = 'info', children }) => {
    const icons = { info: <Zap size={18} />, warning: <AlertTriangle size={18} />, tip: <CheckCircle size={18} /> };
    return (
        <div className={`docs-callout docs-callout--${type}`}>
            <div className="callout-icon">{icons[type]}</div>
            <div className="callout-content">{children}</div>
        </div>
    );
};

/* ─── Main Page ─── */
const Documents = () => {
    const [activeSection, setActiveSection] = useState('welcome');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const contentRef = useRef(null);

    /* Intersection Observer for active section tracking */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-80px 0px -70% 0px', threshold: 0.1 }
        );

        const sections = document.querySelectorAll('.docs-section-anchor');
        sections.forEach((s) => observer.observe(s));
        return () => sections.forEach((s) => observer.unobserve(s));
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setSidebarOpen(false);
        }
    };

    /* Right-side TOC items for the currently visible group */
    const currentGroup = SIDEBAR_SECTIONS.find(g => g.items.some(i => i.id === activeSection));
    const tocItems = currentGroup ? currentGroup.items : SIDEBAR_SECTIONS[0].items;

    return (
        <div className="docs-page-wrapper">
            <Helmet>
                <title>Swaplinq Documentation — Architecture, API & Protocol</title>
                <meta name="description" content="Complete technical documentation for the Swaplinq non-custodial exchange protocol. Architecture, API reference, liquidity engine, smart routing, and security model." />
            </Helmet>

            {/* ─── Mobile Sidebar Toggle ─── */}
            <button className="docs-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                <span>Navigation</span>
            </button>

            {/* ─── Left Sidebar ─── */}
            <aside className={`docs-sidebar ${sidebarOpen ? 'docs-sidebar--open' : ''}`}>
                <div className="docs-sidebar-inner">
                    {SIDEBAR_SECTIONS.map((group) => (
                        <div key={group.group} className="sidebar-group">
                            <h4 className="sidebar-group-title">{group.group}</h4>
                            <ul>
                                {group.items.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            className={`sidebar-link ${activeSection === item.id ? 'sidebar-link--active' : ''}`}
                                            onClick={() => scrollToSection(item.id)}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </aside>

            {/* ─── Main Content ─── */}
            <main className="docs-main" ref={contentRef}>

                {/* ══════════════════════════════════════════════ */}
                {/* GET STARTED                                   */}
                {/* ══════════════════════════════════════════════ */}
                <div id="welcome" className="docs-section-anchor">
                    <span className="docs-breadcrumb">Get Started</span>
                    <h1 className="docs-page-title">Swaplinq Documentation</h1>
                    <p className="docs-subtitle">Non-custodial exchange infrastructure for instant crypto-to-crypto swaps, deep liquidity, and more.</p>

                    <Callout type="tip">
                        <strong>Why Swaplinq?</strong> We aggregate 10+ liquidity sources in real-time, execute atomic non-custodial swaps in under 5 seconds, and never ask for your personal data. What you see is what you get.
                    </Callout>

                    <h2>Why Build on Swaplinq</h2>
                    <p>Swaplinq is the liquidity infrastructure behind a growing ecosystem of wallets, DeFi dashboards, and trading terminals. Whether you're building a swap aggregator, a payments app, or embedding exchange functionality into your dApp, Swaplinq gives you the tools to ship fast and at scale.</p>
                    <p>The same infrastructure that powers <strong>swaplinq.io</strong> is available to you as production-grade REST APIs. No RPC nodes, no blockchain state management, no transaction complexity. Swaplinq abstracts all of it so you can focus on your product. Every API returns clean JSON, works with a single API key, and is designed to be consumed by both developers and AI agents.</p>

                    <div className="docs-feature-grid">
                        <div className="docs-feature-card">
                            <Zap size={24} color="var(--accent-emerald)" />
                            <h3>Instant Swaps</h3>
                            <p>Average completion time under 5 seconds. No order books, no waiting.</p>
                        </div>
                        <div className="docs-feature-card">
                            <Shield size={24} color="var(--accent-blue)" />
                            <h3>Non-Custodial</h3>
                            <p>We never hold your funds. Atomic execution from deposit to payout.</p>
                        </div>
                        <div className="docs-feature-card">
                            <Globe size={24} color="var(--accent-purple)" />
                            <h3>1,500+ Assets</h3>
                            <p>Cross-chain support for BTC, ETH, SOL, XMR, and hundreds more.</p>
                        </div>
                    </div>
                </div>

                <div id="architecture" className="docs-section-anchor">
                    <h2>Architecture Overview</h2>
                    <p>Swaplinq operates as a <strong>non-custodial smart routing protocol</strong> that sits between the user and a distributed mesh of liquidity providers. Our backend is a stateless, horizontally-scaled microservice architecture deployed across multi-region edge nodes.</p>
                    
                    <div className="docs-architecture-diagram">
                        <div className="arch-layer">
                            <div className="arch-node arch-node--user">
                                <Users size={20} />
                                <span>User</span>
                            </div>
                            <ChevronRight size={16} className="arch-arrow" />
                            <div className="arch-node arch-node--swaplinq">
                                <Layers size={20} />
                                <span>Swaplinq Router</span>
                            </div>
                            <ChevronRight size={16} className="arch-arrow" />
                            <div className="arch-node arch-node--providers">
                                <Database size={20} />
                                <span>Liquidity Mesh</span>
                            </div>
                        </div>
                    </div>

                    <h3>Core Components</h3>
                    <ul className="docs-list">
                        <li><strong>Gateway Layer</strong> — TLS-terminated API gateway with rate limiting, DDoS mitigation, and request validation.</li>
                        <li><strong>Routing Engine</strong> — Queries all connected liquidity sources in parallel (<code>&lt;10ms</code>), ranks results by effective rate, and selects the optimal execution path.</li>
                        <li><strong>Execution Pipeline</strong> — Generates unique deposit addresses, monitors incoming transactions, triggers the swap on the selected provider, and broadcasts the output to the user's destination wallet.</li>
                        <li><strong>Status Tracker</strong> — Real-time WebSocket and polling endpoints that report transaction state transitions from <code>waiting</code> → <code>confirming</code> → <code>exchanging</code> → <code>sending</code> → <code>finished</code>.</li>
                    </ul>
                </div>

                <div id="how-swaps-work" className="docs-section-anchor">
                    <h2>How Swaps Work</h2>
                    <p>A typical swap on Swaplinq follows a deterministic, five-step pipeline. Each step is idempotent and verifiable on-chain.</p>
                    
                    <div className="docs-steps">
                        {[
                            { step: '01', title: 'Get Estimate', desc: 'User selects the trading pair and amount. The Routing Engine fetches real-time rates from all connected providers and returns the best estimated output.' },
                            { step: '02', title: 'Create Transaction', desc: 'A unique, non-reusable deposit address is generated. The transaction object includes the destination wallet, estimated amount, and an expiry window.' },
                            { step: '03', title: 'User Sends Funds', desc: 'The user sends crypto to the generated deposit address from any wallet. No account or login required.' },
                            { step: '04', title: 'Swap Execution', desc: 'Once the deposit is confirmed on-chain, the Execution Pipeline triggers the swap atomically on the selected liquidity provider.' },
                            { step: '05', title: 'Payout', desc: 'The output currency is sent directly to the user\'s destination wallet. Transaction hash is returned for on-chain verification.' },
                        ].map((s) => (
                            <div key={s.step} className="docs-step-item">
                                <div className="step-indicator">{s.step}</div>
                                <div>
                                    <h4>{s.title}</h4>
                                    <p>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ══════════════════════════════════════════════ */}
                {/* PROTOCOL                                      */}
                {/* ══════════════════════════════════════════════ */}
                <div id="liquidity-engine" className="docs-section-anchor">
                    <span className="docs-breadcrumb">Protocol</span>
                    <h2>Liquidity Engine</h2>
                    <p>Swaplinq doesn't rely on a single, isolated order book. Instead, we act as a <strong>master aggregator</strong>. When you request a swap quote, our backend simultaneously queries institutional-grade liquidity providers (Binance, KuCoin, OKX) as well as decentralized pools (Uniswap, PancakeSwap, Thorchain). We instantly identify the most efficient route and lock in the best rate for your transaction.</p>

                    <h3>Connected Providers</h3>
                    <div className="docs-provider-grid">
                        {['ChangeNOW', 'StealthEX', 'SimpleSwap', 'Godex', 'ChangeHero', 'Thorchain', 'Uniswap', '1inch'].map((name) => (
                            <div key={name} className="docs-provider-chip">{name}</div>
                        ))}
                    </div>

                    <Callout type="info">
                        Our liquidity mesh is constantly expanding. New providers are integrated via a standardized adapter pattern, meaning adding a new source is a config change — not a code deployment.
                    </Callout>

                    <h3>Aggregation Process</h3>
                    <ol className="docs-list docs-list--ordered">
                        <li><strong>Parallel Query</strong> — All connected providers are queried simultaneously (fan-out). Typical latency: 8–15ms.</li>
                        <li><strong>Rate Normalization</strong> — Each response is normalized to a standard schema accounting for provider fees, network fees, and slippage tolerance.</li>
                        <li><strong>Optimal Selection</strong> — The engine ranks all viable routes by <em>effective received amount</em> and selects the best path.</li>
                        <li><strong>Fallback Cascade</strong> — If the selected provider fails during execution, the engine automatically falls back to the next-best route with no user intervention.</li>
                    </ol>
                </div>

                <div id="smart-routing" className="docs-section-anchor">
                    <h2>Smart Routing</h2>
                    <p>Smart routing is the decision layer that determines <em>which</em> provider executes each trade. Unlike simple price comparison, our router accounts for:</p>

                    <div className="docs-comparison-table-wrap">
                        <table className="docs-table">
                            <thead>
                                <tr>
                                    <th>Factor</th>
                                    <th>Description</th>
                                    <th>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Effective Rate</td><td>Net amount received after all fees</td><td className="mono">40%</td></tr>
                                <tr><td>Execution Speed</td><td>Historical average completion time</td><td className="mono">20%</td></tr>
                                <tr><td>Reliability Score</td><td>Success rate over last 1,000 transactions</td><td className="mono">20%</td></tr>
                                <tr><td>Liquidity Depth</td><td>Available volume at quoted price</td><td className="mono">15%</td></tr>
                                <tr><td>Network Congestion</td><td>Current mempool state of target chain</td><td className="mono">5%</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="rate-optimization" className="docs-section-anchor">
                    <h2>Rate Optimization</h2>
                    <p>We employ several techniques to ensure you always get the best possible rate:</p>
                    <ul className="docs-list">
                        <li><strong>Spread Compression</strong> — By aggregating competing providers, we effectively compress the bid-ask spread. The competition among providers benefits the end user.</li>
                        <li><strong>Dynamic Fee Routing</strong> — Network fees (gas) fluctuate by the second. Our engine re-evaluates gas costs at the moment of execution, not at quote time, to prevent overpaying.</li>
                        <li><strong>Slippage Protection</strong> — For large orders, our engine may split across multiple providers to minimize price impact. This is transparent to the user.</li>
                    </ul>

                    <Callout type="warning">
                        <strong>Rate Expiry:</strong> Quoted rates are valid for <code>30 seconds</code>. After expiry, you must request a new estimate. This protects both you and the protocol from volatility.
                    </Callout>
                </div>

                <div id="supported-assets" className="docs-section-anchor">
                    <h2>Supported Assets</h2>
                    <p>Swaplinq supports <strong>1,500+ crypto assets</strong> across 50+ blockchain networks. Assets are categorized by tier:</p>

                    <div className="docs-comparison-table-wrap">
                        <table className="docs-table">
                            <thead>
                                <tr>
                                    <th>Tier</th>
                                    <th>Networks</th>
                                    <th>Examples</th>
                                    <th>Avg. Swap Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className="mono">Tier 1</td><td>BTC, ETH, SOL, BNB, MATIC</td><td>BTC ↔ ETH, ETH ↔ SOL</td><td className="mono">&lt; 5 min</td></tr>
                                <tr><td className="mono">Tier 2</td><td>AVAX, DOT, ADA, XMR, ATOM</td><td>BTC ↔ XMR, DOT ↔ ETH</td><td className="mono">&lt; 10 min</td></tr>
                                <tr><td className="mono">Tier 3</td><td>ERC-20 / BEP-20 tokens</td><td>USDT ↔ USDC, LINK ↔ UNI</td><td className="mono">&lt; 3 min</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <p>For a complete, real-time list see <Link to="/coins" className="docs-inline-link">Supported Coins <ExternalLink size={12} /></Link></p>
                </div>

                {/* ══════════════════════════════════════════════ */}
                {/* SECURITY                                      */}
                {/* ══════════════════════════════════════════════ */}
                <div id="non-custodial" className="docs-section-anchor">
                    <span className="docs-breadcrumb">Security</span>
                    <h2>Non-Custodial Model</h2>
                    <p>Centralized exchanges are massive targets for hackers because they hold billions in user funds (honey-pots). Swaplinq eliminates this risk entirely.</p>

                    <h3>How It Works</h3>
                    <p>The moment you send funds to the generated deposit address, the exchange protocol activates. The output coins are broadcast immediately to your destination wallet. <strong>We process the transaction — we do not store the wealth.</strong></p>

                    <ul className="docs-checklist">
                        <li><CheckCircle size={16} /> No user accounts or balances</li>
                        <li><CheckCircle size={16} /> No private key access</li>
                        <li><CheckCircle size={16} /> Single-use deposit addresses</li>
                        <li><CheckCircle size={16} /> Atomic execution — funds are never "at rest" in our infrastructure</li>
                        <li><CheckCircle size={16} /> Full on-chain verifiability for every transaction</li>
                    </ul>
                </div>

                <div id="privacy" className="docs-section-anchor">
                    <h2>Privacy & No-KYC</h2>
                    <p>We believe financial privacy is a fundamental right. Swaplinq does not require identity verification, accounts, or personal data.</p>

                    <h3>Zero-Knowledge Execution</h3>
                    <p>To use Swaplinq, you don't need a username, password, or email. The only data we process is the deposit address, the destination address, and the blockchain ledger hash. We strip metadata from our frontend node requests, ensuring your ISP or local network can't easily profile your trading activity.</p>

                    <h3>Data We Collect</h3>
                    <div className="docs-comparison-table-wrap">
                        <table className="docs-table">
                            <thead><tr><th>Data Point</th><th>Collected?</th><th>Reasoning</th></tr></thead>
                            <tbody>
                                <tr><td>Name, email, phone</td><td className="docs-no">✗ Never</td><td>No accounts exist</td></tr>
                                <tr><td>IP address</td><td className="docs-no">✗ Not logged</td><td>Stripped at edge proxy</td></tr>
                                <tr><td>Wallet addresses</td><td className="docs-yes">✓ Transient</td><td>Required for swap execution; not stored post-completion</td></tr>
                                <tr><td>Transaction hashes</td><td className="docs-yes">✓ Transient</td><td>Used for status tracking; purged after 72 hours</td></tr>
                                <tr><td>Browser fingerprint</td><td className="docs-no">✗ Never</td><td>No tracking scripts</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="network-defense" className="docs-section-anchor">
                    <h2>Network Defense</h2>
                    <p>Our infrastructure implements defense-in-depth across every layer of the stack.</p>

                    <div className="docs-specs-grid">
                        <div className="docs-spec-card">
                            <Server size={20} color="var(--accent-emerald)" />
                            <h4>Infrastructure</h4>
                            <ul>
                                <li>Sub-10ms API quote retrieval</li>
                                <li>Multi-region edge deployment</li>
                                <li>Auto-scaling Web3 RPC nodes</li>
                                <li>Automated mempool conflict resolution</li>
                            </ul>
                        </div>
                        <div className="docs-spec-card">
                            <Shield size={20} color="var(--accent-blue)" />
                            <h4>Protection</h4>
                            <ul>
                                <li>Strict no-log policy (zero data retention)</li>
                                <li>Automated risk & AML flagging</li>
                                <li>DDoS protection via distributed edge</li>
                                <li>Front-running & MEV protection layer</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════ */}
                {/* API REFERENCE                                 */}
                {/* ══════════════════════════════════════════════ */}
                <div id="api-providers" className="docs-section-anchor">
                    <span className="docs-breadcrumb">API Reference</span>
                    <h2>Integration Partners</h2>
                    <p>Direct API integrations let you build a fully custom frontend under your own brand, while keeping everything non-KYC and non-custodial. All providers below offer simple REST APIs with excellent documentation.</p>

                    <div className="docs-comparison-table-wrap">
                        <table className="docs-table docs-table--providers">
                            <thead>
                                <tr>
                                    <th>Provider</th>
                                    <th>Assets</th>
                                    <th>API Type</th>
                                    <th>Partner Commission</th>
                                    <th>Key Advantages</th>
                                    <th>Ease</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="provider-name">StealthEX</td>
                                    <td className="mono">2,000+</td>
                                    <td>Public REST API</td>
                                    <td>0.4%+ adjustable</td>
                                    <td>Largest asset selection, clean API, 24/7 support</td>
                                    <td><span className="docs-badge docs-badge--excellent">Excellent</span></td>
                                </tr>
                                <tr>
                                    <td className="provider-name">Godex</td>
                                    <td className="mono">900+</td>
                                    <td>White-label API</td>
                                    <td>Up to 0.6%</td>
                                    <td>Strong privacy focus, full white-label option</td>
                                    <td><span className="docs-badge docs-badge--good">Very good</span></td>
                                </tr>
                                <tr>
                                    <td className="provider-name">SimpleSwap</td>
                                    <td className="mono">1,500+</td>
                                    <td>Public / DeFi API</td>
                                    <td>0.4%–5%</td>
                                    <td>Fast swaps, easy affiliate tools</td>
                                    <td><span className="docs-badge docs-badge--good">Good</span></td>
                                </tr>
                                <tr>
                                    <td className="provider-name">ChangeHero</td>
                                    <td className="mono">400+</td>
                                    <td>Full Swap API</td>
                                    <td>Custom markup</td>
                                    <td>99.99% uptime, excellent for wallets</td>
                                    <td><span className="docs-badge docs-badge--excellent">Excellent</span></td>
                                </tr>
                                <tr>
                                    <td className="provider-name">ChangeNOW</td>
                                    <td className="mono">1,500+</td>
                                    <td>Full REST API</td>
                                    <td>Adjustable</td>
                                    <td>Industry leader, comprehensive documentation</td>
                                    <td><span className="docs-badge docs-badge--excellent">Excellent</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="api-endpoints" className="docs-section-anchor">
                    <h2>Core Endpoints</h2>
                    <p>Below are the primary API endpoints consumed by the Swaplinq frontend. All endpoints return JSON.</p>

                    <h3>Get Estimated Amount</h3>
                    <p>Returns the estimated output for a given input amount and trading pair.</p>
                    <CodeBlock
                        title="Request"
                        language="bash"
                        code={`GET /api/v1/exchange-amount/{amount}/{from}_{to}

# Example
curl https://api.swaplinq.io/v1/exchange-amount/1/btc_eth`}
                    />
                    <CodeBlock
                        title="Response"
                        language="json"
                        code={`{
  "estimatedAmount": 16.542891,
  "transactionSpeedForecast": "5-20",
  "warningMessage": null,
  "networkFee": 0.00042
}`}
                    />

                    <h3>Create Transaction</h3>
                    <p>Initiates a new swap. Returns a unique deposit address and transaction ID for tracking.</p>
                    <CodeBlock
                        title="Request"
                        language="bash"
                        code={`POST /api/v1/transactions

{
  "from": "btc",
  "to": "eth",
  "amount": 1,
  "address": "0xYourEthWalletAddress",
  "extraId": "",
  "refundAddress": "bc1qYourBtcRefundAddress"
}`}
                    />
                    <CodeBlock
                        title="Response"
                        language="json"
                        code={`{
  "id": "a5c73e2d7b...",
  "status": "waiting",
  "payinAddress": "bc1qDeposit...",
  "payoutAddress": "0xYourEth...",
  "fromCurrency": "btc",
  "toCurrency": "eth",
  "expectedAmountTo": 16.542891,
  "amountFrom": 1
}`}
                    />

                    <h3>Get Transaction Status</h3>
                    <p>Poll this endpoint to track swap progress through its lifecycle.</p>
                    <CodeBlock
                        title="Request"
                        language="bash"
                        code={`GET /api/v1/transactions/{id}/status`}
                    />
                </div>

                <div id="response-codes" className="docs-section-anchor">
                    <h2>Response Codes</h2>
                    <p>Standard HTTP status codes with structured error bodies.</p>

                    <div className="docs-comparison-table-wrap">
                        <table className="docs-table">
                            <thead><tr><th>Code</th><th>Meaning</th><th>Action</th></tr></thead>
                            <tbody>
                                <tr><td className="mono">200</td><td>Success</td><td>Parse response body normally</td></tr>
                                <tr><td className="mono">400</td><td>Bad Request</td><td>Check request parameters</td></tr>
                                <tr><td className="mono">404</td><td>Not Found</td><td>Invalid pair or transaction ID</td></tr>
                                <tr><td className="mono">429</td><td>Rate Limited</td><td>Back off and retry after <code>Retry-After</code> header</td></tr>
                                <tr><td className="mono">500</td><td>Server Error</td><td>Retry with exponential backoff</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Transaction Statuses</h3>
                    <div className="docs-status-flow">
                        <div className="status-chip status-chip--waiting">waiting</div>
                        <ChevronRight size={14} className="status-arrow" />
                        <div className="status-chip status-chip--confirming">confirming</div>
                        <ChevronRight size={14} className="status-arrow" />
                        <div className="status-chip status-chip--exchanging">exchanging</div>
                        <ChevronRight size={14} className="status-arrow" />
                        <div className="status-chip status-chip--sending">sending</div>
                        <ChevronRight size={14} className="status-arrow" />
                        <div className="status-chip status-chip--finished">finished</div>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════ */}
                {/* RESOURCES                                     */}
                {/* ══════════════════════════════════════════════ */}
                <div id="faq" className="docs-section-anchor">
                    <span className="docs-breadcrumb">Resources</span>
                    <h2>FAQ</h2>
                    
                    <div className="docs-faq-list">
                        {[
                            { q: 'Do I need an account to swap?', a: 'No. Swaplinq is fully non-custodial and requires no registration, email, or identity verification. Just select your pair, enter your destination wallet, and send.' },
                            { q: 'Is there a minimum or maximum swap amount?', a: 'Minimums vary per asset (typically ~$2–5 equivalent). There is no hard maximum — large transactions are automatically routed through providers with sufficient liquidity depth.' },
                            { q: 'What happens if my transaction gets stuck?', a: 'Our execution pipeline includes automatic retry logic and fallback routing. If a transaction exceeds the expected confirmation window, our support system flags it for manual resolution. Refunds are processed to your refund address.' },
                            { q: 'How are exchange rates determined?', a: 'Rates are aggregated in real-time from all connected liquidity providers. The Routing Engine selects the best net rate factoring in provider fees, network fees, and slippage. Quoted rates are locked for 30 seconds.' },
                            { q: 'Is Swaplinq safe to use?', a: 'Yes. We never hold your funds, have no user accounts to breach, don\'t store personal data, and all transactions are verifiable on their respective blockchains. Our infrastructure includes DDoS protection, MEV shielding, and automated risk monitoring.' },
                        ].map((item, i) => (
                            <div key={i} className="docs-faq-item">
                                <h4>{item.q}</h4>
                                <p>{item.a}</p>
                            </div>
                        ))}
                    </div>

                    <p>For the full FAQ, visit <Link to="/faq" className="docs-inline-link">FAQ page <ExternalLink size={12} /></Link></p>
                </div>

                <div id="status" className="docs-section-anchor">
                    <h2>System Status</h2>
                    <p>Current operational status of Swaplinq infrastructure.</p>

                    <div className="docs-status-grid">
                        <div className="docs-status-item">
                            <div className="status-dot status-dot--operational"></div>
                            <span>API Gateway</span>
                            <span className="status-label">Operational</span>
                        </div>
                        <div className="docs-status-item">
                            <div className="status-dot status-dot--operational"></div>
                            <span>Routing Engine</span>
                            <span className="status-label">Operational</span>
                        </div>
                        <div className="docs-status-item">
                            <div className="status-dot status-dot--operational"></div>
                            <span>Execution Pipeline</span>
                            <span className="status-label">Operational</span>
                        </div>
                        <div className="docs-status-item">
                            <div className="status-dot status-dot--operational"></div>
                            <span>Status Tracker</span>
                            <span className="status-label">Operational</span>
                        </div>
                    </div>

                    <Callout type="info">
                        Uptime target: <strong>99.95%</strong>. For real-time incident reports, follow <strong>@SwaplinqStatus</strong> on X.
                    </Callout>
                </div>

                {/* Footer */}
                <div className="docs-page-footer">
                    <p>© 2026 Swaplinq Protocol. Non-custodial & Permissionless.</p>
                </div>
            </main>

            {/* ─── Right TOC ─── */}
            <aside className="docs-toc">
                <div className="docs-toc-inner">
                    <h5>On this page</h5>
                    <ul>
                        {tocItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    className={`toc-link ${activeSection === item.id ? 'toc-link--active' : ''}`}
                                    onClick={() => scrollToSection(item.id)}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Documents;
