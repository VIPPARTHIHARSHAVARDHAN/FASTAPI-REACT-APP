import React from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import "./AnalyticsChart.css";


const COLORS = [

    "#2563EB",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#14B8A6",

];



const CategoryExpenseChart = ({ transactions = [] }) => {


    const categoryData = {};



    transactions

        .filter((transaction) => !transaction.is_income)

        .forEach((transaction) => {


            if (categoryData[transaction.category]) {


                categoryData[transaction.category] += Number(transaction.amount);


            } else {


                categoryData[transaction.category] =
                    Number(transaction.amount);


            }


        });




    const pieData = Object.keys(categoryData).map((category) => ({

        name: category,

        value: categoryData[category],

    }));




    return (


        <div className="chart-card">


            <div className="chart-title">


                <h4>
                    Expense by Category
                </h4>


                <p>
                    Spending distribution
                </p>


            </div>




            <div className="chart-container">


                {

                    pieData.length > 0 ? (


                        <ResponsiveContainer

                            width="100%"

                            height="100%"

                        >


                            <PieChart>



                                <Pie


                                    data={pieData}


                                    dataKey="value"


                                    nameKey="name"


                                    cx="50%"


                                    cy="50%"


                                    innerRadius={60}


                                    outerRadius={120}


                                    paddingAngle={5}


                                >



                                    {

                                        pieData.map((entry,index)=>(


                                            <Cell

                                                key={index}

                                                fill={
                                                    COLORS[index % COLORS.length]
                                                }

                                            />


                                        ))

                                    }



                                </Pie>




                                <Tooltip

                                    formatter={(value)=>(

                                        `₹ ${Number(value).toLocaleString("en-IN")}`

                                    )}

                                />



                                <Legend

                                    verticalAlign="bottom"

                                    height={36}

                                />



                            </PieChart>



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


export default CategoryExpenseChart;