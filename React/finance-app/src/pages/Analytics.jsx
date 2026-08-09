import React, { useState, useEffect } from "react";

import api from "../api";
import Layout from "../layout/Layout";

import AnalyticsCards from "../components/analytics/AnalyticsCards";
import CategoryExpenseChart from "../components/analytics/CategoryExpenseChart";
import MonthlyBarChart from "../components/analytics/MonthlyBarChart";

import Loader from "../components/common/Loader";



const Analytics = () => {


    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);





    const fetchTransactions = async () => {


        try {


            setLoading(true);


            const response = await api.get("/transactions/");


            setTransactions(response.data);



        } catch(error) {


            console.log(error);



        } finally {


            setLoading(false);


        }


    };







    useEffect(() => {


        fetchTransactions();


    }, []);








    const totalIncome = transactions

        .filter(
            (transaction) => transaction.is_income
        )

        .reduce(

            (sum, transaction) =>
                sum + Number(transaction.amount),

            0

        );







    const totalExpense = transactions

        .filter(
            (transaction) => !transaction.is_income
        )

        .reduce(

            (sum, transaction) =>
                sum + Number(transaction.amount),

            0

        );








    const savings = totalIncome - totalExpense;







    const savingsPercentage =

        totalIncome > 0

        ? ((savings / totalIncome) * 100).toFixed(1)

        : 0;









    return (


        <Layout>



            <h2 className="mb-4">

                Analytics

            </h2>





            {


                loading ? (


                    <Loader />



                ) : (



                    <>



                        <h5>

                            Total Transactions: {transactions.length}

                        </h5>







                        <AnalyticsCards



                            totalIncome={totalIncome}



                            totalExpense={totalExpense}



                            savings={savings}



                            savingsPercentage={savingsPercentage}



                        />









                        <div className="row mt-4">





                            <div className="col-lg-6">



                                <CategoryExpenseChart


                                    transactions={transactions}


                                />



                            </div>









                            <div className="col-lg-6">



                                <MonthlyBarChart


                                    transactions={transactions}


                                />



                            </div>






                        </div>





                    </>



                )


            }




        </Layout>


    );

};


export default Analytics;