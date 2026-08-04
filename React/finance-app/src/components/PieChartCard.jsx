import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#16A34A", "#DC2626"];

const PieChartCard = ({ totalIncome, totalExpense }) => {

    const pieData = [
        {
            name: "Income",
            value: totalIncome,
        },
        {
            name: "Expense",
            value: totalExpense,
        },
    ];

    return (
        <div className="card mt-4 mb-4">
            <div className="card-body">

                <h3 className="text-center mb-4">
                    Financial Analytics
                </h3>

                <div style={{ width: "100%", height: 350 }}>

                    <ResponsiveContainer>

                        <PieChart>

                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>
        </div>
    );
};

export default PieChartCard;