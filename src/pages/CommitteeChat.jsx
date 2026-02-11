import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useExpense } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { formatDate, containsOffensiveWords, formatCurrency, storage } from '../utils/helpers';

const CommitteeChat = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { committees, getCommitteeMessages, sendMessage, drawWinner, updateCommittee } = useExpense();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showWinner, setShowWinner] = useState(false);
    const [winner, setWinner] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const messagesEndRef = useRef(null);

    const committee = committees.find(c => c.id === id);
    const messages = getCommitteeMessages(id);
    const users = storage.get('users', []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (!committee) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="text-center">
                    <h2>Committee Not Found</h2>
                    <button onClick={() => navigate('/committee')} className="btn btn-primary mt-3">
                        Back to Committees
                    </button>
                </div>
            </div>
        );
    }

    if (!committee.members.includes(user.id)) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="text-center">
                    <h2>Access Denied</h2>
                    <p>You are not a member of this committee</p>
                    <button onClick={() => navigate('/committee')} className="btn btn-primary mt-3">
                        Back to Committees
                    </button>
                </div>
            </div>
        );
    }

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError('Message cannot be empty');
            return;
        }

        if (containsOffensiveWords(message)) {
            setError('Your message contains offensive content. Please be respectful.');
            return;
        }

        sendMessage(id, message);
        setMessage('');
        setError('');
    };

    const fireConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);
    };

    const handleDrawWinner = () => {
        setIsDrawing(true);

        // Drum-roll effect (3 seconds)
        setTimeout(() => {
            const winnerData = drawWinner(id);
            if (winnerData) {
                setWinner(winnerData);
                setShowWinner(true);
                setIsDrawing(false);
                updateCommittee(id, { status: 'completed' });

                // Fire confetti!
                setTimeout(() => {
                    fireConfetti();
                }, 300);
            }
        }, 3000);
    };

    const memberDetails = committee.members.map(memberId =>
        users.find(u => u.id === memberId)
    ).filter(Boolean);

    return (
        <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh', padding: 'var(--spacing-xl)' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card mb-4"
                >
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <h1 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '0.5rem' }}>
                                {committee.name}
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                {committee.description}
                            </p>
                            <div className="d-flex gap-md" style={{ flexWrap: 'wrap' }}>
                                <span className="badge badge-primary">
                                    {committee.type}
                                </span>
                                <span className="badge badge-success">
                                    👥 {committee.members.length} members
                                </span>
                                <span className="badge badge-info">
                                    💰 Goal: {formatCurrency(committee.goalAmount)}
                                </span>
                            </div>
                        </div>
                        <button onClick={() => navigate('/committee')} className="btn btn-secondary">
                            ← Back
                        </button>
                    </div>
                </motion.div>

                <div className="d-grid" style={{ gridTemplateColumns: '1fr 300px', gap: 'var(--spacing-lg)' }}>
                    {/* Chat Area */}
                    <div className="card" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ marginBottom: 'var(--spacing-md)', paddingBottom: 'var(--spacing-md)', borderBottom: '1px solid var(--border-color)' }}>
                            💬 Group Chat
                        </h3>

                        {/* Messages */}
                        <div style={{ flex: 1, overflowY: 'auto', marginBottom: 'var(--spacing-md)' }}>
                            <AnimatePresence>
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            marginBottom: 'var(--spacing-md)',
                                            padding: 'var(--spacing-sm)',
                                            background: msg.userId === user.id ? 'var(--primary)' : 'var(--bg-secondary)',
                                            color: msg.userId === user.id ? 'white' : 'var(--text-primary)',
                                            borderRadius: 'var(--radius-lg)',
                                            maxWidth: '80%',
                                            marginLeft: msg.userId === user.id ? 'auto' : '0',
                                            marginRight: msg.userId === user.id ? '0' : 'auto'
                                        }}
                                    >
                                        <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: '0.25rem' }}>
                                            {msg.userName}
                                        </div>
                                        <div>{msg.message}</div>
                                        <div style={{
                                            fontSize: 'var(--font-size-xs)',
                                            opacity: 0.7,
                                            marginTop: '0.25rem'
                                        }}>
                                            {formatDate(msg.timestamp)}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <form onSubmit={handleSendMessage}>
                            {error && <div className="form-error mb-2">{error}</div>}
                            <div className="d-flex gap-sm">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div>
                        {/* Members */}
                        <div className="card mb-4">
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Members</h4>
                            <div style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
                                {memberDetails.map((member) => (
                                    <div
                                        key={member.id}
                                        style={{
                                            padding: 'var(--spacing-sm)',
                                            background: 'var(--bg-secondary)',
                                            borderRadius: 'var(--radius-md)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: 'var(--gradient-primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: 600
                                        }}>
                                            {member.name.charAt(0)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>
                                                {member.name}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Draw Winner */}
                        {committee.status === 'active' && (
                            <div className="card">
                                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>🎲 Draw Winner</h4>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                                    Randomly select a winner from all members
                                </p>
                                <motion.button
                                    onClick={handleDrawWinner}
                                    className="btn btn-success"
                                    style={{ width: '100%' }}
                                    disabled={isDrawing}
                                    whileHover={!isDrawing ? { scale: 1.05 } : {}}
                                    whileTap={!isDrawing ? { scale: 0.95 } : {}}
                                    animate={isDrawing ? { rotate: [0, -5, 5, -5, 5, 0] } : {}}
                                    transition={isDrawing ? { duration: 0.5, repeat: Infinity } : {}}
                                >
                                    {isDrawing ? '🥁 Drawing...' : 'Draw Winner'}
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Winner Announcement Modal with Confetti */}
                {showWinner && winner && (
                    <div className="modal-backdrop">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', duration: 0.8, bounce: 0.5 }}
                            className="modal"
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxWidth: '500px' }}
                        >
                            <div className="modal-body text-center" style={{ padding: 'var(--spacing-2xl)' }}>
                                <motion.div
                                    animate={{
                                        rotate: [0, 10, -10, 10, -10, 0],
                                        scale: [1, 1.2, 1, 1.2, 1]
                                    }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    style={{ fontSize: '6rem', marginBottom: 'var(--spacing-md)' }}
                                >
                                    🎉
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        marginBottom: 'var(--spacing-md)',
                                        fontSize: 'var(--font-size-4xl)'
                                    }}
                                >
                                    Congratulations!
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 }}
                                    style={{
                                        background: 'var(--gradient-primary)',
                                        borderRadius: 'var(--radius-2xl)',
                                        padding: 'var(--spacing-xl)',
                                        marginBottom: 'var(--spacing-lg)',
                                        boxShadow: 'var(--glow-primary)'
                                    }}
                                >
                                    <h3 style={{ color: 'white', marginBottom: 'var(--spacing-sm)', fontSize: 'var(--font-size-3xl)' }}>
                                        {winner.userName}
                                    </h3>
                                    <p style={{ fontSize: 'var(--font-size-2xl)', color: 'white', fontWeight: 700 }}>
                                        Won {formatCurrency(winner.amount)}!
                                    </p>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    onClick={() => {
                                        setShowWinner(false);
                                        navigate('/leaderboard');
                                    }}
                                    className="btn btn-primary btn-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    🏆 View Leaderboard
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommitteeChat;
