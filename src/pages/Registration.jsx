import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { isValidEmail } from '../utils/helpers';

const Registration = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        const result = register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: 'user'
        });

        setLoading(false);

        if (result.success) {
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setErrors({ submit: result.error });
        }
    };

    if (showSuccess) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="text-center"
                >
                    <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>🎉</div>
                    <h2 style={{ color: 'var(--success)', marginBottom: 'var(--spacing-sm)' }}>Registration Successful!</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Redirecting to login...</p>
                </motion.div>
            </div>
        );
    }

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
                        Create Your Account
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Start your journey to financial freedom
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>

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
                        <div className="form-help">Must be at least 6 characters</div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
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
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ fontWeight: 600 }}>
                            Login
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

export default Registration;
