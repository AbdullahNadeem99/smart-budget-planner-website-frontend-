import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency, getGreeting, getCurrentMonthExpenses, calculateSavings, getCategoryTotals, generateBudgetTips } from '../utils/helpers';
import CountUp from 'react-countup';
import ExpenseForm from '../features/expenses/ExpenseForm';
import ExpenseList from '../features/expenses/ExpenseList';
import ExpenseChart from '../features/expenses/ExpenseChart';
import BudgetSummary from '../features/budgeting/BudgetSummary';

const Dashboard = () => {
    const { user, updateProfile } = useAuth();
    const { getUserExpenses } = useExpense();
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [monthlyIncome, setMonthlyIncome] = useState(user?.monthlyIncome || 0);
    const [showIncomeModal, setShowIncomeModal] = useState(false);

    const userExpenses = getUserExpenses();
    const currentMonthExpenses = getCurrentMonthExpenses(userExpenses);
    const totalExpenses = currentMonthExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    const savings = calculateSavings(monthlyIncome, currentMonthExpenses);
    const budgetTips = generateBudgetTips(monthlyIncome, currentMonthExpenses, savings);

    const handleSetIncome = () => {
        updateProfile({ monthlyIncome });
        setShowIncomeModal(false);
    };

    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
        setShowExpenseForm(true);
    };

    const handleCloseForm = () => {
        setShowExpenseForm(false);
        setEditingExpense(null);
    };

    return (
        <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh', padding: 'var(--spacing-xl)' }}>
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-header"
                >
                    <h1 className="dashboard-title">
                        {getGreeting()}, {user?.name}! 👋
                    </h1>
                    <p className="dashboard-subtitle">
                        Here's your financial overview for this month
                    </p>
                </motion.div>

                {/* Premium Stats Cards with Count-Up */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="dashboard-grid"
                >
                    <motion.div
                        className="stat-card"
                        whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)' }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            style={{ fontSize: '2rem', marginBottom: '0.5rem' }}
                        >
                            💵
                        </motion.div>
                        <div className="stat-label">Monthly Income</div>
                        <div className="stat-value" style={{ color: 'var(--info)' }}>
                            $<CountUp end={monthlyIncome} duration={2} separator="," decimals={2} />
                        </div>
                        <motion.button
                            onClick={() => setShowIncomeModal(true)}
                            className="btn btn-sm btn-secondary mt-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Update Income
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="stat-card"
                        whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)' }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
                            style={{ fontSize: '2rem', marginBottom: '0.5rem' }}
                        >
                            💸
                        </motion.div>
                        <div className="stat-label">Total Expenses</div>
                        <div className="stat-value" style={{ color: 'var(--danger)' }}>
                            $<CountUp end={totalExpenses} duration={2} separator="," decimals={2} />
                        </div>
                        <div className="stat-change">
                            <CountUp end={currentMonthExpenses.length} duration={1.5} /> transactions this month
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card"
                        whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)' }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 1 }}
                            style={{ fontSize: '2rem', marginBottom: '0.5rem' }}
                        >
                            {savings >= 0 ? '💰' : '⚠️'}
                        </motion.div>
                        <div className="stat-label">Savings</div>
                        <div className="stat-value" style={{ color: savings >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                            {savings >= 0 ? '$' : '-$'}<CountUp end={Math.abs(savings)} duration={2} separator="," decimals={2} />
                        </div>
                        <div className={`stat-change ${savings >= 0 ? 'positive' : 'negative'}`}>
                            {savings >= 0 ? '↑ Great job!' : '↓ Review expenses'}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Budget Tips */}
                {budgetTips.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="card mb-4"
                        style={{ background: 'var(--gradient-primary)', color: 'white' }}
                    >
                        <h3 style={{ color: 'white', marginBottom: 'var(--spacing-md)' }}>💡 Smart Budget Tips</h3>
                        {budgetTips.map((tip, index) => (
                            <p key={index} style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
                                {tip}
                            </p>
                        ))}
                    </motion.div>
                )}

                {/* Budget Summary */}
                <BudgetSummary
                    income={monthlyIncome}
                    expenses={currentMonthExpenses}
                />

                {/* Charts */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ marginBottom: 'var(--spacing-xl)' }}
                >
                    <ExpenseChart expenses={currentMonthExpenses} />
                </motion.div>

                {/* Add Expense Button */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Recent Expenses</h2>
                    <button
                        onClick={() => setShowExpenseForm(true)}
                        className="btn btn-primary"
                    >
                        ➕ Add Expense
                    </button>
                </div>

                {/* Expense List */}
                <ExpenseList
                    expenses={userExpenses}
                    onEdit={handleEditExpense}
                />

                {/* Expense Form Modal */}
                {showExpenseForm && (
                    <div className="modal-backdrop" onClick={handleCloseForm}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    {editingExpense ? 'Edit Expense' : 'Add New Expense'}
                                </h3>
                                <button className="modal-close" onClick={handleCloseForm}>
                                    ✕
                                </button>
                            </div>
                            <div className="modal-body">
                                <ExpenseForm
                                    expense={editingExpense}
                                    onClose={handleCloseForm}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Income Modal */}
                {showIncomeModal && (
                    <div className="modal-backdrop" onClick={() => setShowIncomeModal(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">Set Monthly Income</h3>
                                <button className="modal-close" onClick={() => setShowIncomeModal(false)}>
                                    ✕
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Monthly Income</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={monthlyIncome}
                                        onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
                                        placeholder="Enter your monthly income"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowIncomeModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleSetIncome}>
                                    Save Income
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
