import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency, formatDate, storage } from '../utils/helpers';
import { fadeInUp, staggerContainer } from '../animations/variants';

const Leaderboard = () => {
    const { winners, committees } = useExpense();
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date'); // 'date', 'amount', 'frequency'
    const [topWinnersRef, topWinnersInView] = useInView({ triggerOnce: true, threshold: 0.3 });

    const users = storage.get('users', []);

    // Get winner frequency
    const getWinnerStats = () => {
        const stats = {};
        winners.forEach(winner => {
            if (!stats[winner.userId]) {
                stats[winner.userId] = {
                    userId: winner.userId,
                    userName: winner.userName,
                    totalWins: 0,
                    totalAmount: 0,
                    lastWin: winner.date
                };
            }
            stats[winner.userId].totalWins += 1;
            stats[winner.userId].totalAmount += winner.amount;
            if (new Date(winner.date) > new Date(stats[winner.userId].lastWin)) {
                stats[winner.userId].lastWin = winner.date;
            }
        });
        return Object.values(stats);
    };

    const winnerStats = getWinnerStats();

    // Filter winners
    let filteredWinners = [...winners];
    if (filter !== 'all') {
        filteredWinners = filteredWinners.filter(w => w.committeeId === filter);
    }

    // Sort winners
    if (sortBy === 'amount') {
        filteredWinners.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'date') {
        filteredWinners.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Sort stats
    const sortedStats = [...winnerStats].sort((a, b) => {
        if (sortBy === 'frequency') return b.totalWins - a.totalWins;
        if (sortBy === 'amount') return b.totalAmount - a.totalAmount;
        return new Date(b.lastWin) - new Date(a.lastWin);
    });

    const getTrophyIcon = (index) => {
        if (index === 0) return '🏆';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return '🎖️';
    };

    const getTrophyColor = (index) => {
        if (index === 0) return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
        if (index === 1) return 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)';
        if (index === 2) return 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)';
        return 'var(--gradient-primary)';
    };

    return (
        <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh', padding: 'var(--spacing-xl)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-header"
                >
                    <h1 className="dashboard-title">🏆 Leaderboard</h1>
                    <p className="dashboard-subtitle">
                        Celebrate our winners and track committee success
                    </p>
                </motion.div>

                {/* Top Winners Podium */}
                <motion.div
                    ref={topWinnersRef}
                    className="card mb-4"
                    style={{
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Decorative background */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        transform: 'translate(30%, -30%)'
                    }} />

                    <h2 style={{ color: 'white', marginBottom: 'var(--spacing-lg)', position: 'relative', zIndex: 1 }}>
                        🌟 Hall of Champions
                    </h2>

                    <motion.div
                        className="d-grid"
                        style={{
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: 'var(--spacing-lg)',
                            position: 'relative',
                            zIndex: 1
                        }}
                        initial="hidden"
                        animate={topWinnersInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        {sortedStats.slice(0, 3).map((stat, index) => (
                            <motion.div
                                key={stat.userId}
                                variants={fadeInUp}
                                whileHover={{ y: -8, scale: 1.05 }}
                                style={{
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    padding: 'var(--spacing-lg)',
                                    borderRadius: 'var(--radius-xl)',
                                    textAlign: 'center',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Trophy background glow */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.5, 0.3]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '150px',
                                        height: '150px',
                                        background: getTrophyColor(index),
                                        borderRadius: '50%',
                                        filter: 'blur(40px)',
                                        zIndex: 0
                                    }}
                                />

                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    style={{ fontSize: '4rem', marginBottom: 'var(--spacing-sm)', position: 'relative', zIndex: 1 }}
                                >
                                    {getTrophyIcon(index)}
                                </motion.div>

                                <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xl)', marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>
                                    {stat.userName}
                                </div>

                                <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.95, marginBottom: 'var(--spacing-sm)', position: 'relative', zIndex: 1 }}>
                                    {topWinnersInView && <CountUp end={stat.totalWins} duration={2} />} wins
                                </div>

                                <div style={{
                                    fontSize: 'var(--font-size-2xl)',
                                    fontWeight: 800,
                                    background: 'rgba(255,255,255,0.2)',
                                    padding: 'var(--spacing-sm)',
                                    borderRadius: 'var(--radius-lg)',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    {topWinnersInView && (
                                        <>
                                            $<CountUp end={stat.totalAmount} duration={2.5} separator="," />
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    className="card mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="d-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Filter by Committee</label>
                            <select
                                className="form-control form-select"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All Committees</option>
                                {committees.map(comm => (
                                    <option key={comm.id} value={comm.id}>{comm.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Sort By</label>
                            <select
                                className="form-control form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="date">Most Recent</option>
                                <option value="amount">Highest Amount</option>
                                <option value="frequency">Most Wins</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Winners List */}
                <motion.div
                    className="table-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Winner</th>
                                <th>Committee</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredWinners.length > 0 ? (
                                filteredWinners.map((winner, index) => (
                                    <motion.tr
                                        key={winner.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ backgroundColor: 'var(--bg-hover)' }}
                                    >
                                        <td>
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    background: index < 3 ? getTrophyColor(index) : 'var(--bg-secondary)',
                                                    color: index < 3 ? 'white' : 'var(--text-primary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 700,
                                                    fontSize: 'var(--font-size-lg)',
                                                    boxShadow: index < 3 ? 'var(--shadow-md)' : 'none'
                                                }}
                                            >
                                                {index < 3 ? getTrophyIcon(index) : index + 1}
                                            </motion.div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600, fontSize: 'var(--font-size-base)' }}>
                                                {winner.userName}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-primary">
                                                {winner.committeeName}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: 700, color: 'var(--success)', fontSize: 'var(--font-size-lg)' }}>
                                            {formatCurrency(winner.amount)}
                                        </td>
                                        <td style={{ color: 'var(--text-secondary)' }}>
                                            {formatDate(winner.date)}
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center" style={{ padding: 'var(--spacing-2xl)' }}>
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}
                                        >
                                            🏆
                                        </motion.div>
                                        <h3>No Winners Yet</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>
                                            Winners will appear here after committee draws
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </div>
    );
};

export default Leaderboard;
