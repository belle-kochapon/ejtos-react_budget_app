import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Remaining = () => {
    const { expenses, budget, selectedCurrency } = useContext(AppContext);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    // Calculate remaining budget
    const remainingBudget = budget - totalExpenses;

    // Function to render currency symbol based on selectedCurrency
    const renderCurrencySymbol = () => {
        switch (selectedCurrency) {
            case 'GBP':
                return '£';
            case 'USD':
                return '$';
            case 'EUR':
                return '€';
            case 'INR':
                return '₹';
            default:
                return '';
        }
    };

    // Determine alert type based on remaining budget
    const alertType = remainingBudget < 0 ? 'alert-danger' : 'alert-success';

    return (
        <div className={`alert ${alertType}`}>
            <span>Remaining: {renderCurrencySymbol()}{Math.abs(remainingBudget)}</span>
        </div>
    );
};

export default Remaining;
