import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ExpenseTotal = () => {
    const { expenses, selectedCurrency } = useContext(AppContext);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

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

    return (
        <div className='alert alert-primary'>
            <span>Spent so far: {renderCurrencySymbol()}{totalExpenses}</span>
        </div>
    );
};

export default ExpenseTotal;
