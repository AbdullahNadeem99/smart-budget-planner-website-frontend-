import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import {
    staggerContainer,
    fadeInUp,
    scaleIn,
    textReveal,
    fadeInLeft,
    fadeInRight
} from '../animations/variants';
import { useMagneticHover } from '../animations/hooks';

const Home = () => {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    // Magnetic button refs
    const getStartedRef = useRef(null);
    const loginRef = useRef(null);
    const getStartedPos = useMagneticHover(getStartedRef, 0.2);
    const loginPos = useMagneticHover(loginRef, 0.2);

    // Intersection observers for animations
    const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [pricingRef, pricingInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: '💰',
            title: 'Expense Tracking',
            description: 'Track every penny with intelligent categorization and real-time insights into your spending habits.',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            icon: '📊',
            title: 'Budget Visualization',
            description: 'Beautiful charts and graphs that make understanding your finances effortless and engaging.',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            icon: '👥',
            title: 'Committee System',
            description: 'Join savings committees, pool resources together, and win through fair random selection.',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            icon: '🏆',
            title: 'Leaderboard',
            description: 'Compete with friends, celebrate winners, and stay motivated on your financial journey.',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        }
    ];

    const howItWorksSteps = [
        {
            step: '01',
            title: 'Sign Up Free',
            description: 'Create your account in seconds. No credit card required.',
            icon: '✨'
        },
        {
            step: '02',
            title: 'Set Your Budget',
            description: 'Define your monthly income and spending categories.',
            icon: '🎯'
        },
        {
            step: '03',
            title: 'Track Expenses',
            description: 'Log expenses on the go and watch your budget in real-time.',
            icon: '📱'
        },
        {
            step: '04',
            title: 'Achieve Goals',
            description: 'Join committees, save together, and reach financial freedom.',
            icon: '🚀'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Freelance Designer',
            avatar: 'SJ',
            text: 'Smart Budget Planner transformed how I manage my finances. The committee feature helped me save $5,000 in just 6 months!',
            rating: 5
        },
        {
            name: 'Michael Chen',
            role: 'Software Engineer',
            avatar: 'MC',
            text: 'The visualizations are incredible. I finally understand where my money goes. Highly recommend!',
            rating: 5
        },
        {
            name: 'Emily Rodriguez',
            role: 'Small Business Owner',
            avatar: 'ER',
            text: 'Best budgeting app I\'ve used. The interface is beautiful and the features are powerful yet simple.',
            rating: 5
        }
    ];

    const pricingPlans = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            features: [
                'Unlimited expense tracking',
                'Basic charts & reports',
                'Join up to 3 committees',
                'Mobile responsive',
                'Community support'
            ],
            cta: 'Get Started',
            popular: false,
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            name: 'Pro',
            price: '$9',
            period: 'per month',
            features: [
                'Everything in Free',
                'Advanced analytics',
                'Unlimited committees',
                'Priority support',
                'Export data (CSV, PDF)',
                'Custom categories',
                'Budget forecasting'
            ],
            cta: 'Start Free Trial',
            popular: true,
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            name: 'Team',
            price: '$29',
            period: 'per month',
            features: [
                'Everything in Pro',
                'Up to 10 team members',
                'Shared committees',
                'Team analytics',
                'Dedicated support',
                'Custom branding',
                'API access'
            ],
            cta: 'Contact Sales',
            popular: false,
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
    ];

    // Staggered text animation for hero title
    const titleWords = "Track. Save. Win. Smarter.".split(" ");

    return (
        <div className="landing-page">
            {/* Enhanced Navbar */}
            <motion.nav
                className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
                <div className="navbar-container">
                    <Link to="/" className="navbar-brand">
                        Smart Budget
                    </Link>
                    <div className="d-flex align-items-center gap-md">
                        <motion.button
                            onClick={toggleTheme}
                            className="btn btn-icon btn-secondary"
                            aria-label="Toggle theme"
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </motion.button>
                        <Link to="/login" className="btn btn-secondary">
                            Login
                        </Link>
                        <Link to="/signup" className="btn btn-primary">
                            Get Started
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Premium Hero Section with Animated Gradient */}
            <section className="hero-premium" ref={heroRef}>
                {/* Animated Gradient Background */}
                <div className="hero-gradient-bg" />

                {/* Floating Shapes/Orbs */}
                <div className="floating-shapes">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="floating-orb"
                            style={{
                                top: `${20 + i * 15}%`,
                                left: `${10 + i * 20}%`,
                                width: `${100 + i * 50}px`,
                                height: `${100 + i * 50}px`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 15, 0],
                                rotate: [0, 180, 360],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5,
                            }}
                        />
                    ))}
                </div>

                <div className="hero-content">
                    {/* Staggered Text Animation */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="hero-title-container"
                    >
                        {titleWords.map((word, index) => (
                            <motion.span
                                key={index}
                                variants={textReveal}
                                className="hero-title-word"
                                style={{
                                    display: 'inline-block',
                                    marginRight: index < titleWords.length - 1 ? '0.3em' : 0,
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        Track expenses, visualize budgets, join savings committees, and achieve your financial goals with our intelligent budget planning platform.
                    </motion.p>

                    {/* Magnetic Hover CTAs */}
                    <motion.div
                        className="hero-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        <motion.div
                            ref={getStartedRef}
                            animate={getStartedPos}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/signup"
                                className="btn btn-lg cta-primary"
                                style={{
                                    background: 'white',
                                    color: '#6366f1',
                                    boxShadow: '0 10px 40px rgba(255, 255, 255, 0.3)',
                                }}
                            >
                                Get Started Free
                            </Link>
                        </motion.div>

                        <motion.div
                            ref={loginRef}
                            animate={loginPos}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/login"
                                className="btn btn-lg btn-outline"
                                style={{
                                    borderColor: 'white',
                                    color: 'white',
                                    borderWidth: '2px',
                                }}
                            >
                                Login
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section with Count-Up Animation */}
            <section className="section-lg" ref={statsRef}>
                <div className="container">
                    <motion.div
                        className="dashboard-grid"
                        initial="hidden"
                        animate={statsInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        <motion.div className="stat-card-premium" variants={scaleIn}>
                            <div className="stat-label">Active Users</div>
                            <div className="stat-value" style={{ color: 'var(--primary)' }}>
                                {statsInView && <CountUp end={10000} duration={2.5} separator="," suffix="+" />}
                            </div>
                            <div className="stat-change positive">↑ 25% this month</div>
                        </motion.div>

                        <motion.div className="stat-card-premium" variants={scaleIn}>
                            <div className="stat-label">Money Saved</div>
                            <div className="stat-value" style={{ color: 'var(--success)' }}>
                                {statsInView && <CountUp end={2.5} decimals={1} duration={2.5} prefix="$" suffix="M+" />}
                            </div>
                            <div className="stat-change positive">↑ Growing daily</div>
                        </motion.div>

                        <motion.div className="stat-card-premium" variants={scaleIn}>
                            <div className="stat-label">Committees Active</div>
                            <div className="stat-value" style={{ color: 'var(--secondary)' }}>
                                {statsInView && <CountUp end={500} duration={2.5} separator="," suffix="+" />}
                            </div>
                            <div className="stat-change positive">↑ Join today</div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section with 3D Tilt Effect */}
            <section className="section-lg" style={{ background: 'var(--bg-secondary)' }} ref={featuresRef}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-4"
                    >
                        <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                            Everything You Need to Master Your Finances
                        </h2>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                            Powerful features designed to help you save more, spend wisely, and achieve financial freedom.
                        </p>
                    </motion.div>

                    <motion.div
                        className="features-grid"
                        initial="hidden"
                        animate={featuresInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{
                                    y: -12,
                                    rotateX: 5,
                                    rotateY: 5,
                                    transition: { duration: 0.3 }
                                }}
                                className="feature-card-premium"
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: 'var(--radius-2xl)',
                                    padding: 'var(--spacing-xl)',
                                    border: '1px solid var(--border-color)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Gradient border on hover */}
                                <motion.div
                                    className="card-gradient-border"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: 'var(--radius-2xl)',
                                        padding: '2px',
                                        background: feature.gradient,
                                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                        WebkitMaskComposite: 'xor',
                                        maskComposite: 'exclude',
                                        opacity: 0,
                                    }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <motion.div
                                    className="feature-icon"
                                    style={{
                                        background: feature.gradient,
                                        marginBottom: 'var(--spacing-md)',
                                    }}
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span style={{ fontSize: '2rem' }}>{feature.icon}</span>
                                </motion.div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section-lg" ref={howItWorksRef}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-4"
                    >
                        <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                            How It Works
                        </h2>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                            Get started in minutes and take control of your financial future.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-xl)', marginTop: 'var(--spacing-2xl)' }}>
                        {howItWorksSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={howItWorksInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                style={{
                                    textAlign: 'center',
                                    position: 'relative',
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        margin: '0 auto var(--spacing-md)',
                                        background: 'var(--gradient-primary)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2.5rem',
                                        boxShadow: 'var(--glow-primary)',
                                    }}
                                >
                                    {step.icon}
                                </motion.div>
                                <div style={{
                                    fontSize: 'var(--font-size-3xl)',
                                    fontWeight: 800,
                                    background: 'var(--gradient-primary)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    marginBottom: 'var(--spacing-sm)',
                                }}>
                                    {step.step}
                                </div>
                                <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{step.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-lg" style={{ background: 'var(--bg-secondary)' }} ref={testimonialsRef}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-4"
                    >
                        <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                            Loved by Thousands
                        </h2>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                            See what our users have to say about their experience.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-2xl)' }}>
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)' }}
                                className="card"
                                style={{
                                    padding: 'var(--spacing-xl)',
                                    background: 'var(--bg-card)',
                                    borderRadius: 'var(--radius-2xl)',
                                }}
                            >
                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                    {'⭐'.repeat(testimonial.rating)}
                                </div>
                                <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-lg)', lineHeight: 1.6 }}>
                                    "{testimonial.text}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        background: 'var(--gradient-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 700,
                                    }}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{testimonial.name}</div>
                                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="section-lg" ref={pricingRef}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-4"
                    >
                        <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                            Simple, Transparent Pricing
                        </h2>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                            Choose the plan that's right for you. All plans include a 14-day free trial.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-xl)', marginTop: 'var(--spacing-2xl)' }}>
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={pricingInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                whileHover={{ y: -12, boxShadow: plan.popular ? 'var(--glow-primary)' : 'var(--shadow-xl)' }}
                                className="card"
                                style={{
                                    padding: 'var(--spacing-xl)',
                                    background: plan.popular ? 'var(--gradient-primary)' : 'var(--bg-card)',
                                    borderRadius: 'var(--radius-2xl)',
                                    border: plan.popular ? 'none' : '1px solid var(--border-color)',
                                    position: 'relative',
                                    color: plan.popular ? 'white' : 'inherit',
                                }}
                            >
                                {plan.popular && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-12px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'var(--success)',
                                        color: 'white',
                                        padding: '0.25rem 1rem',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: 'var(--font-size-sm)',
                                        fontWeight: 600,
                                    }}>
                                        MOST POPULAR
                                    </div>
                                )}
                                <h3 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-sm)', color: plan.popular ? 'white' : 'inherit' }}>
                                    {plan.name}
                                </h3>
                                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                    <span style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 800, color: plan.popular ? 'white' : 'inherit' }}>
                                        {plan.price}
                                    </span>
                                    <span style={{ fontSize: 'var(--font-size-base)', color: plan.popular ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}>
                                        /{plan.period}
                                    </span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--spacing-xl)' }}>
                                    {plan.features.map((feature, i) => (
                                        <li key={i} style={{ padding: 'var(--spacing-sm) 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: plan.popular ? 'rgba(255,255,255,0.9)' : 'var(--text-primary)' }}>
                                            <span style={{ color: plan.popular ? 'white' : 'var(--success)' }}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to="/signup"
                                        className="btn btn-lg"
                                        style={{
                                            width: '100%',
                                            background: plan.popular ? 'white' : 'var(--gradient-primary)',
                                            color: plan.popular ? 'var(--primary)' : 'white',
                                        }}
                                    >
                                        {plan.cta}
                                    </Link>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-lg" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)', color: 'white' }}>
                            Ready to Transform Your Financial Future?
                        </h2>
                        <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-xl)', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto var(--spacing-xl)' }}>
                            Join thousands of users who are already taking control of their finances with Smart Budget Planner.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/signup" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)' }}>
                                Start Your Journey Today
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', padding: 'var(--spacing-xl) 0' }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center" style={{ flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                        <div className="navbar-brand">Smart Budget</div>
                        <div style={{ color: 'var(--text-secondary)' }}>
                            © 2026 Smart Budget Planner. All rights reserved.
                        </div>
                        <div className="d-flex gap-md">
                            <Link to="/about" style={{ color: 'var(--text-secondary)' }}>About</Link>
                            <Link to="/contact" style={{ color: 'var(--text-secondary)' }}>Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
        .hero-premium {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: var(--spacing-2xl) 0;
        }

        .hero-gradient-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          animation: gradientShift 15s ease infinite;
          background-size: 200% 200%;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .floating-shapes {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          filter: blur(40px);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }

        .hero-title-container {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 800;
          margin-bottom: var(--spacing-lg);
          color: white;
          line-height: 1.1;
          font-family: var(--font-heading);
        }

        .hero-title-word {
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: clamp(1.125rem, 3vw, 1.5rem);
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: var(--spacing-xl);
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        .stat-card-premium {
          background: var(--bg-card);
          padding: var(--spacing-xl);
          border-radius: var(--radius-2xl);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          transition: all var(--duration-normal) var(--ease-out);
        }

        .stat-card-premium:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }
      `}</style>
        </div>
    );
};

export default Home;
