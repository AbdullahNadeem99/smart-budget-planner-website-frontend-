import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CurrencyConverter = () => {
    const [rates, setRates] = useState({});
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('PKR');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(res => res.json())
            .then(data => {
                setRates(data.rates);
                if (data.rates[toCurrency]) {
                    setConvertedAmount((amount * data.rates[toCurrency]).toFixed(2));
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error:", err);
                setIsLoading(false);
            });
    }, [fromCurrency]);

    useEffect(() => {
        if (rates[toCurrency]) {
            setConvertedAmount((amount * rates[toCurrency]).toFixed(2));
        }
    }, [amount, toCurrency, rates]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    // Professional Styles
    const styles = {
        card: {
            maxWidth: '1100px',
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
            border: 'none'
        },
        inputContainer: {
            display: 'flex',
            alignItems: 'flex-end',
            gap: '16px',
            flexWrap: 'nowrap', // Forces horizontal on desktop
        },
        inputWrapper: {
            flex: '1',
            minWidth: '150px'
        },
        control: {
            height: '60px',
            borderRadius: '12px',
            border: '2px solid #f1f5f9',
            backgroundColor: '#f8fafc',
            fontSize: '1.05rem',
            fontWeight: '600',
            color: '#1e293b',
            padding: '0 20px',
            transition: 'all 0.2s ease',
            outline: 'none',
            width: '100%'
        }
    };

    return (
        <div className="container py-5 d-flex justify-content-center">
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4 p-lg-5" 
                style={styles.card}
            >
                {/* Header */}
                <div className="mb-5 text-start">
                    <h2 className="fw-bold mb-1" style={{ color: '#0f172a', fontSize: '2.2rem', letterSpacing: '-0.02em' }}>
                        Currency Converter
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Global real-time exchange rates for your planning</p>
                </div>

                {/* --- HORIZONTAL TOOLBELT --- */}
                <div className="d-flex flex-column flex-lg-row align-items-end gap-3 mb-5">
                    
                    {/* Amount */}
                    <div style={{ flex: '1.5', width: '100%' }}>
                        <label className="form-label small fw-bold text-uppercase mb-2 ms-1 text-muted">Amount</label>
                        <input 
                            type="number" 
                            className="form-control shadow-none" 
                            style={styles.control}
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    {/* From */}
                    <div style={{ flex: '1', width: '100%' }}>
                        <label className="form-label small fw-bold text-uppercase mb-2 ms-1 text-muted">From</label>
                        <select 
                            className="form-select shadow-none cursor-pointer" 
                            style={styles.control}
                            value={fromCurrency} 
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            {Object.keys(rates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                        </select>
                    </div>

                    {/* Swap Button */}
                    <div className="px-1 mb-1 d-none d-lg-block">
                        <motion.button 
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleSwap}
                            className="btn border-0 d-flex align-items-center justify-content-center shadow-sm"
                            style={{ 
                                width: '54px', height: '54px', 
                                borderRadius: '50%', 
                                backgroundColor: '#6366f1', 
                                color: 'white' 
                            }}
                        >
                            <span style={{ fontSize: '1.4rem' }}>⇄</span>
                        </motion.button>
                    </div>

                    {/* To */}
                    <div style={{ flex: '1', width: '100%' }}>
                        <label className="form-label small fw-bold text-uppercase mb-2 ms-1 text-muted">To</label>
                        <select 
                            className="form-select shadow-none cursor-pointer" 
                            style={styles.control}
                            value={toCurrency} 
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            {Object.keys(rates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                        </select>
                    </div>
                </div>

                {/* --- RESULT SECTION --- */}
                <motion.div 
                    layout
                    className="p-4 p-md-5 d-flex justify-content-between align-items-center flex-wrap" 
                    style={{ 
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0'
                    }}
                >
                    <div>
                        <p className="mb-2 fw-semibold text-muted" style={{ fontSize: '1.2rem' }}>{amount} {fromCurrency} =</p>
                        <h1 className="fw-bold mb-0" style={{ color: '#1e293b', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', letterSpacing: '-1.5px' }}>
                            {isLoading ? '...' : convertedAmount} <span className="opacity-50" style={{ fontSize: '0.5em' }}>{toCurrency}</span>
                        </h1>
                    </div>
                    
                    <div className="text-md-end mt-4 mt-md-0">
                        <div className="bg-white px-4 py-2 rounded-pill shadow-sm border fw-bold" style={{ color: '#6366f1' }}>
                            1 {fromCurrency} = {(convertedAmount / amount).toFixed(4)} {toCurrency}
                        </div>
                        <p className="small text-muted mt-3 mb-0">
                            <span style={{ color: '#22c55e' }}>●</span> Real-time market rate
                        </p>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default CurrencyConverter;