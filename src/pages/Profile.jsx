import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, updateProfile, deleteAccount } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        monthlyIncome: user?.monthlyIncome || 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleDelete = () => {
        deleteAccount();
        navigate('/');
    };

    return (
        <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh', padding: 'var(--spacing-xl)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-header"
                >
                    <h1 className="dashboard-title">👤 My Profile</h1>
                    <p className="dashboard-subtitle">
                        Manage your account settings and preferences
                    </p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card mb-4"
                >
                    <div className="d-flex align-items-center gap-md mb-4">
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'var(--gradient-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            color: 'white',
                            fontWeight: 700
                        }}>
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 style={{ marginBottom: '0.25rem' }}>{user?.name}</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {isEditing ? (
                        <div>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Monthly Income</label>
                                <input
                                    type="number"
                                    name="monthlyIncome"
                                    className="form-control"
                                    value={formData.monthlyIncome}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="d-flex gap-md">
                                <button onClick={handleSave} className="btn btn-primary">
                                    Save Changes
                                </button>
                                <button onClick={() => setIsEditing(false)} className="btn btn-secondary">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="d-grid" style={{ gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div>
                                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                        Name
                                    </div>
                                    <div style={{ fontWeight: 600 }}>{user?.name}</div>
                                </div>

                                <div>
                                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                        Email
                                    </div>
                                    <div style={{ fontWeight: 600 }}>{user?.email}</div>
                                </div>

                                <div>
                                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                        Monthly Income
                                    </div>
                                    <div style={{ fontWeight: 600 }}>
                                        ${user?.monthlyIncome?.toLocaleString() || 0}
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                                ✏️ Edit Profile
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Stats Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card mb-4"
                >
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>📊 Account Statistics</h3>
                    <div className="d-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-md)' }}>
                        <div className="stat-card">
                            <div className="stat-label">Followers</div>
                            <div className="stat-value">{user?.followers || 0}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Following</div>
                            <div className="stat-value">{user?.following || 0}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Member Since</div>
                            <div className="stat-value" style={{ fontSize: 'var(--font-size-lg)' }}>
                                {new Date(user?.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Danger Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card"
                    style={{ borderColor: 'var(--danger)' }}
                >
                    <h3 style={{ color: 'var(--danger)', marginBottom: 'var(--spacing-md)' }}>
                        ⚠️ Danger Zone
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="btn btn-danger"
                    >
                        Delete Account
                    </button>
                </motion.div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="modal-backdrop" onClick={() => setShowDeleteConfirm(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                            <div className="modal-header">
                                <h3 className="modal-title">Confirm Account Deletion</h3>
                                <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>
                                    ✕
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Are you sure you want to delete your account? This action cannot be undone and will permanently delete:
                                </p>
                                <ul style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-md)' }}>
                                    <li>Your profile information</li>
                                    <li>All your expenses</li>
                                    <li>Committee memberships</li>
                                    <li>All associated data</li>
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    Yes, Delete My Account
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
