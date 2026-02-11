// Utility helper functions for the application

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

// Format date for input fields
export const formatDateForInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get month name
export const getMonthName = (monthIndex) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
};

// Generate random ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Check for offensive words (basic filter)
export const containsOffensiveWords = (text) => {
  const offensiveWords = ['badword1', 'badword2', 'offensive']; // Add more as needed
  const lowerText = text.toLowerCase();
  return offensiveWords.some(word => lowerText.includes(word));
};

// Get greeting based on time
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

// LocalStorage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage: ${error}`);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  }
};

// Get random winner from committee members
export const selectRandomWinner = (members) => {
  if (!members || members.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * members.length);
  return members[randomIndex];
};

// Calculate savings
export const calculateSavings = (income, expenses) => {
  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
  return income - totalExpenses;
};

// Group expenses by category
export const groupByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    const category = expense.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(expense);
    return acc;
  }, {});
};

// Get category totals
export const getCategoryTotals = (expenses) => {
  const grouped = groupByCategory(expenses);
  return Object.keys(grouped).map(category => ({
    category,
    total: grouped[category].reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0),
    count: grouped[category].length
  }));
};

// Filter expenses by date range
export const filterByDateRange = (expenses, startDate, endDate) => {
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
  });
};

// Get current month expenses
export const getCurrentMonthExpenses = (expenses) => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return filterByDateRange(expenses, firstDay, lastDay);
};

// Generate smart budget tips
export const generateBudgetTips = (income, expenses, savings) => {
  const tips = [];
  const savingsRate = (savings / income) * 100;
  
  if (savingsRate < 10) {
    tips.push('⚠️ Your savings rate is below 10%. Try to reduce unnecessary expenses.');
  } else if (savingsRate >= 20) {
    tips.push('🎉 Great job! You\'re saving over 20% of your income.');
  }
  
  const categoryTotals = getCategoryTotals(expenses);
  const highestCategory = categoryTotals.sort((a, b) => b.total - a.total)[0];
  
  if (highestCategory && (highestCategory.total / income) > 0.3) {
    tips.push(`💡 ${highestCategory.category} is consuming ${calculatePercentage(highestCategory.total, income)}% of your income. Consider optimizing this category.`);
  }
  
  if (savings < 0) {
    tips.push('🚨 You\'re spending more than you earn! Review your expenses immediately.');
  }
  
  return tips.length > 0 ? tips : ['✅ Your budget looks healthy. Keep up the good work!'];
};
