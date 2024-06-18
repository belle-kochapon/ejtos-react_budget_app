import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencySelector = () => {
    const { setSelectedCurrency } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    return (
        <select className='custom-select' style={{ backgroundColor: 'green', color: 'white' }} onChange={handleCurrencyChange}>
            <option value='GBP'>£ Pound</option>
            <option value='USD'>$ Dollar</option>
            <option value='EUR'>€ Euro</option>
            <option value='INR'>₹ Rupee</option>
        </select>
    );
};

export default CurrencySelector;
