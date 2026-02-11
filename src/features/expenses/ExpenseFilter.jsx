import { useState, useEffect } from 'react';
import { categories } from '../../utils/mockData';

const ExpenseFilter = ({ expenses, onFilter }) => {
    const [filters, setFilters] = useState({
        category: 'all',
        search: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        let filtered = [...expenses];

        // Filter by category
        if (filters.category !== 'all') {
            filtered = filtered.filter(exp => exp.category === filters.category);
        }

        // Filter by search
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(exp =>
                exp.title.toLowerCase().includes(searchLower) ||
                (exp.description && exp.description.toLowerCase().includes(searchLower))
            );
        }

        // Filter by date range
        if (filters.startDate) {
            filtered = filtered.filter(exp => new Date(exp.date) >= new Date(filters.startDate));
        }
        if (filters.endDate) {
            filtered = filtered.filter(exp => new Date(exp.date) <= new Date(filters.endDate));
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        onFilter(filtered);
    }, [filters, expenses, onFilter]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleClear = () => {
        setFilters({
            category: 'all',
            search: '',
            startDate: '',
            endDate: ''
        });
    };

    return (
        <div className="card mb-4">
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>🔍 Filter Expenses</h3>

            <div className="d-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Search</label>
                    <input
                        type="text"
                        name="search"
                        className="form-control"
                        placeholder="Search expenses..."
                        value={filters.search}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Category</label>
                    <select
                        name="category"
                        className="form-control form-select"
                        value={filters.category}
                        onChange={handleChange}
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        value={filters.startDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        className="form-control"
                        value={filters.endDate}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="mt-3">
                <button onClick={handleClear} className="btn btn-secondary btn-sm">
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default ExpenseFilter;
