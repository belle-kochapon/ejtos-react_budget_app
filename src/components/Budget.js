import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, selectedCurrency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState('');

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value);
        const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

        if (!isNaN(value) && value >= totalExpenses && value <= 20000) {
            setNewBudget(value);
        } else {
            if (value < totalExpenses) {
                alert('You cannot reduce the budget value lower than the total spending.');
            } else if (value > 20000) {
                alert('Budget cannot exceed £20,000.');
            } else {
                alert('Please enter a valid number.');
            }
            setNewBudget(budget); // Reset to current budget if validation fails
        }
    };

    return (
        <div className='alert alert-secondary'>
            <span className="currency-label">Budget: {selectedCurrency === 'GBP' ? '£' : selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '₹'}{newBudget}</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
            />
        </div>
    );
};

export default Budget;
