import React, { createContext, useReducer, useState, useEffect } from 'react';

// Reducer function
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            const totalExpenses = state.expenses.reduce((total, item) => total + item.cost, 0);
            const newTotal = totalExpenses + action.payload.cost;
            if (newTotal <= state.budget) {
                const updatedExpenses = state.expenses.map(expense =>
                    expense.name === action.payload.name ? { ...expense, cost: expense.cost + action.payload.cost } : expense
                );
                return { ...state, expenses: updatedExpenses };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return state;
            }

        case 'RED_EXPENSE':
            const updatedExpenses = state.expenses.map(expense =>
                expense.name === action.payload.name ? { ...expense, cost: Math.max(0, expense.cost - action.payload.cost) } : expense
            );
            return { ...state, expenses: updatedExpenses };

        case 'SET_BUDGET':
            return { ...state, budget: action.payload };

        case 'CHG_CURRENCY':
            return { ...state, currency: action.payload };

        default:
            return state;
    }
};

// Initial state
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: 'GBP'
};

// Create context
export const AppContext = createContext();

// Provider component
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const [selectedCurrency, setSelectedCurrency] = useState('GBP');

    useEffect(() => {
        dispatch({ type: 'CHG_CURRENCY', payload: selectedCurrency });
    }, [selectedCurrency]);

    let remaining = state.budget - state.expenses.reduce((total, item) => total + item.cost, 0);

    return (
        <AppContext.Provider value={{
            ...state,
            dispatch,
            remaining,
            selectedCurrency,
            setSelectedCurrency
        }}>
            {props.children}
        </AppContext.Provider>
    );
};
