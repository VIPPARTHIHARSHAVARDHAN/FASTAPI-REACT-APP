import React, { useState, useEffect } from "react";

import api from "../api";
import Layout from "../layout/Layout";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import SearchBar from "../components/transactions/SearchBar";
import Filter from "../components/transactions/Filter";
import TransactionTable from "../components/transactions/TransactionTable";
import DeleteModal from "../components/transactions/DeleteModal";
import Loader from "../components/common/Loader";


const Transactions = () => {


    const [loading, setLoading] = useState(true);


    const [transactions, setTransactions] = useState([]);


    const [searchTerm, setSearchTerm] = useState("");


    const [filterType, setFilterType] = useState("All");


    const [deleteId, setDeleteId] = useState(null);



    const navigate = useNavigate();





    const fetchTransactions = async () => {


        try {


            setLoading(true);


            const token = localStorage.getItem("token");



            const response = await api.get(

                "/transactions/",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );



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









    const deleteTransaction = async () => {


        try {



            const token = localStorage.getItem("token");



            await api.delete(

                `/transactions/${deleteId}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );





            toast.success(

                "Transaction deleted successfully!"

            );



            fetchTransactions();



            setDeleteId(null);




        } catch(error) {



            toast.error(

                "Failed to delete transaction"

            );



            console.log(error);



        }


    };









    const editTransaction = (transaction) => {



        navigate(

            "/add-transaction",

            {

                state: {

                    transaction: transaction

                }

            }

        );


    };









    const filteredTransactions = transactions.filter(

        (transaction) => {



            const matchesSearch =

                transaction.category

                .toLowerCase()

                .includes(

                    searchTerm.toLowerCase()

                )

                ||

                transaction.description

                .toLowerCase()

                .includes(

                    searchTerm.toLowerCase()

                );





            const matchesFilter =

                filterType === "All"

                ||

                (

                    filterType === "Income"

                    &&

                    transaction.is_income

                )

                ||

                (

                    filterType === "Expense"

                    &&

                    !transaction.is_income

                );





            return matchesSearch && matchesFilter;



        }

    );









    return (



        <Layout>



            <h2 className="mb-4">

                Transactions

            </h2>





            <SearchBar


                searchTerm={searchTerm}


                setSearchTerm={setSearchTerm}


            />





            <Filter


                filterType={filterType}


                setFilterType={setFilterType}


            />







            {

                loading ? (


                    <Loader />


                ) : (



                    <TransactionTable


                        filteredTransactions={filteredTransactions}


                        editTransaction={editTransaction}


                        setDeleteId={setDeleteId}


                    />


                )

            }





            <DeleteModal


                deleteTransaction={deleteTransaction}


            />




        </Layout>


    );


};


export default Transactions;