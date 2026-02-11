import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/helpers';
import { initializeMockData } from '../utils/mockData';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize mock data on first load
        initializeMockData();

        // Check if user is already logged in
        const currentUser = storage.get('currentUser');
        if (currentUser) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    const register = (userData) => {
        try {
            const users = storage.get('users', []);

            // Check if email already exists
            const existingUser = users.find(u => u.email === userData.email);
            if (existingUser) {
                throw new Error('Email already registered');
            }

            const newUser = {
                id: `user_${Date.now()}`,
                name: userData.name,
                email: userData.email,
                password: userData.password,
                role: userData.role || 'user',
                monthlyIncome: 0,
                followers: 0,
                following: 0,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            storage.set('users', users);

            return { success: true, user: newUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const login = (email, password) => {
        try {
            const users = storage.get('users', []);
            const foundUser = users.find(u => u.email === email && u.password === password);

            if (!foundUser) {
                throw new Error('Invalid email or password');
            }

            // Don't store password in current user
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            storage.set('currentUser', userWithoutPassword);

            return { success: true, user: userWithoutPassword };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        storage.remove('currentUser');
    };

    const updateProfile = (updatedData) => {
        try {
            const users = storage.get('users', []);
            const userIndex = users.findIndex(u => u.id === user.id);

            if (userIndex === -1) {
                throw new Error('User not found');
            }

            // Update user data
            users[userIndex] = { ...users[userIndex], ...updatedData };
            storage.set('users', users);

            // Update current user
            const { password: _, ...userWithoutPassword } = users[userIndex];
            setUser(userWithoutPassword);
            storage.set('currentUser', userWithoutPassword);

            return { success: true, user: userWithoutPassword };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const deleteAccount = () => {
        try {
            const users = storage.get('users', []);
            const filteredUsers = users.filter(u => u.id !== user.id);
            storage.set('users', filteredUsers);

            // Also delete user's expenses
            const expenses = storage.get('expenses', []);
            const filteredExpenses = expenses.filter(e => e.userId !== user.id);
            storage.set('expenses', filteredExpenses);

            logout();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
        deleteAccount,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
