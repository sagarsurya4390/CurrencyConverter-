import React, { useId } from 'react';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "usd",
    amountDisabled = false,
    currencyDisabled = false,
    className = ""
}) {
    const amountInputId = useId();

    const handleAmountChange = (e) => {
        const value = e.target.value;
        // Optional: Allow only positive values with a max of 2 decimals for currency values
        if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
            onAmountChange?.(value); // Call the parent handler
        }
    };

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2 pr-2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5 px-2 border border-gray-300 rounded-md"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisabled}
                    value={amount}
                    onChange={handleAmountChange}
                    min="0" // Prevent negative numbers
                    step="0.01" // Allow two decimal places
                />
            </div>
            <div className="w-1/2 pl-2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-3 py-2 bg-gray-100 cursor-pointer outline-none border border-gray-300"
                    value={selectedCurrency}
                    onChange={(e) => onCurrencyChange?.(e.target.value)}
                    disabled={currencyDisabled}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
