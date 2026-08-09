import React from "react";
import "./TransactionTable.css";


const TransactionTable = ({
    filteredTransactions,
    editTransaction,
    setDeleteId,
}) => {


    return (

        <div className="transaction-table-card">


            <div className="table-header">

                <h3>
                    Transactions
                </h3>

                <span>
                    {filteredTransactions.length} Records
                </span>

            </div>




            <div className="table-responsive">


                <table className="transaction-table">


                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Actions</th>

                        </tr>

                    </thead>




                    <tbody>


                    {
                        filteredTransactions.length > 0 ? (


                            filteredTransactions.map((transaction)=>(


                                <tr key={transaction.id}>


                                    <td>
                                        #{transaction.id}
                                    </td>



                                    <td className="category-cell">

                                         {transaction.category}

                                    </td>



                                    <td>

                                        {transaction.description}

                                    </td>




                                    <td

                                        className={
                                            transaction.is_income
                                            ? "amount-income"
                                            : "amount-expense"
                                        }

                                    >

                                        {
                                            transaction.is_income
                                            ? "+"
                                            : "-"
                                        }

                                        ₹
                                        {
                                            Number(transaction.amount)
                                            .toLocaleString("en-IN")
                                        }

                                    </td>




                                    <td>


                                        <span

                                            className={
                                                transaction.is_income
                                                ? "income-badge"
                                                : "expense-badge"
                                            }

                                        >

                                            {
                                                transaction.is_income
                                                ? "Income"
                                                : "Expense"
                                            }


                                        </span>


                                    </td>




                                    <td>

                                        {transaction.date}

                                    </td>




                                    <td>


                                        <button

                                            className="edit-btn"

                                            onClick={() =>
                                                editTransaction(transaction)
                                            }

                                        >

                                            Edit

                                        </button>



                                        <button

                                            className="delete-btn"

                                            data-bs-toggle="modal"

                                            data-bs-target="#deleteModal"

                                            onClick={() =>
                                                setDeleteId(transaction.id)
                                            }

                                        >

                                            Delete

                                        </button>


                                    </td>


                                </tr>


                            ))


                        ) : (


                            <tr>

                                <td

                                    colSpan="7"

                                    className="empty-row"

                                >

                                    No Transactions Found


                                </td>


                            </tr>


                        )


                    }


                    </tbody>


                </table>


            </div>


        </div>

    );

};


export default TransactionTable;