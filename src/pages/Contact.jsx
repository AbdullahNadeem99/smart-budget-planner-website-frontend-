import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh', padding: 'var(--spacing-xl)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-4"
                >
                    <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                        Contact Us
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)' }}>
                        We'd love to hear from you! Send us a message.
                    </p>
                </motion.div>

                {submitted ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="card text-center"
                    >
                        <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>✅</div>
                        <h2 style={{ color: 'var(--success)', marginBottom: 'var(--spacing-sm)' }}>
                            Message Sent!
                        </h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Thank you for contacting us. We'll get back to you soon!
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card"
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    placeholder="What is this about?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea
                                    name="message"
                                    className="form-control"
                                    placeholder="Your message..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="dashboard-grid mt-4"
                >
                    <div className="card text-center">
                        <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>📧</div>
                        <h4>Email</h4>
                        <p style={{ color: 'var(--text-secondary)' }}>support@smartbudget.com</p>
                    </div>

                    <div className="card text-center">
                        <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>💬</div>
                        <h4>Live Chat</h4>
                        <p style={{ color: 'var(--text-secondary)' }}>Available 24/7</p>
                    </div>

                    <div className="card text-center">
                        <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>🌐</div>
                        <h4>Social Media</h4>
                        <p style={{ color: 'var(--text-secondary)' }}>@smartbudget</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
