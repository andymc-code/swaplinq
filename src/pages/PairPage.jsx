import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowRight, Info, Zap, Shield, ChevronLeft, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import CustomSwapWidget from '../components/CustomSwapWidget';
import { PROVIDERS, DEFAULT_PROVIDER } from '../config/providers';

import { motion } from 'framer-motion';

const PairPage = ({ type }) => {
    const { pairId } = useParams();
    const location = useLocation();
    const provider = PROVIDERS[DEFAULT_PROVIDER];
    
    // Parse pairId if it exists (e.g., eth-btc)
    const [fromCoin, toCoin] = pairId ? pairId.split('-') : ['btc', 'eth'];
    const title = type === 'buy' ? 'Buy Crypto with Fiat' : type === 'sell' ? 'Sell Crypto for Fiat' : `${fromCoin.toUpperCase()} to ${toCoin.toUpperCase()} Exchange`;
    const desc = `Exchange ${fromCoin.toUpperCase()} to ${toCoin.toUpperCase()} instantly with Swaplinq. No registration required, fast and secure crypto swaps.`;

    return (
        <div className="page-container pair-page-container">
            <SEO title={title} description={desc} />
            
            <header className="page-header coin-details-header">
                <Link to="/" className="back-link">
                    <ChevronLeft size={16} /> BACK TO EXCHANGE
                </Link>

                <div className="coin-primary-info">
                    <div className="pair-badge glass glow">
                        <span className="pair-coin">{fromCoin.toUpperCase()}</span>
                        <div className="pair-arrow">
                            <ArrowRight size={18} />
                        </div>
                        <span className="pair-coin">{toCoin.toUpperCase()}</span>
                    </div>
                    <h1>{title}</h1>
                    <p>Enjoy the best market rates and lightning-fast execution for this pair. Fully non-custodial.</p>
                </div>
            </header>

            <section className="pair-exchange-grid">
                <div className="pair-info-side">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="premium-gradient">Swap {fromCoin.toUpperCase()} seamlessly</h2>
                        <p className="pair-subtitle">Execute your {fromCoin.toUpperCase()} to {toCoin.toUpperCase()} strategy efficiently and securely.</p>
                        
                        <div className="pair-features-list">
                            <div className="premium-card feature-item">
                                <div className="glow-icon cyan"><Zap size={22} /></div>
                                <div className="feature-text">
                                    <strong>Flash Execution</strong>
                                    <p>Estimated swap time: 3-7 minutes with deep liquidity pools.</p>
                                </div>
                            </div>
                            <div className="premium-card feature-item">
                                <div className="glow-icon emerald"><Shield size={22} /></div>
                                <div className="feature-text">
                                    <strong>Self-Custody</strong>
                                    <p>Completely non-custodial. We never hold your physical assets.</p>
                                </div>
                            </div>
                            <div className="premium-card feature-item">
                                <div className="glow-icon gold"><TrendingUp size={22} /></div>
                                <div className="feature-text">
                                    <strong>Optimal Routing</strong>
                                    <p>Smart contract routing ensures the most competitive rates globally.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="pair-widget-side">
                    <motion.div 
                        className="swap-card-container premium-widget-wrapper"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="widget-glow-bg"></div>
                        <CustomSwapWidget defaultFrom={fromCoin.toLowerCase()} defaultTo={toCoin.toLowerCase()} />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PairPage;
