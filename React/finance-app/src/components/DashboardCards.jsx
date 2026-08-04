import React from "react";

const DashboardCards = ({ totalIncome, totalExpense, balance }) => {
    return (
        <div className="row mb-4">

            <div className="col-md-4">
                <div className="card text-white bg-success">
                    <div className="card-body">
                        <h5>Total Income</h5>
                        <h3>₹ {totalIncome}</h3>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card text-white bg-danger">
                    <div className="card-body">
                        <h5>Total Expense</h5>
                        <h3>₹ {totalExpense}</h3>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card text-white bg-primary">
                    <div className="card-body">
                        <h5>Balance</h5>
                        <h3>₹ {balance}</h3>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardCards;