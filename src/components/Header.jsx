import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Header = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = user?.role === 'admin'
        ? [
            { path: '/admin', label: 'Admin Dashboard', icon: '👑' },
            { path: '/profile', label: 'Profile', icon: '👤' }
        ]
        : [
            { path: '/dashboard', label: 'Dashboard', icon: '📊' },
            { path: '/currency', label: 'Currency', icon: '💱' },
            { path: '/committee', label: 'Committees', icon: '👥' },
            { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
            { path: '/profile', label: 'Profile', icon: '👤' }
        ];

    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to={user ? '/dashboard' : '/'} className="navbar-brand">
                    Smart Budget
                </Link>

                <nav className="navbar-menu">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            <span style={{ marginRight: '0.5rem' }}>{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="d-flex align-items-center gap-md">
                    <button
                        onClick={toggleTheme}
                        className="btn btn-icon btn-secondary"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                    <div style={{ position: 'relative' }}>
                        <button className="btn btn-secondary">
                            {user?.name || 'User'}
                        </button>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '0.5rem',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '0.5rem',
                                minWidth: '150px',
                                boxShadow: 'var(--shadow-lg)',
                                zIndex: 1000,
                                display: 'none'
                            }}
                            className="dropdown-menu"
                        >
                            <button
                                onClick={handleLogout}
                                className="btn btn-secondary"
                                style={{ width: '100%', justifyContent: 'flex-start' }}
                            >
                                🚪 Logout
                            </button>
                        </motion.div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="btn btn-danger btn-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
