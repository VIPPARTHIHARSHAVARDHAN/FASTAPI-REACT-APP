import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

import {
    FaWallet,
    FaUser,
    FaEnvelope,
    FaLock,
    FaRocket
} from "react-icons/fa";

import api from "../api";

import { toast } from "react-toastify";


const Register = () => {


    const navigate = useNavigate();



    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",

        confirmPassword: ""

    });




    const [loading, setLoading] = useState(false);






    const handleChange = (e) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };









    const handleSubmit = async (e) => {


        e.preventDefault();




        if(formData.password !== formData.confirmPassword){


            toast.error(
                "Passwords do not match"
            );


            return;

        }






        try {


            setLoading(true);




            await api.post(

                "/register",

                {

                    name: formData.name,

                    email: formData.email,

                    password: formData.password

                }

            );




            toast.success(

                "Registration successful!"

            );




            navigate("/login");





        } catch(error) {



            toast.error(

                "Registration failed!"

            );


            console.log(error);


        }

        finally {


            setLoading(false);


        }



    };









    return (


        <div className="auth-container">


            <div className="auth-card">






                <div className="auth-logo">


                    <FaWallet />


                    <h2>
                        Budgeto
                    </h2>


                </div>







                <h3>

                    Create Account <FaRocket />

                </h3>




                <p className="auth-subtitle">

                    Start managing your finances

                </p>









                <form onSubmit={handleSubmit}>





                    <div className="auth-input">


                        <FaUser />


                        <input

                            type="text"

                            name="name"

                            placeholder="Full Name"

                            value={formData.name}

                            onChange={handleChange}

                        />


                    </div>










                    <div className="auth-input">


                        <FaEnvelope />


                        <input

                            type="email"

                            name="email"

                            placeholder="Email"

                            value={formData.email}

                            onChange={handleChange}

                        />


                    </div>










                    <div className="auth-input">


                        <FaLock />


                        <input

                            type="password"

                            name="password"

                            placeholder="Password"

                            value={formData.password}

                            onChange={handleChange}

                        />


                    </div>










                    <div className="auth-input">


                        <FaLock />


                        <input

                            type="password"

                            name="confirmPassword"

                            placeholder="Confirm Password"

                            value={formData.confirmPassword}

                            onChange={handleChange}

                        />


                    </div>









                    <button

                        className="auth-button"

                        disabled={loading}

                    >


                        {

                            loading

                            ? "Creating Account..."

                            : "Create Account"

                        }


                    </button>






                </form>









                <p className="auth-footer">


                    Already have an account?



                    <Link to="/login">

                        Login

                    </Link>


                </p>







            </div>




        </div>


    );


};


export default Register;