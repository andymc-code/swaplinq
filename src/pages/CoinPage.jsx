import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Zap, Shield, TrendingUp, Info, ChevronLeft } from 'lucide-react';
import SEO, { buildBreadcrumbSchema } from '../components/SEO';
import { SUPPORTED_COINS } from '../config/coins';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CoinPage = () => {
    const { id } = useParams();
    const coin = SUPPORTED_COINS.find(c => c.id === id) || SUPPORTED_COINS[0];
    


    const title = `${coin.name} (${coin.symbol}) - Swap & Exchange`;
    const desc = `Exchange ${coin.name} (${coin.symbol}) instantly on SwaplinQ — the leading non-custodial crypto exchange. No KYC, no registration. Best rates aggregated from 10+ liquidity providers. Swap ${coin.symbol} to BTC, ETH, XMR, USDT and 1,500+ other assets.`;

    return (
        <div className="page-container">
            <SEO 
                title={title} 
                description={desc}
                keywords={`${coin.name}, ${coin.symbol}, swap ${coin.symbol}, exchange ${coin.name}, ${coin.symbol} to BTC, ${coin.symbol} to ETH, buy ${coin.name}, SwaplinQ ${coin.symbol}`}
                jsonLd={[
                    buildBreadcrumbSchema([
                        { name: 'SwaplinQ', url: 'https://swaplinq.com' },
                        { name: 'Coins', url: 'https://swaplinq.com/coins' },
                        { name: `${coin.name} (${coin.symbol})`, url: `https://swaplinq.com/coins/${coin.id}` }
                    ])
                ]}
            />


            
            <header className="page-header coin-details-header">
                <Link to="/coins" className="back-link">
                    <ChevronLeft size={16} /> ALL ASSETS
                </Link>
                <div className="coin-primary-info">
                    <div className="coin-huge-icon glass ripple">
                        <img src={coin.icon} alt={coin.name} />
                        <div className="icon-glow-bg"></div>
                    </div>
                    <h1>{coin.name} <span>({coin.symbol})</span></h1>
                    <p>{coin.desc}</p>
                    <div className="coin-page-actions">
                        <Link to="/" className="premium-btn">SWAP {coin.symbol} NOW</Link>
                        <a href={`https://coinmarketcap.com/currencies/${coin.name.toLowerCase().replace(/\s+/g, '-')}/`} target="_blank" rel="noopener noreferrer" className="premium-btn secondary-premium">MARKET DATA</a>
                    </div>
                </div>
            </header>

            <section className="coin-stats-grid">
                {[
                    { icon: <Zap size={20} />, title: "Lightning Fast", text: `${coin.name} swaps are completed in minutes using our unique liquidity routing.`, color: "emerald" },
                    { icon: <Shield size={20} />, title: "Safe & Secure", text: `Your ${coin.symbol} remains non-custodial. We never hold your assets.`, color: "blue" },
                    { icon: <TrendingUp size={20} />, title: "Best Rates", text: `Source the most competitive rates for ${coin.name} from global liquidity pools.`, color: "gold" }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        className="premium-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className={`glow-icon ${item.color}`}>{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

export default CoinPage;
