import { useState } from 'react';
import { motion } from 'framer-motion';
import { storage, formatCurrency, formatDate } from '../utils/helpers';
import { useExpense } from '../context/ExpenseContext';

const AdminDashboard = () => {
    const { committees, updateCommittee, deleteCommittee, expenses, messages, deleteMessage } = useExpense();
    const [users, setUsers] = useState(storage.get('users', []));
    const [activeTab, setActiveTab] = useState('users'); // 'users', 'committees', 'stats', 'messages'

    const handleBanUser = (userId) => {
        const updatedUsers = users.map(u =>
            u.id === userId ? { ...u, status: u.status === 'banned' ? 'active' : 'banned' } : u
        );
        setUsers(updatedUsers);
        storage.set('users', updatedUsers);
    };

    const handleDeleteUser = (userId) => {
        const updatedUsers = users.filter(u => u.id !== userId);
        setUsers(updatedUsers);
        storage.set('users', updatedUsers);
    };

    const handleApproveCommittee = (committeeId) => {
        updateCommittee(committeeId, { status: 'active' });
    };

    const handleRejectCommittee = (committeeId) => {
        deleteCommittee(committeeId);
    };

    // Calculate stats
    const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    const categoryTotals = {};
    expenses.forEach(exp => {
        if (!categoryTotals[exp.category]) {
            categoryTotals[exp.category] = 0;
        }
        categoryTotals[exp.category] += parseFloat(exp.amount || 0);
    });
    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

    return (
        <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh', padding: 'var(--spacing-xl)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-header"
                >
                    <h1 className="dashboard-title">👑 Admin Dashboard</h1>
                    <p className="dashboard-subtitle">
                        Manage users, committees, and monitor system activity
                    </p>
                </motion.div>

                {/* Stats Overview */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="dashboard-grid mb-4"
                >
                    <div className="stat-card">
                        <div className="stat-label">Total Users</div>
                        <div className="stat-value" style={{ color: 'var(--primary)' }}>{users.length}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Total Committees</div>
                        <div className="stat-value" style={{ color: 'var(--secondary)' }}>{committees.length}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Total Expenses</div>
                        <div className="stat-value" style={{ color: 'var(--danger)' }}>{formatCurrency(totalExpenses)}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Top Category</div>
                        <div className="stat-value" style={{ fontSize: 'var(--font-size-lg)' }}>
                            {topCategory ? topCategory[0] : 'N/A'}
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="d-flex gap-md mb-4" style={{ flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        👥 Users
                    </button>
                    <button
                        onClick={() => setActiveTab('committees')}
                        className={`btn ${activeTab === 'committees' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        🏛️ Committees
                    </button>
                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`btn ${activeTab === 'stats' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        📊 Statistics
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`btn ${activeTab === 'messages' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        💬 Messages
                    </button>
                </div>

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="table-container"
                    >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td style={{ fontWeight: 600 }}>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${user.role === 'admin' ? 'badge-danger' : 'badge-primary'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${user.status === 'banned' ? 'badge-danger' : 'badge-success'}`}>
                                                {user.status || 'active'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-sm">
                                                <button
                                                    onClick={() => handleBanUser(user.id)}
                                                    className={`btn btn-sm ${user.status === 'banned' ? 'btn-success' : 'btn-warning'}`}
                                                >
                                                    {user.status === 'banned' ? 'Unban' : 'Ban'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="btn btn-sm btn-danger"
                                                    disabled={user.role === 'admin'}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}

                {/* Committees Tab */}
                {activeTab === 'committees' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="table-container"
                    >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Members</th>
                                    <th>Goal</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {committees.map(comm => (
                                    <tr key={comm.id}>
                                        <td style={{ fontWeight: 600 }}>{comm.name}</td>
                                        <td>
                                            <span className="badge badge-primary">{comm.type}</span>
                                        </td>
                                        <td>{comm.members.length}</td>
                                        <td>{formatCurrency(comm.goalAmount)}</td>
                                        <td>
                                            <span className={`badge badge-${comm.status === 'active' ? 'success' : comm.status === 'pending' ? 'warning' : 'info'}`}>
                                                {comm.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-sm">
                                                {comm.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApproveCommittee(comm.id)}
                                                            className="btn btn-sm btn-success"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectCommittee(comm.id)}
                                                            className="btn btn-sm btn-danger"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {comm.status !== 'pending' && (
                                                    <button
                                                        onClick={() => handleRejectCommittee(comm.id)}
                                                        className="btn btn-sm btn-danger"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}

                {/* Stats Tab */}
                {activeTab === 'stats' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="dashboard-grid"
                    >
                        <div className="card">
                            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>💰 Financial Overview</h3>
                            <div className="d-grid" style={{ gap: 'var(--spacing-md)' }}>
                                <div>
                                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                                        Total Expenses
                                    </div>
                                    <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--danger)' }}>
                                        {formatCurrency(totalExpenses)}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                                        Average Expense
                                    </div>
                                    <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>
                                        {formatCurrency(avgExpense)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>📈 Category Breakdown</h3>
                            <div style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
                                {Object.entries(categoryTotals)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 5)
                                    .map(([category, total]) => (
                                        <div key={category} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>{category}</span>
                                            <span style={{ fontWeight: 600 }}>{formatCurrency(total)}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="table-container"
                    >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Message</th>
                                    <th>Committee</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.slice().reverse().slice(0, 20).map(msg => {
                                    const committee = committees.find(c => c.id === msg.committeeId);
                                    return (
                                        <tr key={msg.id}>
                                            <td style={{ fontWeight: 600 }}>{msg.userName}</td>
                                            <td>{msg.message}</td>
                                            <td>
                                                <span className="badge badge-primary">
                                                    {committee?.name || 'Unknown'}
                                                </span>
                                            </td>
                                            <td>{formatDate(msg.timestamp)}</td>
                                            <td>
                                                <button
                                                    onClick={() => deleteMessage(msg.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
