import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Wallet, 
  Menu, 
  X,
  Instagram,
  Github,
  ChevronDown
} from 'lucide-react';
import { SUPPORTED_COINS, POPULAR_PAIRS } from '../config/coins';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="logo-group">
                    <img src="https://ik.imagekit.io/wnwu0xxx5/Swaplinq/swaplinq_logo-Picsart-BackgroundRemover.png" alt="Swaplinq Logo" className="brand-logo-img" />
                </Link>

                <ul className="nav-links">
                    <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Exchange</Link></li>
                    <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
                    <li><Link to="/faq" className={location.pathname === '/faq' ? 'active' : ''}>FAQ</Link></li>
                    <li><Link to="/infrastructure" className={location.pathname === '/infrastructure' ? 'active' : ''}>Infrastructure</Link></li>
                    <li><a href="https://docs.swaplinq.com" className="active">API Docs</a></li>
                    <li className="dropdown">
                        <span className={`dropdown-trigger ${location.pathname.startsWith('/coins') ? 'active' : ''}`}>Coins <ChevronDown size={14} /></span>
                        <div className="dropdown-menu glass">
                            {SUPPORTED_COINS.slice(0, 6).map(coin => (
                                <Link key={coin.id} to={`/coins/${coin.id}`} className="dropdown-item">
                                    <img src={coin.icon} alt={coin.name} className="nav-coin-icon" />
                                    {coin.name}
                                </Link>
                            ))}
                            <Link to="/coins" className="dropdown-footer">View All Coins</Link>
                        </div>
                    </li>
                </ul>

                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Exchange</Link>
                        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                        <Link to="/faq" className={location.pathname === '/faq' ? 'active' : ''}>FAQ</Link>
                        <Link to="/infrastructure" className={location.pathname === '/infrastructure' ? 'active' : ''}>Infrastructure</Link>
                        <a href="https://docs.swaplinq.com" className="active">API Docs</a>
                        <Link to="/coins" className={location.pathname.startsWith('/coins') ? 'active' : ''}>Supported Coins</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <Link to="/" className="logo-group">
                        <img src="https://ik.imagekit.io/wnwu0xxx5/Swaplinq/swaplinq_logo-Picsart-BackgroundRemover.png" alt="Swaplinq Logo" className="brand-logo-img" />
                    </Link>
                    <p>Advanced non-custodial exchange protocol with deep liquidity and lightning-fast execution.</p>
                    <div className="social-links">
                        <a href="https://github.com/andymc-code/swaplinq" target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
                        <a href="https://www.instagram.com/swaplinq/" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="link-col">
                        <h5>Company</h5>
                        <Link to="/about">About Us</Link>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/how-it-works">How it Works</Link>
                        <Link to="/infrastructure">Infrastructure</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/reviews">Reviews</Link>
                    </div>
                    <div className="link-col">
                        <h5>Exchange Pairs</h5>
                        <Link to="/pair/eth-btc">ETH to BTC</Link>
                        <Link to="/pair/btc-eth">BTC to ETH</Link>
                        <Link to="/pair/btc-xmr">BTC to XMR</Link>
                        <Link to="/pair/btc-usdt">BTC to USDT</Link>
                    </div>
                    <div className="link-col">
                        <h5>Assets</h5>
                        <Link to="/coins/btc">Bitcoin (BTC)</Link>
                        <Link to="/coins/eth">Ethereum (ETH)</Link>
                        <Link to="/coins/sol">Solana (SOL)</Link>
                        <Link to="/coins/xmr">Monero (XMR)</Link>
                        <Link to="/coins">All Coins</Link>
                    </div>
                    <div className="link-col">
                        <h5>Product</h5>
                        <Link to="/mobile-app">Mobile App</Link>
                        <a href="https://docs.swaplinq.com">API Documentation</a>
                        <Link to="/buy-crypto">Buy Crypto</Link>
                        <Link to="/sell-crypto">Sell Crypto</Link>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2026 Swaplinq Protocol. Non-custodial & Permissionless. Registered in Seychelles.</p>
                <div className="footer-legal">
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/terms">Terms</Link>
                </div>
            </div>
        </footer>
    );
};

const PageLayout = ({ children }) => {
    return (
        <div className="app-wrapper">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;
