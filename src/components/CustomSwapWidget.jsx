import React, { useState, useEffect, useCallback } from 'react';
import { ArrowDownUp, Loader, AlertCircle, CheckCircle, ChevronDown, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { changeNowApi } from '../services/api';
import { SUPPORTED_COINS } from '../config/coins';

const CustomSwapWidget = ({ defaultFrom = 'btc', defaultTo = 'eth' }) => {
    const [fromCurrency, setFromCurrency] = useState(defaultFrom.toLowerCase());
    const [toCurrency, setToCurrency] = useState(defaultTo.toLowerCase());
    const [amount, setAmount] = useState('0.1');
    const [estimatedAmount, setEstimatedAmount] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
    const [toDropdownOpen, setToDropdownOpen] = useState(false);
    const [fromSearch, setFromSearch] = useState('');
    const [toSearch, setToSearch] = useState('');
    
    // Status tracking
    const [isLoadingEstimate, setIsLoadingEstimate] = useState(false);
    const [exchangeError, setExchangeError] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const [transactionStatus, setTransactionStatus] = useState(null);

    // Fetch Estimate
    useEffect(() => {
        const fetchEstimate = async () => {
            if (!amount || isNaN(amount) || Number(amount) <= 0) {
                setEstimatedAmount('');
                return;
            }
            setIsLoadingEstimate(true);
            setExchangeError(null);
            
            try {
                // Check min amount first to avoid error spam
                const minRes = await changeNowApi.getMinAmount(fromCurrency, toCurrency);
                if (minRes && minRes.minAmount && Number(amount) < minRes.minAmount) {
                    setExchangeError(`Minimum amount is ${minRes.minAmount} ${fromCurrency.toUpperCase()}`);
                    setEstimatedAmount('');
                    setIsLoadingEstimate(false);
                    return;
                }

                const res = await changeNowApi.getEstimatedAmount(amount, fromCurrency, toCurrency);
                if (res && res.estimatedAmount) {
                    setEstimatedAmount(res.estimatedAmount.toString());
                } else if (res.error) {
                    setExchangeError(res.error);
                }
            } catch (err) {
                setExchangeError('Failed to fetch estimate.');
            } finally {
                setIsLoadingEstimate(false);
            }
        };

        const timer = setTimeout(fetchEstimate, 800); // debounce
        return () => clearTimeout(timer);
    }, [amount, fromCurrency, toCurrency]);

    // Track Transaction Status
    useEffect(() => {
        let interval;
        if (transaction && transaction.id && transactionStatus !== 'finished' && transactionStatus !== 'failed' && transactionStatus !== 'refunded') {
            interval = setInterval(async () => {
                try {
                    const status = await changeNowApi.getTransactionStatus(transaction.id);
                    if (status && status.status) {
                        setTransactionStatus(status.status);
                    }
                } catch (err) {
                    console.error("Failed to check status", err);
                }
            }, 10000); // Check every 10 seconds
        }
        return () => clearInterval(interval);
    }, [transaction, transactionStatus]);

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setAmount(estimatedAmount || '0.1');
    };

    const handleExchange = async () => {
        if (!recipientAddress) {
            setExchangeError('Please enter a recipient address');
            return;
        }

        setExchangeError(null);
        try {
            const txData = await changeNowApi.createTransaction({
                from: fromCurrency,
                to: toCurrency,
                address: recipientAddress,
                amount: amount
            });

            if (txData && txData.id) {
                setTransaction(txData);
                setTransactionStatus(txData.status || 'new');
            } else if (txData.error) {
                setExchangeError(txData.error);
            }
        } catch (err) {
            setExchangeError('An error occurred while creating the exchange.');
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const getStatusMessage = (status) => {
        switch(status) {
            case 'new': return 'Waiting for deposit...';
            case 'waiting': return 'Waiting for deposit...';
            case 'confirming': return 'Confirming transaction...';
            case 'exchanging': return 'Exchanging...';
            case 'sending': return 'Sending to you...';
            case 'finished': return 'Exchange successfully completed!';
            case 'failed': return 'Exchange failed.';
            case 'refunded': return 'Refunded.';
            default: return 'Processing...';
        }
    };

    if (transaction) {
        return (
            <div className="custom-swap-widget glass-panel">
                <div className="tx-status-header">
                    <h3>Exchange Details</h3>
                    <div className={`status-badge ${transactionStatus}`}>
                        {getStatusMessage(transactionStatus)}
                    </div>
                </div>

                <div className="tx-details-body">
                    <div className="tx-instruction">
                        <p>Please send exactly:</p>
                        <h3>{transaction.expectedAmount} {transaction.fromCurrency.toUpperCase()}</h3>
                    </div>

                    <div className="address-box">
                        <p className="label">To Address:</p>
                        <div className="address-flex">
                            <span className="address-text">{transaction.payinAddress}</span>
                            <button className="copy-btn icon-btn" onClick={() => copyToClipboard(transaction.payinAddress)}>
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                    {transaction.payinExtraId && (
                        <div className="address-box">
                            <p className="label">Extra ID / Memo:</p>
                            <div className="address-flex">
                                <span className="address-text">{transaction.payinExtraId}</span>
                                <button className="copy-btn icon-btn" onClick={() => copyToClipboard(transaction.payinExtraId)}>
                                    <Copy size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="tx-summary">
                        <div className="summary-row">
                            <span>You get (estimated):</span>
                            <strong>~{transaction.expectedReceiveAmount} {transaction.toCurrency.toUpperCase()}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Recipient:</span>
                            <strong>{transaction.payoutAddress}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Expected Time:</span>
                            <strong>~10 mins</strong>
                        </div>
                        <div className="summary-row">
                            <span>Transaction ID:</span>
                            <strong>{transaction.id}</strong>
                        </div>
                    </div>

                    {transactionStatus === 'finished' && (
                        <button className="action-btn success-btn" onClick={() => {
                            setTransaction(null);
                            setTransactionStatus(null);
                            setAmount('');
                            setRecipientAddress('');
                        }}>
                            New Exchange
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const filteredFromCrypto = SUPPORTED_COINS.filter(c => 
        c.name.toLowerCase().includes(fromSearch.toLowerCase()) || 
        c.symbol.toLowerCase().includes(fromSearch.toLowerCase())
    );

    const filteredToCrypto = SUPPORTED_COINS.filter(c => 
        c.name.toLowerCase().includes(toSearch.toLowerCase()) || 
        c.symbol.toLowerCase().includes(toSearch.toLowerCase())
    );

    return (
        <div className="custom-swap-widget glass-panel">
            <h3 className="widget-title">Swap Crypto</h3>
            
            {/* YOU SEND */}
            <div className="defi-block">
                <div className="defi-label">You Send</div>
                <div className="input-row">
                    <input 
                        className="defi-input"
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="0.0"
                    />
                    <div className="currency-selector defi-selector" onClick={() => { setFromDropdownOpen(!fromDropdownOpen); setFromSearch(''); }}>
                        <img 
                            src={SUPPORTED_COINS.find(c => c.symbol.toLowerCase() === fromCurrency)?.icon || `https://assets.coincap.io/assets/icons/${fromCurrency}@2x.png`} 
                            alt={fromCurrency} 
                            className="currency-icon" 
                            onError={(e) => { e.target.src = 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'; }}
                        />
                        <span>{fromCurrency.toUpperCase()}</span>
                        <ChevronDown size={16} />
                    </div>
                    
                    <AnimatePresence>
                        {fromDropdownOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="widget-dropdown-menu glass"
                            >
                                <div className="dropdown-search">
                                    <input 
                                        type="text" 
                                        placeholder="Search symbol..." 
                                        value={fromSearch}
                                        onChange={(e) => setFromSearch(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        autoFocus
                                    />
                                </div>
                                {filteredFromCrypto.map(coin => (
                                    <div 
                                        key={`from-${coin.id}`} 
                                        className="dropdown-item"
                                        onClick={() => {
                                            setFromCurrency(coin.symbol.toLowerCase());
                                            setFromDropdownOpen(false);
                                        }}
                                    >
                                        <img src={coin.icon} alt={coin.name} className="currency-icon" />
                                        <span>{coin.symbol.toUpperCase()}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="swap-icon-container">
                <button className="swap-btn" onClick={handleSwapCurrencies}>
                    <ArrowDownUp size={20} />
                </button>
            </div>

            {/* YOU GET */}
            <div className="defi-block">
                <div className="defi-label">You Get (Estimated)</div>
                <div className="input-row">
                    <input 
                        type="text" 
                        value={isLoadingEstimate ? 'Estimating...' : estimatedAmount} 
                        readOnly 
                        className={`defi-input ${isLoadingEstimate ? 'loading-text' : ''}`}
                    />
                    <div className="currency-selector defi-selector" onClick={() => { setToDropdownOpen(!toDropdownOpen); setToSearch(''); }}>
                        <img 
                            src={SUPPORTED_COINS.find(c => c.symbol.toLowerCase() === toCurrency)?.icon || `https://assets.coincap.io/assets/icons/${toCurrency}@2x.png`} 
                            alt={toCurrency} 
                            className="currency-icon"
                            onError={(e) => { e.target.src = 'https://cryptologos.cc/logos/ethereum-eth-logo.png'; }}
                        />
                        <span>{toCurrency.toUpperCase()}</span>
                        <ChevronDown size={16} />
                    </div>
                    
                    <AnimatePresence>
                        {toDropdownOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="widget-dropdown-menu glass"
                            >
                                <div className="dropdown-search">
                                    <input 
                                        type="text" 
                                        placeholder="Search symbol..." 
                                        value={toSearch}
                                        onChange={(e) => setToSearch(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        autoFocus
                                    />
                                </div>
                                {filteredToCrypto.map(coin => (
                                    <div 
                                        key={`to-${coin.id}`} 
                                        className="dropdown-item"
                                        onClick={() => {
                                            setToCurrency(coin.symbol.toLowerCase());
                                            setToDropdownOpen(false);
                                        }}
                                    >
                                        <img src={coin.icon} alt={coin.name} className="currency-icon" />
                                        <span>{coin.symbol.toUpperCase()}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {exchangeError && (
                <div className="error-alert">
                    <AlertCircle size={16} />
                    <span>{exchangeError}</span>
                </div>
            )}

            <div className="input-group recipient-group">
                <label>Recipient {toCurrency.toUpperCase()} Address</label>
                <input 
                    type="text" 
                    className="wrapper-box full-width"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder={`Enter your ${toCurrency.toUpperCase()} address`}
                />
            </div>

            <button 
                className="action-btn"
                onClick={handleExchange}
                disabled={!estimatedAmount || Object.keys(exchangeError || {}).length > 0 || !recipientAddress || isLoadingEstimate}
            >
                Exchange Now
            </button>
        </div>
    );
};

export default CustomSwapWidget;
