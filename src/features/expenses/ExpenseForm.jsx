import { useState, useEffect } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../../utils/mockData';
import { formatDateForInput } from '../../utils/helpers';

const ExpenseForm = ({ expense, onClose }) => {
    const { addExpense, updateExpense } = useExpense();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: categories[0],
        date: formatDateForInput(new Date()),
        description: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (expense) {
            setFormData({
                title: expense.title,
                amount: expense.amount,
                category: expense.category,
                date: formatDateForInput(expense.date),
                description: expense.description || ''
            });
        }
    }, [expense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (!formData.date) {
            newErrors.date = 'Date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        if (expense) {
            updateExpense(expense.id, formData);
        } else {
            addExpense(formData);
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="e.g., Grocery Shopping"
                    value={formData.title}
                    onChange={handleChange}
                />
                {errors.title && <div className="form-error">{errors.title}</div>}
            </div>

            <div className="form-group">
                <label className="form-label">Amount *</label>
                <input
                    type="number"
                    name="amount"
                    className="form-control"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleChange}
                />
                {errors.amount && <div className="form-error">{errors.amount}</div>}
            </div>

            <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                    name="category"
                    className="form-control form-select"
                    value={formData.category}
                    onChange={handleChange}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                {errors.category && <div className="form-error">{errors.category}</div>}
            </div>

            <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                />
                {errors.date && <div className="form-error">{errors.date}</div>}
            </div>

            <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea
                    name="description"
                    className="form-control"
                    placeholder="Add notes about this expense..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                />
            </div>

            <div className="d-flex gap-md justify-content-end">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    {expense ? 'Update Expense' : 'Add Expense'}
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;
