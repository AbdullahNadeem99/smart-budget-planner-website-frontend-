import { motion } from 'framer-motion';
import { formatCurrency, calculatePercentage } from '../../utils/helpers';

const CommitteeCard = ({ committee, onJoin, onView, isMember }) => {
    const progress = calculatePercentage(committee.currentAmount, committee.goalAmount);

    const getTypeColor = (type) => {
        const colors = {
            'weekly': 'var(--success)',
            'monthly': 'var(--primary)',
            'yearly': 'var(--secondary)'
        };
        return colors[type] || 'var(--text-tertiary)';
    };

    const getStatusColor = (status) => {
        const colors = {
            'active': 'var(--success)',
            'pending': 'var(--warning)',
            'completed': 'var(--text-tertiary)'
        };
        return colors[status] || 'var(--text-tertiary)';
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="card"
            style={{ height: '100%' }}
        >
            <div className="d-flex justify-content-between align-items-start mb-3">
                <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 0 }}>
                    {committee.name}
                </h3>
                <span
                    className="badge"
                    style={{
                        background: `${getTypeColor(committee.type)}20`,
                        color: getTypeColor(committee.type)
                    }}
                >
                    {committee.type}
                </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                {committee.description}
            </p>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
                        Progress
                    </span>
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                        {formatCurrency(committee.currentAmount)} / {formatCurrency(committee.goalAmount)}
                    </span>
                </div>
                <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 1 }}
                        style={{
                            height: '100%',
                            background: 'var(--success)',
                            borderRadius: 'var(--radius-full)'
                        }}
                    />
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                        👥 {committee.members.length} members
                    </span>
                </div>
                <span
                    className="badge"
                    style={{
                        background: `${getStatusColor(committee.status)}20`,
                        color: getStatusColor(committee.status)
                    }}
                >
                    {committee.status}
                </span>
            </div>

            <div className="d-flex gap-sm">
                {isMember ? (
                    <button onClick={() => onView(committee)} className="btn btn-primary" style={{ flex: 1 }}>
                        View Details
                    </button>
                ) : (
                    <button onClick={() => onJoin(committee.id)} className="btn btn-success" style={{ flex: 1 }}>
                        Join Committee
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default CommitteeCard;
