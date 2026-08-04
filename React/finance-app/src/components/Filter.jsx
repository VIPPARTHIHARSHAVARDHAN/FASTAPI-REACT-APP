import React from "react";

const Filter = ({ filterType, setFilterType }) => {
    return (
        <div className="mb-3">
            <select
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            >
                <option value="All">All Transactions</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>
        </div>
    );
};

export default Filter;