// Enhanced Mock data for initial setup and development

export const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Groceries',
    'Fitness & Sports',
    'Personal Care',
    'Insurance',
    'Investments',
    'Gifts & Donations',
    'Home & Garden',
    'Technology',
    'Subscriptions',
    'Other'
];

export const mockUsers = [
    {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
        monthlyIncome: 5000,
        followers: 145,
        following: 89,
        createdAt: new Date('2024-01-15').toISOString(),
        avatar: 'JD',
        bio: 'Financial enthusiast saving for a dream vacation'
    },
    {
        id: 'user2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
        monthlyIncome: 6500,
        followers: 234,
        following: 156,
        createdAt: new Date('2024-02-10').toISOString(),
        avatar: 'JS',
        bio: 'Budget master and savings champion'
    },
    {
        id: 'user3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: 'password123',
        role: 'user',
        monthlyIncome: 4800,
        followers: 98,
        following: 67,
        createdAt: new Date('2024-03-05').toISOString(),
        avatar: 'MJ',
        bio: 'Investing in my future, one dollar at a time'
    },
    {
        id: 'user4',
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        password: 'password123',
        role: 'user',
        monthlyIncome: 5500,
        followers: 187,
        following: 123,
        createdAt: new Date('2024-04-20').toISOString(),
        avatar: 'SW',
        bio: 'Frugal living advocate and committee organizer'
    },
    {
        id: 'user5',
        name: 'David Chen',
        email: 'david@example.com',
        password: 'password123',
        role: 'user',
        monthlyIncome: 7200,
        followers: 312,
        following: 201,
        createdAt: new Date('2024-05-12').toISOString(),
        avatar: 'DC',
        bio: 'Tech professional with a passion for smart budgeting'
    },
    {
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        monthlyIncome: 0,
        followers: 0,
        following: 0,
        createdAt: new Date('2024-01-01').toISOString(),
        avatar: 'AD',
        bio: 'Platform administrator'
    }
];

// Generate realistic expenses for the current month
const generateExpenses = () => {
    const expenses = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const expenseTemplates = [
        { title: 'Grocery Shopping', category: 'Groceries', min: 80, max: 200 },
        { title: 'Restaurant Dinner', category: 'Food & Dining', min: 30, max: 100 },
        { title: 'Coffee Shop', category: 'Food & Dining', min: 5, max: 15 },
        { title: 'Gas Station', category: 'Transportation', min: 40, max: 80 },
        { title: 'Uber/Lyft Ride', category: 'Transportation', min: 15, max: 45 },
        { title: 'Electricity Bill', category: 'Bills & Utilities', min: 70, max: 150 },
        { title: 'Internet Bill', category: 'Bills & Utilities', min: 50, max: 100 },
        { title: 'Phone Bill', category: 'Bills & Utilities', min: 40, max: 80 },
        { title: 'Netflix Subscription', category: 'Subscriptions', min: 10, max: 20 },
        { title: 'Spotify Premium', category: 'Subscriptions', min: 10, max: 15 },
        { title: 'Gym Membership', category: 'Fitness & Sports', min: 30, max: 80 },
        { title: 'Movie Tickets', category: 'Entertainment', min: 20, max: 50 },
        { title: 'Online Shopping', category: 'Shopping', min: 30, max: 150 },
        { title: 'Clothing Purchase', category: 'Shopping', min: 50, max: 200 },
        { title: 'Doctor Visit', category: 'Healthcare', min: 50, max: 150 },
        { title: 'Pharmacy', category: 'Healthcare', min: 20, max: 60 },
        { title: 'Haircut', category: 'Personal Care', min: 20, max: 50 },
        { title: 'Book Purchase', category: 'Education', min: 15, max: 40 },
        { title: 'Home Supplies', category: 'Home & Garden', min: 25, max: 100 },
    ];

    let expenseId = 1;

    // Generate expenses for user1 (current month)
    for (let i = 0; i < 25; i++) {
        const template = expenseTemplates[Math.floor(Math.random() * expenseTemplates.length)];
        const day = Math.floor(Math.random() * 28) + 1;
        const amount = Math.floor(Math.random() * (template.max - template.min + 1)) + template.min;

        expenses.push({
            id: `exp${expenseId++}`,
            userId: 'user1',
            title: template.title,
            amount: amount,
            category: template.category,
            date: new Date(currentYear, currentMonth, day).toISOString(),
            description: `${template.title} - ${template.category}`
        });
    }

    // Add some expenses from previous months for trends
    for (let monthOffset = 1; monthOffset <= 5; monthOffset++) {
        for (let i = 0; i < 15; i++) {
            const template = expenseTemplates[Math.floor(Math.random() * expenseTemplates.length)];
            const day = Math.floor(Math.random() * 28) + 1;
            const amount = Math.floor(Math.random() * (template.max - template.min + 1)) + template.min;

            expenses.push({
                id: `exp${expenseId++}`,
                userId: 'user1',
                title: template.title,
                amount: amount,
                category: template.category,
                date: new Date(currentYear, currentMonth - monthOffset, day).toISOString(),
                description: `${template.title} - ${template.category}`
            });
        }
    }

    return expenses;
};

export const mockExpenses = generateExpenses();

export const mockCommittees = [
    {
        id: 'comm1',
        name: 'Monthly Savers Club 💰',
        description: 'Save together, win together! Join our monthly savings challenge and build wealth as a community.',
        type: 'monthly',
        goalAmount: 1000,
        currentAmount: 850,
        members: ['user1', 'user2', 'user3', 'user4', 'user5'],
        createdBy: 'user1',
        createdAt: new Date('2024-12-01').toISOString(),
        status: 'active',
        nextDrawDate: new Date('2025-02-01').toISOString()
    },
    {
        id: 'comm2',
        name: 'Weekly Budget Warriors ⚔️',
        description: 'Weekly savings challenge for the disciplined. Small steps, big results!',
        type: 'weekly',
        goalAmount: 500,
        currentAmount: 425,
        members: ['user1', 'user3', 'user4'],
        createdBy: 'user3',
        createdAt: new Date('2024-12-15').toISOString(),
        status: 'active',
        nextDrawDate: new Date('2025-01-20').toISOString()
    },
    {
        id: 'comm3',
        name: 'Dream Vacation Fund ✈️',
        description: 'Saving for that dream vacation? Join us and make it happen faster!',
        type: 'monthly',
        goalAmount: 2000,
        currentAmount: 1650,
        members: ['user2', 'user4', 'user5'],
        createdBy: 'user2',
        createdAt: new Date('2024-11-20').toISOString(),
        status: 'active',
        nextDrawDate: new Date('2025-01-25').toISOString()
    },
    {
        id: 'comm4',
        name: 'Emergency Fund Builders 🛡️',
        description: 'Building financial security together. 6 months of expenses, here we come!',
        type: 'monthly',
        goalAmount: 1500,
        currentAmount: 1200,
        members: ['user1', 'user2', 'user5'],
        createdBy: 'user5',
        createdAt: new Date('2024-10-10').toISOString(),
        status: 'active',
        nextDrawDate: new Date('2025-02-10').toISOString()
    },
    {
        id: 'comm5',
        name: 'Tech Gadget Savers 📱',
        description: 'Saving for the latest tech? Pool resources and win big!',
        type: 'weekly',
        goalAmount: 800,
        currentAmount: 640,
        members: ['user3', 'user5'],
        createdBy: 'user3',
        createdAt: new Date('2024-12-05').toISOString(),
        status: 'active',
        nextDrawDate: new Date('2025-01-18').toISOString()
    }
];

export const mockMessages = [
    // Committee 1 messages
    {
        id: 'msg1',
        committeeId: 'comm1',
        userId: 'user1',
        userName: 'John Doe',
        message: 'Hey everyone! Excited to be part of this committee! 🎉',
        timestamp: new Date('2024-12-02T10:30:00').toISOString()
    },
    {
        id: 'msg2',
        committeeId: 'comm1',
        userId: 'user2',
        userName: 'Jane Smith',
        message: 'Welcome! Let\'s save together and reach our goals! 💪',
        timestamp: new Date('2024-12-02T11:15:00').toISOString()
    },
    {
        id: 'msg3',
        committeeId: 'comm1',
        userId: 'user3',
        userName: 'Mike Johnson',
        message: 'Just made my monthly deposit. Good luck everyone!',
        timestamp: new Date('2024-12-05T14:20:00').toISOString()
    },
    {
        id: 'msg4',
        committeeId: 'comm1',
        userId: 'user4',
        userName: 'Sarah Williams',
        message: 'This is such a great idea! Already seeing results 📈',
        timestamp: new Date('2024-12-08T09:45:00').toISOString()
    },
    {
        id: 'msg5',
        committeeId: 'comm1',
        userId: 'user5',
        userName: 'David Chen',
        message: 'Love the community spirit here! Keep it up everyone! 🌟',
        timestamp: new Date('2024-12-12T16:30:00').toISOString()
    },
    {
        id: 'msg6',
        committeeId: 'comm1',
        userId: 'user1',
        userName: 'John Doe',
        message: 'We\'re almost at our goal! Just $150 more to go! 🎯',
        timestamp: new Date('2024-12-20T13:10:00').toISOString()
    },
    // Committee 2 messages
    {
        id: 'msg7',
        committeeId: 'comm2',
        userId: 'user3',
        userName: 'Mike Johnson',
        message: 'Welcome to the Weekly Budget Warriors! Let\'s do this! ⚔️',
        timestamp: new Date('2024-12-15T10:00:00').toISOString()
    },
    {
        id: 'msg8',
        committeeId: 'comm2',
        userId: 'user1',
        userName: 'John Doe',
        message: 'Thanks for creating this! Weekly challenges keep me motivated 💯',
        timestamp: new Date('2024-12-16T14:30:00').toISOString()
    },
    {
        id: 'msg9',
        committeeId: 'comm2',
        userId: 'user4',
        userName: 'Sarah Williams',
        message: 'Just completed my first week! Feeling accomplished 🏆',
        timestamp: new Date('2024-12-22T11:20:00').toISOString()
    }
];

export const mockWinners = [
    {
        id: 'win1',
        committeeId: 'comm1',
        committeeName: 'Monthly Savers Club 💰',
        userId: 'user2',
        userName: 'Jane Smith',
        amount: 1000,
        date: new Date('2024-11-01').toISOString()
    },
    {
        id: 'win2',
        committeeId: 'comm2',
        committeeName: 'Weekly Budget Warriors ⚔️',
        userId: 'user3',
        userName: 'Mike Johnson',
        amount: 500,
        date: new Date('2024-12-08').toISOString()
    },
    {
        id: 'win3',
        committeeId: 'comm1',
        committeeName: 'Monthly Savers Club 💰',
        userId: 'user1',
        userName: 'John Doe',
        amount: 1000,
        date: new Date('2024-10-01').toISOString()
    },
    {
        id: 'win4',
        committeeId: 'comm3',
        committeeName: 'Dream Vacation Fund ✈️',
        userId: 'user4',
        userName: 'Sarah Williams',
        amount: 2000,
        date: new Date('2024-12-01').toISOString()
    },
    {
        id: 'win5',
        committeeId: 'comm4',
        committeeName: 'Emergency Fund Builders 🛡️',
        userId: 'user5',
        userName: 'David Chen',
        amount: 1500,
        date: new Date('2024-11-10').toISOString()
    },
    {
        id: 'win6',
        committeeId: 'comm2',
        committeeName: 'Weekly Budget Warriors ⚔️',
        userId: 'user1',
        userName: 'John Doe',
        amount: 500,
        date: new Date('2024-12-01').toISOString()
    },
    {
        id: 'win7',
        committeeId: 'comm5',
        committeeName: 'Tech Gadget Savers 📱',
        userId: 'user3',
        userName: 'Mike Johnson',
        amount: 800,
        date: new Date('2024-12-15').toISOString()
    },
    {
        id: 'win8',
        committeeId: 'comm3',
        committeeName: 'Dream Vacation Fund ✈️',
        userId: 'user2',
        userName: 'Jane Smith',
        amount: 2000,
        date: new Date('2024-11-01').toISOString()
    }
];

// Initialize mock data in localStorage if not exists
export const initializeMockData = () => {
    const users = localStorage.getItem('users');
    if (!users) {
        localStorage.setItem('users', JSON.stringify(mockUsers));
        localStorage.setItem('expenses', JSON.stringify(mockExpenses));
        localStorage.setItem('committees', JSON.stringify(mockCommittees));
        localStorage.setItem('messages', JSON.stringify(mockMessages));
        localStorage.setItem('winners', JSON.stringify(mockWinners));
        console.log('✅ Mock data initialized successfully!');
        console.log(`📊 Generated ${mockExpenses.length} expenses`);
        console.log(`👥 Created ${mockUsers.length} users`);
        console.log(`💰 Set up ${mockCommittees.length} committees`);
        console.log(`💬 Added ${mockMessages.length} messages`);
        console.log(`🏆 Recorded ${mockWinners.length} winners`);
    }
};
