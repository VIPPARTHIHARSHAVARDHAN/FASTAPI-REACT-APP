import React from "react";
import "./DashboardCards.css";
import {
    FaWallet,
    FaArrowTrendUp,
    FaPiggyBank
} from "react-icons/fa6";


const DashboardCards = ({
    totalIncome,
    totalExpense,
    balance
}) => {


    const cards = [

    {
        title: "Total Income",
        value: totalIncome,
        icon: <FaArrowTrendUp />,
        className: "income-card"
    },

    {
        title: "Total Expense",
        value: totalExpense,
        icon: <FaWallet />,
        className: "expense-card"
    },

    {
        title: "Balance",
        value: balance,
        icon: <FaPiggyBank />,
        className: "balance-card"
    }

];



    return (

        <div className="dashboard-cards">


            {
                cards.map((card,index)=>(

                    <div
                        key={index}
                        className={`dashboard-card ${card.className}`}
                    >


                        <div className="dashboard-icon">

                            {card.icon}

                        </div>



                        <div>

                            <p>
                                {card.title}
                            </p>


                            <h3>
                                ₹ {Number(card.value).toLocaleString("en-IN")}
                            </h3>


                        </div>


                    </div>

                ))
            }


        </div>

    );

};


export default DashboardCards;