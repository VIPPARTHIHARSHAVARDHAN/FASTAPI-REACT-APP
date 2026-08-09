import React from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import "./ChartCards.css";


const PieChartCard = ({
    totalIncome,
    totalExpense
}) => {


    const data = [

        {
            name: "Income",
            value: totalIncome
        },

        {
            name: "Expense",
            value: totalExpense
        }

    ];



    const COLORS = [

        "#10b981",
        "#ef4444"

    ];



    return (

        <div className="chart-card">


            <div className="chart-title">

                <h4>
                    Income vs Expense
                </h4>


                <p>
                    Financial Overview
                </p>

            </div>



            <div className="chart-container">


                <ResponsiveContainer>


                    <PieChart>


                        <Pie

                            data={data}

                            dataKey="value"

                            nameKey="name"

                            cx="50%"

                            cy="50%"

                            outerRadius={110}

                            innerRadius={55}

                            paddingAngle={5}

                        >

                            {
                                data.map((entry,index)=>(

                                    <Cell

                                        key={index}

                                        fill={COLORS[index]}

                                    />

                                ))
                            }


                        </Pie>



                        <Tooltip />


                        <Legend />



                    </PieChart>


                </ResponsiveContainer>


            </div>



        </div>

    );

};


export default PieChartCard;