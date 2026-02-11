// Reusable Framer Motion animation variants

// Fade animations
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
};

export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
};

export const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
};

export const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
};

export const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
};

// Scale animations
export const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
};

export const scaleUp = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20
        }
    }
};

// Stagger container
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const staggerContainerFast = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

// Slide animations
export const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
};

export const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
};

// Rotation animations
export const rotateIn = {
    hidden: { rotate: -180, scale: 0, opacity: 0 },
    visible: {
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15
        }
    }
};

// Bounce animation
export const bounceIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

// Hover animations
export const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.2 }
};

export const hoverLift = {
    y: -8,
    transition: { duration: 0.2 }
};

export const hoverGlow = {
    boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
    transition: { duration: 0.3 }
};

// Tap animations
export const tapScale = {
    scale: 0.95,
    transition: { duration: 0.1 }
};

// Page transition
export const pageTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3 }
    }
};

// Modal animations
export const modalBackdrop = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.2 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

export const modalContent = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
        }
    },
    exit: {
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

// Text animations
export const textReveal = {
    hidden: { y: 100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.01, 0.05, 0.95]
        }
    }
};

export const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.6, 0.01, 0.05, 0.95]
        }
    }
};

// Chart animations
export const chartBarGrow = {
    hidden: { scaleY: 0, originY: 1 },
    visible: {
        scaleY: 1,
        transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
        }
    }
};

export const chartPieExpand = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
        }
    }
};

// Card animations
export const cardHover = {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
};

export const cardTap = {
    scale: 0.98,
    transition: { duration: 0.1 }
};

// Confetti winner animation
export const winnerReveal = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.5
        }
    }
};

// Skeleton loader
export const skeletonPulse = {
    opacity: [0.5, 1, 0.5],
    transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

// Notification animations
export const notificationSlideIn = {
    hidden: { x: 400, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    exit: {
        x: 400,
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

// Magnetic button effect (use with custom hook)
export const magneticHover = (x, y) => ({
    x,
    y,
    transition: { type: "spring", stiffness: 300, damping: 20 }
});
