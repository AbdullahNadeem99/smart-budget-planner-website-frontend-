import { useState } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { useAuth } from '../../context/AuthContext';

const CreateCommittee = ({ onClose }) => {
    const { createCommittee } = useExpense();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'monthly',
        goalAmount: ''
    });
    const [errors, setErrors] = useState({});

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
            newErrors.name = 'Committee name is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.goalAmount || parseFloat(formData.goalAmount) <= 0) {
            newErrors.goalAmount = 'Goal amount must be greater than 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        createCommittee({
            name: formData.name,
            description: formData.description,
            type: formData.type,
            goalAmount: parseFloat(formData.goalAmount)
        });

        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Committee Name *</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="e.g., Monthly Savers Club"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
            </div>

            <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                    name="description"
                    className="form-control"
                    placeholder="Describe the purpose of this committee..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                />
                {errors.description && <div className="form-error">{errors.description}</div>}
            </div>

            <div className="form-group">
                <label className="form-label">Type *</label>
                <select
                    name="type"
                    className="form-control form-select"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Goal Amount *</label>
                <input
                    type="number"
                    name="goalAmount"
                    className="form-control"
                    placeholder="1000"
                    step="0.01"
                    value={formData.goalAmount}
                    onChange={handleChange}
                />
                {errors.goalAmount && <div className="form-error">{errors.goalAmount}</div>}
                <div className="form-help">Total amount to be collected from all members</div>
            </div>

            <div className="d-flex gap-md justify-content-end">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Create Committee
                </button>
            </div>
        </form>
    );
};

export default CreateCommittee;
