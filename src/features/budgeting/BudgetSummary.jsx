import { motion } from 'framer-motion';
import { formatCurrency, getCategoryTotals, calculatePercentage } from '../../utils/helpers';

const BudgetSummary = ({ income, expenses }) => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    const categoryTotals = getCategoryTotals(expenses);
    const savings = income - totalExpenses;
    const savingsRate = income > 0 ? calculatePercentage(savings, income) : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card mb-4"
        >
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>💼 Budget Summary</h3>

            {/* Overall Progress */}
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontWeight: 600 }}>Overall Budget</span>
                    <span style={{ fontWeight: 600 }}>
                        {formatCurrency(totalExpenses)} / {formatCurrency(income)}
                    </span>
                </div>
                <div style={{
                    width: '100%',
                    height: '12px',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(calculatePercentage(totalExpenses, income), 100)}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        style={{
                            height: '100%',
                            background: totalExpenses > income ? 'var(--danger)' : 'var(--success)',
                            borderRadius: 'var(--radius-full)'
                        }}
                    />
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                        Savings Rate: {savingsRate}%
                    </span>
                    <span style={{
                        fontSize: 'var(--font-size-sm)',
                        color: savings >= 0 ? 'var(--success)' : 'var(--danger)',
                        fontWeight: 600
                    }}>
                        {savings >= 0 ? '✓' : '⚠️'} {formatCurrency(Math.abs(savings))} {savings >= 0 ? 'saved' : 'over budget'}
                    </span>
                </div>
            </div>

            {/* Category Breakdown */}
            <div>
                <h4 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-md)' }}>
                    Category Breakdown
                </h4>
                {categoryTotals.length > 0 ? (
                    <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                        {categoryTotals.slice(0, 5).map((cat, index) => (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <div className="d-flex justify-content-between mb-1">
                                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
                                        {cat.category}
                                    </span>
                                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                                        {formatCurrency(cat.total)} ({calculatePercentage(cat.total, totalExpenses)}%)
                                    </span>
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '6px',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: 'var(--radius-full)',
                                    overflow: 'hidden'
                                }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${calculatePercentage(cat.total, totalExpenses)}%` }}
                                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                                        style={{
                                            height: '100%',
                                            background: 'var(--primary)',
                                            borderRadius: 'var(--radius-full)'
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                        No expenses to show
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default BudgetSummary;
