import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Filter } from 'lucide-react';
import SEO from '../components/SEO';
import { SUPPORTED_COINS } from '../config/coins';
import { motion } from 'framer-motion';

const CoinsList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterNetwork, setFilterNetwork] = useState('All');

    // Extract unique networks roughly
    const allNetworks = useMemo(() => {
        const networks = new Set(['All']);
        // If your config has networks, include them. 
        // For fallback, we just have 'All' and maybe some hardcoded tags if they don't have networks array
        // We'll simulate networks based on symbol since SUPPORTED_COINS may not have extensive network tagging.
        return Array.from(networks);
    }, []);

    const filteredCoins = useMemo(() => {
        return SUPPORTED_COINS.filter(coin => {
            const matchSearch = coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());
            return matchSearch;
        });
    }, [searchQuery]);

    return (
        <div className="page-container coins-directory-page">
            <SEO 
                title="Supported Coins - Swaplinq High-Speed Assets" 
                description="Browse all supported coins on Swaplinq. Exchange Bitcoin, Ethereum, Solana, and 350+ other cryptocurrencies instantly." 
            />
            
            <header className="page-header faq-header">
                <span className="badge-pill">COIN DIRECTORY</span>
                <h1>High-Speed <span>Assets</span></h1>
                <p>350+ certified non-custodial assets ready for instantaneous peer-to-contract settlement.</p>
                
                <div className="faq-search-wrapper" style={{ marginTop: '2rem' }}>
                    <Search className="search-icon" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search for an asset by name or symbol (e.g. Bitcoin, ETH)..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="faq-search-input"
                    />
                </div>
            </header>

            <section className="section-content coins-interactive-section">
                <div className="coins-results-header">
                    <span>Showing {filteredCoins.length} assets {searchQuery && `matching "${searchQuery}"`}</span>
                </div>

                <div className="coins-main-grid">
                    {filteredCoins.map((coin, i) => (
                        <motion.div 
                            key={coin.id} 
                            className="premium-card coin-card"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i > 20 ? 0 : i * 0.03, duration: 0.3 }}
                        >
                            <Link to={`/coins/${coin.id}`} className="coin-link-box">
                                <div className="coin-icon-wrapper">
                                    <img src={coin.icon} alt={coin.name} className="coin-logo-static" loading="lazy" />
                                </div>
                                <div className="coin-card-content">
                                    <span className="coin-name">{coin.name}</span>
                                    <span className="coin-symbol">{coin.symbol}</span>
                                </div>
                                <div className="coin-card-action">
                                    <ChevronRight size={18} />
                                </div>
                                <div className="coin-card-glow"></div>
                            </Link>
                        </motion.div>
                    ))}
                    
                    {filteredCoins.length === 0 && (
                        <div className="no-results-box premium-card">
                            <Search size={40} opacity={0.3} />
                            <h3>No assets found</h3>
                            <p>We couldn't find any assets matching "{searchQuery}".</p>
                            <button onClick={() => setSearchQuery('')} className="premium-btn">Clear Search</button>
                        </div>
                    )}
                </div>
            </section>

            <section className="cta-section-wrapper glass">
                <div className="cta-content">
                    <h3>Don't see your coin?</h3>
                    <p>We continuously expand our liquidity networks. Contact our listings team to request an asset.</p>
                    <button className="premium-btn">Submit Request</button>
                </div>
            </section>
        </div>
    );
};

export default CoinsList;
