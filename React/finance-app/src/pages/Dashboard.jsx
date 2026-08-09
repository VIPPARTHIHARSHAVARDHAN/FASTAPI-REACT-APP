import React, { useState, useEffect } from "react";

import api from "../api";
import Layout from "../layout/Layout";

import RecentTransactions from "../components/dashboard/RecentTransactions";
import DashboardCards from "../components/dashboard/DashboardCards";
import PieChartCard from "../components/dashboard/PieChartCard";
import BarChartCard from "../components/dashboard/BarChartCard";

import Loader from "../components/common/Loader";


const Dashboard = () => {


    const [loading, setLoading] = useState(true);

    const [transactions, setTransactions] = useState([]);




    const fetchTransactions = async () => {


        try {


            setLoading(true);
            const token = localStorage.getItem("token");


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






    const balance = totalIncome - totalExpense;








    return (

        <Layout>



            <h2 className="mb-4">

                Dashboard

            </h2>





            {

                loading ? (


                    <Loader />


                ) : (


                    <>


                        <DashboardCards


                            totalIncome={totalIncome}


                            totalExpense={totalExpense}


                            balance={balance}


                        />






                        <div className="row mt-4">





                            <div className="col-lg-6">


                                <PieChartCard


                                    totalIncome={totalIncome}


                                    totalExpense={totalExpense}


                                />


                            </div>






                            <div className="col-lg-6">


                                <BarChartCard


                                    transactions={transactions}


                                />


                            </div>





                        </div>







                        <RecentTransactions


                            transactions={transactions}


                        />



                    </>


                )


            }




        </Layout>


    );

};



export default Dashboard;