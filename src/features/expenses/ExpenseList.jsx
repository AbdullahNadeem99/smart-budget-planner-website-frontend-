import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExpense } from '../../context/ExpenseContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import ExpenseFilter from './ExpenseFilter';

const ExpenseList = ({ expenses, onEdit }) => {
    const { deleteExpense } = useExpense();
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDelete = (id) => {
        deleteExpense(id);
        setDeleteConfirm(null);
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Food & Dining': 'var(--warning)',
            'Transportation': 'var(--info)',
            'Shopping': 'var(--secondary)',
            'Entertainment': 'var(--accent)',
            'Bills & Utilities': 'var(--danger)',
            'Healthcare': 'var(--success)',
            'Education': 'var(--primary)',
            'Travel': 'var(--info)',
            'Groceries': 'var(--success)',
            'Other': 'var(--text-tertiary)'
        };
        return colors[category] || 'var(--text-tertiary)';
    };

    return (
        <div>
            <ExpenseFilter
                expenses={expenses}
                onFilter={setFilteredExpenses}
            />

            {filteredExpenses.length === 0 ? (
                <div className="card text-center" style={{ padding: 'var(--spacing-xl)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📊</div>
                    <h3>No Expenses Found</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Start tracking your expenses by adding your first transaction
                    </p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredExpenses.map((expense) => (
                                    <motion.tr
                                        key={expense.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td>{formatDate(expense.date)}</td>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{expense.title}</div>
                                            {expense.description && (
                                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' }}>
                                                    {expense.description}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <span
                                                className="badge"
                                                style={{
                                                    background: `${getCategoryColor(expense.category)}20`,
                                                    color: getCategoryColor(expense.category)
                                                }}
                                            >
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: 600, color: 'var(--danger)' }}>
                                            {formatCurrency(expense.amount)}
                                        </td>
                                        <td>
                                            <div className="d-flex gap-sm">
                                                <button
                                                    onClick={() => onEdit(expense)}
                                                    className="btn btn-sm btn-secondary"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(expense.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="modal-backdrop" onClick={() => setDeleteConfirm(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h3 className="modal-title">Confirm Delete</h3>
                            <button className="modal-close" onClick={() => setDeleteConfirm(null)}>
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this expense? This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
