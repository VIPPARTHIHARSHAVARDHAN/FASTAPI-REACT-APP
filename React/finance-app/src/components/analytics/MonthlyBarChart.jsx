import React from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import "./AnalyticsChart.css";


const MonthlyBarChart = ({ transactions = [] }) => {


    const monthlyData = {};


    transactions.forEach((transaction) => {


        const month = new Date(transaction.date)
            .toLocaleString("default", {
                month: "short",
            });



        if (!monthlyData[month]) {


            monthlyData[month] = {

                month: month,

                income: 0,

                expense: 0,

            };

        }



        if (transaction.is_income) {


            monthlyData[month].income += Number(transaction.amount);


        } else {


            monthlyData[month].expense += Number(transaction.amount);


        }


    });



    const chartData = Object.values(monthlyData);



    return (


        <div className="analytics-chart-card">


            <div className="chart-heading">


                <h4>
                    Monthly Income vs Expense
                </h4>


                <p>
                    Monthly financial comparison
                </p>


            </div>



            <div className="analytics-chart-container">


                {

                    chartData.length > 0 ? (


                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >


                            <BarChart

                                data={chartData}

                                barGap={8}

                            >



                                <CartesianGrid

                                    strokeDasharray="3 3"

                                />



                                <XAxis

                                    dataKey="month"

                                />



                                <YAxis />



                                <Tooltip

                                    formatter={(value)=>(
                                        `₹ ${Number(value).toLocaleString("en-IN")}`
                                    )}

                                />



                                <Legend />




                                <Bar

                                    dataKey="income"

                                    name="Income"

                                    fill="#10b981"

                                    radius={[8,8,0,0]}

                                />




                                <Bar

                                    dataKey="expense"

                                    name="Expense"

                                    fill="#ef4444"

                                    radius={[8,8,0,0]}

                                />



                            </BarChart>


                        </ResponsiveContainer>


                    ) : (


                        <div className="empty-chart">

                            No monthly data available

                        </div>


                    )


                }



            </div>


        </div>


    );

};


export default MonthlyBarChart;