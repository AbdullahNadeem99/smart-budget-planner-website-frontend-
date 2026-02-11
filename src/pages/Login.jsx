import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { isValidEmail } from '../utils/helpers';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        const result = login(formData.email, formData.password);

        setLoading(false);

        if (result.success) {
            // Redirect based on role
            if (result.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } else {
            setErrors({ submit: result.error });
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'var(--bg-secondary)', padding: 'var(--spacing-md)' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card"
                style={{ maxWidth: '450px', width: '100%' }}
            >
                <div className="text-center mb-4">
                    <h1 className="navbar-brand" style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-sm)' }}>
                        Smart Budget
                    </h1>
                    <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-xs)' }}>
                        Welcome Back
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Login to continue managing your finances
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="form-error">{errors.password}</div>}
                    </div>

                    {errors.submit && (
                        <div className="form-error mb-3" style={{ textAlign: 'center' }}>
                            {errors.submit}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <div className="card" style={{ background: 'var(--bg-secondary)', padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            <strong>Demo Credentials:</strong>
                        </p>
                        <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: '0.25rem' }}>
                            User: john@example.com / password123
                        </p>
                        <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 0 }}>
                            Admin: admin@example.com / admin123
                        </p>
                    </div>
                </div>

                <div className="text-center mt-3">
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ fontWeight: 600 }}>
                            Sign up
                        </Link>
                    </p>
                </div>

                <div className="text-center mt-3">
                    <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                        ← Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
