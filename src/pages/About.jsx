import { motion } from 'framer-motion';

const About = () => {
    return (
        <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh', padding: 'var(--spacing-xl)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-4"
                >
                    <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                        About Smart Budget Planner
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)' }}>
                        Your trusted companion for financial freedom
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card mb-4"
                >
                    <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Our Mission</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        At Smart Budget Planner, we believe that everyone deserves to have control over their finances.
                        Our mission is to provide an intuitive, powerful, and accessible platform that helps individuals
                        and groups track expenses, manage budgets, and achieve their financial goals together.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card mb-4"
                >
                    <h2 style={{ marginBottom: 'var(--spacing-md)' }}>What We Offer</h2>
                    <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                        <div>
                            <h4 style={{ color: 'var(--primary)' }}>💰 Expense Tracking</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Track every transaction with intelligent categorization and powerful filtering options.
                            </p>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--success)' }}>📊 Budget Visualization</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Beautiful charts and insights that make understanding your finances effortless.
                            </p>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--secondary)' }}>👥 Committee System</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Join savings committees, pool resources, and achieve goals together with fair random selection.
                            </p>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--warning)' }}>🏆 Leaderboard</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Celebrate winners and stay motivated on your financial journey.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card"
                >
                    <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Why Choose Us?</h2>
                    <ul style={{ color: 'var(--text-secondary)', lineHeight: 2 }}>
                        <li>✅ <strong>100% Free</strong> - No hidden costs or premium tiers</li>
                        <li>✅ <strong>Privacy First</strong> - Your data stays with you</li>
                        <li>✅ <strong>Easy to Use</strong> - Intuitive interface designed for everyone</li>
                        <li>✅ <strong>Smart Insights</strong> - AI-powered budget tips and recommendations</li>
                        <li>✅ <strong>Community Driven</strong> - Save together, win together</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
