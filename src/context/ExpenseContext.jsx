import { createContext, useContext, useState, useEffect } from 'react';
import { storage, generateId, selectRandomWinner } from '../utils/helpers';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext();

export const useExpense = () => {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error('useExpense must be used within ExpenseProvider');
    }
    return context;
};

export const ExpenseProvider = ({ children }) => {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [committees, setCommittees] = useState([]);
    const [messages, setMessages] = useState([]);
    const [winners, setWinners] = useState([]);

    // Load data from localStorage
    useEffect(() => {
        setExpenses(storage.get('expenses', []));
        setCommittees(storage.get('committees', []));
        setMessages(storage.get('messages', []));
        setWinners(storage.get('winners', []));
    }, []);

    // EXPENSE OPERATIONS
    const addExpense = (expenseData) => {
        const newExpense = {
            id: generateId(),
            userId: user.id,
            ...expenseData,
            date: expenseData.date || new Date().toISOString()
        };

        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);
        storage.set('expenses', updatedExpenses);
        return newExpense;
    };

    const updateExpense = (id, updatedData) => {
        const updatedExpenses = expenses.map(exp =>
            exp.id === id ? { ...exp, ...updatedData } : exp
        );
        setExpenses(updatedExpenses);
        storage.set('expenses', updatedExpenses);
    };

    const deleteExpense = (id) => {
        const updatedExpenses = expenses.filter(exp => exp.id !== id);
        setExpenses(updatedExpenses);
        storage.set('expenses', updatedExpenses);
    };

    const getUserExpenses = () => {
        return expenses.filter(exp => exp.userId === user?.id);
    };

    // COMMITTEE OPERATIONS
    const createCommittee = (committeeData) => {
        const newCommittee = {
            id: generateId(),
            ...committeeData,
            members: [user.id],
            createdBy: user.id,
            createdAt: new Date().toISOString(),
            status: 'pending', // pending, active, completed
            currentAmount: 0
        };

        const updatedCommittees = [...committees, newCommittee];
        setCommittees(updatedCommittees);
        storage.set('committees', updatedCommittees);
        return newCommittee;
    };

    const joinCommittee = (committeeId) => {
        const updatedCommittees = committees.map(comm => {
            if (comm.id === committeeId && !comm.members.includes(user.id)) {
                return { ...comm, members: [...comm.members, user.id] };
            }
            return comm;
        });
        setCommittees(updatedCommittees);
        storage.set('committees', updatedCommittees);
    };

    const updateCommittee = (id, updatedData) => {
        const updatedCommittees = committees.map(comm =>
            comm.id === id ? { ...comm, ...updatedData } : comm
        );
        setCommittees(updatedCommittees);
        storage.set('committees', updatedCommittees);
    };

    const deleteCommittee = (id) => {
        const updatedCommittees = committees.filter(comm => comm.id !== id);
        setCommittees(updatedCommittees);
        storage.set('committees', updatedCommittees);
    };

    const getUserCommittees = () => {
        return committees.filter(comm => comm.members.includes(user?.id));
    };

    const drawWinner = (committeeId) => {
        const committee = committees.find(c => c.id === committeeId);
        if (!committee) return null;

        const users = storage.get('users', []);
        const memberDetails = committee.members.map(memberId =>
            users.find(u => u.id === memberId)
        ).filter(Boolean);

        const winner = selectRandomWinner(memberDetails);

        if (winner) {
            const winnerRecord = {
                id: generateId(),
                committeeId: committee.id,
                committeeName: committee.name,
                userId: winner.id,
                userName: winner.name,
                amount: committee.goalAmount,
                date: new Date().toISOString()
            };

            const updatedWinners = [...winners, winnerRecord];
            setWinners(updatedWinners);
            storage.set('winners', updatedWinners);

            return winnerRecord;
        }

        return null;
    };

    // MESSAGE OPERATIONS
    const sendMessage = (committeeId, message) => {
        const newMessage = {
            id: generateId(),
            committeeId,
            userId: user.id,
            userName: user.name,
            message,
            timestamp: new Date().toISOString()
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        storage.set('messages', updatedMessages);
        return newMessage;
    };

    const getCommitteeMessages = (committeeId) => {
        return messages.filter(msg => msg.committeeId === committeeId);
    };

    const deleteMessage = (id) => {
        const updatedMessages = messages.filter(msg => msg.id !== id);
        setMessages(updatedMessages);
        storage.set('messages', updatedMessages);
    };

    const value = {
        // Expenses
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        getUserExpenses,

        // Committees
        committees,
        createCommittee,
        joinCommittee,
        updateCommittee,
        deleteCommittee,
        getUserCommittees,
        drawWinner,

        // Messages
        messages,
        sendMessage,
        getCommitteeMessages,
        deleteMessage,

        // Winners
        winners
    };

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};
