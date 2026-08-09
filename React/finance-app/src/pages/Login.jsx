import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

import {
    FaWallet,
    FaEnvelope,
    FaLock
} from "react-icons/fa";

import api from "../api";

import { toast } from "react-toastify";


const Login = () => {


    const navigate = useNavigate();



    const [formData, setFormData] = useState({

        email: "",

        password: ""

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



        try {


            setLoading(true);



            const response = await api.post(

                "/login",

                formData

            );



            localStorage.setItem(

                "token",

                response.data.access_token

            );
            
            localStorage.setItem(
            "email",
            formData.email
        );



            toast.success(

                "Login successful!"

            );



            navigate("/");



        } catch(error) {


            toast.error(

                "Invalid email or password"

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
                    Welcome Back 👋
                </h3>



                <p className="auth-subtitle">

                    Login to manage your finances

                </p>









                <form onSubmit={handleSubmit}>


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









                    <button

                        className="auth-button"

                        disabled={loading}

                    >


                        {

                            loading

                            ? "Logging in..."

                            : "Login"

                        }


                    </button>





                </form>








                <p className="auth-footer">


                    Don't have an account?


                    <Link to="/register">

                        Register

                    </Link>


                </p>






            </div>




        </div>


    );


};


export default Login;