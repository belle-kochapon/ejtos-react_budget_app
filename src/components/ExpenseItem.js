import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch, selectedCurrency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const adjustAllocation = (name, isIncrease) => {
        const adjustment = isIncrease ? 10 : -10; // Decrease by 10 if isIncrease is false

        const expense = {
            name: name,
            cost: adjustment,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });
    };

    return (
        <tr>
            <td>{props.name}</td>
            <td>
                {selectedCurrency === 'GBP' && `£${props.cost}`}
                {selectedCurrency === 'USD' && `$${props.cost}`}
                {selectedCurrency === 'EUR' && `€${props.cost}`}
                {selectedCurrency === 'INR' && `₹${props.cost}`}
            </td>
            <td>
                <button onClick={() => adjustAllocation(props.name, true)}>+</button>
            </td>
            <td>
                <button onClick={() => adjustAllocation(props.name, false)}>-</button>
            </td>
            <td>
                <TiDelete size='1.5em' onClick={handleDeleteExpense} />
            </td>
        </tr>
    );
};

export default ExpenseItem;
