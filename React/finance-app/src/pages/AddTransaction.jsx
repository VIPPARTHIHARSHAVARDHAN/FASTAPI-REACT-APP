import React, { useState } from "react";
import api from "../api";
import Layout from "../layout/Layout";
import { toast } from "react-toastify";

import TransactionForm from "../components/transactions/TransactionForm";
import { useLocation } from "react-router-dom";


const AddTransaction = () => {


    const location = useLocation();

    const editData = location.state?.transaction;



    const [submitting, setSubmitting] = useState(false);



    const [formData, setFormData] = useState({

        amount: editData ? editData.amount : "",

        category: editData ? editData.category : "",

        description: editData ? editData.description : "",

        is_income: editData ? editData.is_income : false,

        date: editData ? editData.date : ""

    });





    const handleInputChange = (event) => {


        const value =

            event.target.type === "checkbox"

            ? event.target.checked

            : event.target.value;



        setFormData({

            ...formData,

            [event.target.name]: value,

        });


    };







    // Form Validation

    const validateForm = () => {



        if (!formData.amount) {


            toast.error(
                "Please enter amount"
            );


            return false;

        }





        if (Number(formData.amount) <= 0) {


            toast.error(
                "Amount must be greater than 0"
            );


            return false;

        }







        if (!formData.category) {


            toast.error(
                "Please select category"
            );


            return false;

        }







        if (!formData.date) {


            toast.error(
                "Please select date"
            );


            return false;

        }





        return true;


    };









    const handleFormSubmit = async (event) => {

    event.preventDefault();


    if (!validateForm()) {

        return;

    }


    try {

        setSubmitting(true);


        const token = localStorage.getItem("token");


        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };



        if (editData) {


            await api.put(

                `/transactions/${editData.id}`,

                formData,

                config

            );


            toast.success(
                "Transaction updated successfully!"
            );


        } else {


            await api.post(

                "/transactions/",

                formData,

                config

            );


            toast.success(
                "Transaction added successfully!"
            );

        }



        setFormData({

            amount: "",

            category: "",

            description: "",

            is_income: false,

            date: ""

        });



    } catch (error) {


        toast.error(
            "Transaction failed!"
        );


        console.log(error);


    } finally {


        setSubmitting(false);


    }

};








    return (


        <Layout>




            <TransactionForm



                formData={formData}



                handleInputChange={handleInputChange}



                handleFormSubmit={handleFormSubmit}



                editingId={editData ? editData.id : null}



                submitting={submitting}



            />





        </Layout>


    );


};



export default AddTransaction;