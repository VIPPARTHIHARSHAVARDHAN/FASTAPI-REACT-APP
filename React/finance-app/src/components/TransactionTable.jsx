import React from "react";

const TransactionTable = ({
    filteredTransactions,
    editTransaction,
    setDeleteId,
}) => {
    return (
        <>
            <h3>Transactions</h3>

            <table className="table table-striped table-bordered mt-3">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Income</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {filteredTransactions.map((transaction) => (

                        <tr key={transaction.id}>

                            <td>{transaction.id}</td>

                            <td>
                                ₹ {Number(transaction.amount).toLocaleString("en-IN")}
                            </td>

                            <td>{transaction.category}</td>

                            <td>{transaction.description}</td>

                            <td>
                                {transaction.is_income ? "Yes" : "No"}
                            </td>

                            <td>{transaction.date}</td>

                            <td>

                                <button
                                    type="button"
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editTransaction(transaction)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteModal"
                                    onClick={() => setDeleteId(transaction.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
        </>
    );
};

export default TransactionTable;