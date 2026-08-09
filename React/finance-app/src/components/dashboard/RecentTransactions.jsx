import React from "react";
import { Link } from "react-router-dom";
import "./RecentTransactions.css";
import {
    FaBurger,
    FaPlane,
    FaCartShopping,
    FaBriefcase,
    FaHospital,
    FaBook,
    FaMoneyBill
} from "react-icons/fa6";


const RecentTransactions = ({ transactions }) => {


    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);



    const getIcon = (category) => {

    const icons = {

        Food: <FaBurger />,

        Travel: <FaPlane />,

        Shopping: <FaCartShopping />,

        Salary: <FaBriefcase />,

        Health: <FaHospital />,

        Education: <FaBook />

    };


    return icons[category] || <FaMoneyBill />;

};



    return (

        <div className="recent-card">


            <div className="recent-header">


                <h4>
                    Recent Transactions
                </h4>


                <Link
                    to="/transactions"
                    className="view-btn"
                >
                    View All
                </Link>


            </div>




            {
                recentTransactions.length === 0 ? (

                    <div className="empty-state">
                        No transactions available
                    </div>

                ) : (


                    recentTransactions.map((transaction) => (


                        <div
                            className="recent-item"
                            key={transaction.id}
                        >


                            <div className="transaction-info">


                                <div className="transaction-icon">

                                    {getIcon(transaction.category)}

                                </div>



                                <div>

                                    <h5>
                                        {transaction.category}
                                    </h5>


                                    <p>
                                        {transaction.date}
                                    </p>

                                </div>


                            </div>





                            <div className="transaction-details">


                                <h5

                                    className={
                                        transaction.is_income
                                        ? "transaction-income"
                                        : "transaction-expense"
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

                                </h5>



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


                            </div>


                        </div>


                    ))

                )

            }


        </div>

    );

};


export default RecentTransactions;