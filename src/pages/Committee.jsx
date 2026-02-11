import { useState } from 'react';
import { motion } from 'framer-motion';
import { useExpense } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import CommitteeCard from '../features/committees/CommitteeCard';
import CreateCommittee from '../features/committees/CreateCommittee';
import { useNavigate } from 'react-router-dom';

const Committee = () => {
    const { user } = useAuth();
    const { committees, joinCommittee, getUserCommittees } = useExpense();
    const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeTab, setActiveTab] = useState('my'); // 'my' or 'all'

    const userCommittees = getUserCommittees();
    const availableCommittees = committees.filter(c => !c.members.includes(user.id));

    const handleJoin = (committeeId) => {
        joinCommittee(committeeId);
    };

    const handleView = (committee) => {
        navigate(`/committee/${committee.id}/chat`);
    };

    const displayCommittees = activeTab === 'my' ? userCommittees : availableCommittees;

    return (
        <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh', padding: 'var(--spacing-xl)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-header"
                >
                    <h1 className="dashboard-title">Committees 👥</h1>
                    <p className="dashboard-subtitle">
                        Join savings committees and achieve financial goals together
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex gap-md">
                        <button
                            onClick={() => setActiveTab('my')}
                            className={`btn ${activeTab === 'my' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            My Committees ({userCommittees.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            Available ({availableCommittees.length})
                        </button>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="btn btn-success"
                    >
                        ➕ Create Committee
                    </button>
                </div>

                {/* Committees Grid */}
                {displayCommittees.length > 0 ? (
                    <motion.div
                        className="features-grid"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {displayCommittees.map((committee) => (
                            <motion.div
                                key={committee.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <CommitteeCard
                                    committee={committee}
                                    onJoin={handleJoin}
                                    onView={handleView}
                                    isMember={activeTab === 'my'}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="card text-center" style={{ padding: 'var(--spacing-xl)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>
                            {activeTab === 'my' ? '👥' : '🔍'}
                        </div>
                        <h3>
                            {activeTab === 'my' ? 'No Committees Yet' : 'No Available Committees'}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {activeTab === 'my'
                                ? 'Join or create a committee to start saving together'
                                : 'All committees are either full or you are already a member'}
                        </p>
                    </div>
                )}

                {/* Create Committee Modal */}
                {showCreateModal && (
                    <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">Create New Committee</h3>
                                <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                                    ✕
                                </button>
                            </div>
                            <div className="modal-body">
                                <CreateCommittee onClose={() => setShowCreateModal(false)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Committee;
