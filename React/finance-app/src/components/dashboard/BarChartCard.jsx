import React from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import "./ChartCards.css";


const BarChartCard = ({ transactions }) => {


    const expenseData = transactions
        .filter((transaction) => !transaction.is_income)
        .reduce((acc, transaction) => {


            const existing = acc.find(
                (item) => item.category === transaction.category
            );


            if (existing) {

                existing.amount += Number(transaction.amount);

            } else {

                acc.push({

                    category: transaction.category,

                    amount: Number(transaction.amount),

                });

            }


            return acc;


        }, []);



    return (

        <div className="chart-card">


            <div className="chart-title">


                <h4>
                    Category Wise Expenses
                </h4>


                <p>
                    Spending by category
                </p>


            </div>




            <div className="chart-container">


                {
                    expenseData.length > 0 ? (

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >


                            <BarChart

                                data={expenseData}

                                barGap={8}

                            >


                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />



                                <XAxis

                                    dataKey="category"

                                />



                                <YAxis />



                                <Tooltip

                                    formatter={(value)=>(
                                        `₹ ${Number(value).toLocaleString("en-IN")}`
                                    )}

                                />




                                <Bar

                                    dataKey="amount"

                                    name="Expense"

                                    fill="#2563eb"

                                    radius={[8,8,0,0]}

                                />



                            </BarChart>


                        </ResponsiveContainer>


                    ) : (

                        <div className="empty-chart">

                            No expense data available

                        </div>

                    )

                }


            </div>


        </div>

    );

};


export default BarChartCard;