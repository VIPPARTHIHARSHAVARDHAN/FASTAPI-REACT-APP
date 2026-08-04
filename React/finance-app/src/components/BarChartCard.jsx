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

const BarChartCard = ({ transactions }) => {

    const expenseData = transactions
        .filter((transaction) => !transaction.is_income)
        .reduce((acc, transaction) => {

            const existing = acc.find(
                (item) => item.category === transaction.category
            );

            if (existing) {
                existing.amount += transaction.amount;
            } else {
                acc.push({
                    category: transaction.category,
                    amount: transaction.amount,
                });
            }

            return acc;

        }, []);

    return (
        <div className="card mt-4 mb-4 shadow">
            <div className="card-body">

                <h3 className="text-center mb-4">
                    Category Wise Expenses
                </h3>

                <div style={{ width: "100%", height: 350 }}>

                    <ResponsiveContainer>

                        <BarChart data={expenseData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="category" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="amount"
                                fill="#0d6efd"
                                radius={[8, 8, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>
        </div>
    );
};

export default BarChartCard;