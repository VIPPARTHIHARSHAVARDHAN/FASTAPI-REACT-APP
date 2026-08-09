import React from "react";
import "./AnalyticsCards.css";
import {
    FaArrowTrendUp,
    FaMoneyBillTrendUp,
    FaPiggyBank,
    FaChartLine
} from "react-icons/fa6";


const AnalyticsCards = ({
    totalIncome,
    totalExpense,
    savings,
    savingsPercentage
}) => {


    const cards = [

    {
        title: "Total Income",
        value: `₹ ${Number(totalIncome).toLocaleString("en-IN")}`,
        icon: <FaArrowTrendUp />,
        className: "income-card"
    },

    {
        title: "Total Expense",
        value: `₹ ${Number(totalExpense).toLocaleString("en-IN")}`,
        icon: <FaMoneyBillTrendUp />,
        className: "expense-card"
    },

    {
        title: "Savings",
        value: `₹ ${Number(savings).toLocaleString("en-IN")}`,
        icon: <FaPiggyBank />,
        className: "saving-card"
    },

    {
        title: "Savings %",
        value: `${savingsPercentage}%`,
        icon: <FaChartLine />,
        className: "percentage-card"
    }

];



    return (

        <div className="analytics-cards">


            {
                cards.map((card,index)=>(

                    <div
                        key={index}
                        className={`analytics-card ${card.className}`}
                    >


                        <div className="analytics-icon">

                            {card.icon}

                        </div>


                        <div>

                            <p>
                                {card.title}
                            </p>


                            <h3>
                                {card.value}
                            </h3>

                        </div>


                    </div>

                ))
            }


        </div>

    );

};


export default AnalyticsCards;