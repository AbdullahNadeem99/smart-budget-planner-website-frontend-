import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { getCategoryTotals, getMonthName } from '../../utils/helpers';

// Skeleton Loader Component
const ChartSkeleton = () => (
    <motion.div
        className="chart-skeleton"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
            width: '100%',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            position: 'relative',
            overflow: 'hidden',
        }}
    >
        <motion.div
            style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'linear-gradient(90deg, var(--bg-tertiary) 0%, var(--bg-hover) 50%, var(--bg-tertiary) 100%)',
                backgroundSize: '200% 100%',
            }}
            animate={{
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
            }}
        />
    </motion.div>
);

const ExpenseChart = ({ expenses }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState({ category: [], monthly: [] });
    const [activeChart, setActiveChart] = useState('pie'); // 'pie', 'bar', 'line'

    useEffect(() => {
        // Simulate loading for smooth animation
        setIsLoading(true);
        const timer = setTimeout(() => {
            const categoryData = getCategoryTotals(expenses);
            const monthlyData = getMonthlyData();
            setChartData({ category: categoryData, monthly: monthlyData });
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [expenses]);

    // Enhanced color palette
    const COLORS = [
        '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
        '#10b981', '#3b82f6', '#ef4444', '#14b8a6',
        '#f97316', '#84cc16', '#a855f7', '#06b6d4'
    ];

    // Prepare data for monthly trend (last 6 months)
    const getMonthlyData = () => {
        const monthlyTotals = {};
        const now = new Date();

        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            monthlyTotals[key] = {
                month: getMonthName(date.getMonth()).substring(0, 3), // Short month name
                total: 0,
                count: 0
            };
        }

        // Calculate totals
        expenses.forEach(exp => {
            const date = new Date(exp.date);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            if (monthlyTotals[key]) {
                monthlyTotals[key].total += parseFloat(exp.amount || 0);
                monthlyTotals[key].count += 1;
            }
        });

        return Object.values(monthlyTotals);
    };

    // Custom label for pie chart
    const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        if (percent < 0.05) return null; // Hide labels for small slices

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                style={{ fontSize: '12px', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--spacing-sm)',
                    boxShadow: 'var(--shadow-lg)',
                }}>
                    <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{label || payload[0].name}</p>
                    <p style={{ color: 'var(--success)', fontWeight: 700 }}>
                        ${payload[0].value.toFixed(2)}
                    </p>
                    {payload[0].payload.count && (
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                            {payload[0].payload.count} transactions
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            {/* Chart Type Selector */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    display: 'flex',
                    gap: 'var(--spacing-sm)',
                    marginBottom: 'var(--spacing-lg)',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}
            >
                {[
                    { id: 'pie', label: '📊 Category Breakdown', icon: '🥧' },
                    { id: 'bar', label: '📈 Monthly Bars', icon: '📊' },
                    { id: 'line', label: '📉 Trend Line', icon: '📈' }
                ].map((chart) => (
                    <motion.button
                        key={chart.id}
                        onClick={() => setActiveChart(chart.id)}
                        className="btn btn-sm"
                        style={{
                            background: activeChart === chart.id ? 'var(--gradient-primary)' : 'var(--bg-secondary)',
                            color: activeChart === chart.id ? 'white' : 'var(--text-primary)',
                            border: activeChart === chart.id ? 'none' : '1px solid var(--border-color)',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {chart.icon} {chart.label}
                    </motion.button>
                ))}
            </motion.div>

            <div className="dashboard-grid">
                {/* Main Chart Display */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="card"
                    whileHover={{ y: -4, boxShadow: 'var(--shadow-xl)' }}
                    style={{ gridColumn: activeChart === 'pie' ? 'auto' : '1 / -1' }}
                >
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                        {activeChart === 'pie' && '📊 Expense by Category'}
                        {activeChart === 'bar' && '📈 Monthly Spending'}
                        {activeChart === 'line' && '📉 Spending Trend'}
                    </h3>

                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <ChartSkeleton key="skeleton" />
                        ) : chartData.category.length > 0 || chartData.monthly.some(m => m.total > 0) ? (
                            <motion.div
                                key={`chart-${activeChart}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ResponsiveContainer width="100%" height={400}>
                                    {activeChart === 'pie' && (
                                        <PieChart>
                                            <Pie
                                                data={chartData.category}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={renderCustomLabel}
                                                outerRadius={120}
                                                fill="#8884d8"
                                                dataKey="total"
                                                animationBegin={0}
                                                animationDuration={1200}
                                                animationEasing="ease-out"
                                            >
                                                {chartData.category.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index % COLORS.length]}
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend
                                                verticalAlign="bottom"
                                                height={36}
                                                formatter={(value, entry) => `${entry.payload.category}`}
                                                wrapperStyle={{ fontSize: '14px' }}
                                            />
                                        </PieChart>
                                    )}

                                    {activeChart === 'bar' && (
                                        <BarChart data={chartData.monthly}>
                                            <defs>
                                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                            <XAxis
                                                dataKey="month"
                                                stroke="var(--text-secondary)"
                                                style={{ fontSize: '12px' }}
                                            />
                                            <YAxis
                                                stroke="var(--text-secondary)"
                                                style={{ fontSize: '12px' }}
                                                tickFormatter={(value) => `$${value}`}
                                            />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-hover)' }} />
                                            <Bar
                                                dataKey="total"
                                                fill="url(#barGradient)"
                                                radius={[8, 8, 0, 0]}
                                                animationBegin={0}
                                                animationDuration={1200}
                                                animationEasing="ease-out"
                                            />
                                        </BarChart>
                                    )}

                                    {activeChart === 'line' && (
                                        <AreaChart data={chartData.monthly}>
                                            <defs>
                                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                            <XAxis
                                                dataKey="month"
                                                stroke="var(--text-secondary)"
                                                style={{ fontSize: '12px' }}
                                            />
                                            <YAxis
                                                stroke="var(--text-secondary)"
                                                style={{ fontSize: '12px' }}
                                                tickFormatter={(value) => `$${value}`}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area
                                                type="monotone"
                                                dataKey="total"
                                                stroke="#6366f1"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorTotal)"
                                                animationBegin={0}
                                                animationDuration={1500}
                                                animationEasing="ease-out"
                                            />
                                        </AreaChart>
                                    )}
                                </ResponsiveContainer>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center"
                                style={{ padding: 'var(--spacing-2xl)' }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}
                                >
                                    📊
                                </motion.div>
                                <h3>No expenses to display</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    Start tracking your expenses to see beautiful charts!
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Quick Stats Card (only show with pie chart) */}
                {activeChart === 'pie' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="card"
                        whileHover={{ y: -4, boxShadow: 'var(--shadow-xl)' }}
                    >
                        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>📋 Quick Stats</h3>

                        <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                padding: 'var(--spacing-md)',
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                            }}>
                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                    Total Categories
                                </div>
                                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, color: 'var(--primary)' }}>
                                    {chartData.category.length}
                                </div>
                            </div>

                            <div style={{
                                padding: 'var(--spacing-md)',
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                            }}>
                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                    Top Category
                                </div>
                                <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>
                                    {chartData.category[0]?.category || 'N/A'}
                                </div>
                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--success)' }}>
                                    ${chartData.category[0]?.total.toFixed(2) || '0.00'}
                                </div>
                            </div>

                            <div style={{
                                padding: 'var(--spacing-md)',
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                            }}>
                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                    Avg per Category
                                </div>
                                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--info)' }}>
                                    ${chartData.category.length > 0
                                        ? (chartData.category.reduce((sum, cat) => sum + cat.total, 0) / chartData.category.length).toFixed(2)
                                        : '0.00'
                                    }
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ExpenseChart;
