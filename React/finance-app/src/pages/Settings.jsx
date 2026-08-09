import React, { useState } from "react";
import Layout from "../layout/Layout";
import "./Settings.css";

import {
    FaUser,
    FaPalette,
    FaRocket,
    FaGear
} from "react-icons/fa6";


const Settings = () => {


    const [currency, setCurrency] = useState("INR");

    const [theme, setTheme] = useState("Light");



    return (

        <Layout>


            <div className="settings-page">



                {/* Page Header */}

                <h2 className="settings-heading">

                    <FaGear />

                    Settings

                </h2>





                <div className="settings-grid">





                    {/* Profile Section */}


                    <div className="settings-card">


                        <div className="settings-title">


                            <span>

                                <FaUser />

                            </span>


                            <h4>
                                Profile
                            </h4>


                        </div>





                        <div className="profile-box">


                            <div className="profile-avatar-large">

                                H

                            </div>




                            <div>


                                <h3>
                                    Harsha
                                </h3>


                                <p>
                                    harsha@example.com
                                </p>


                            </div>



                        </div>






                        <div className="info-row">


                            <span>
                                Name
                            </span>


                            <strong>
                                Harsha
                            </strong>


                        </div>






                        <div className="info-row">


                            <span>
                                Email
                            </span>


                            <strong>
                                harsha@example.com
                            </strong>


                        </div>



                    </div>








                    {/* Preferences Section */}



                    <div className="settings-card">



                        <div className="settings-title">


                            <span>

                                <FaPalette />

                            </span>


                            <h4>
                                Preferences
                            </h4>


                        </div>






                        <label>
                            Currency
                        </label>



                        <select

                            value={currency}

                            onChange={(e)=>setCurrency(e.target.value)}

                        >


                            <option value="INR">
                                ₹ INR
                            </option>


                            <option value="USD">
                                $ USD
                            </option>


                            <option value="EURO">
                                € EURO
                            </option>



                        </select>








                        <label>
                            Theme
                        </label>



                        <select

                            value={theme}

                            onChange={(e)=>setTheme(e.target.value)}

                        >



                            <option>
                                Light
                            </option>


                            <option>
                                Dark
                            </option>



                        </select>





                    </div>




                </div>









                {/* About Section */}



                <div className="about-card">


                    <h4 className="about-title">


                        <FaRocket />


                        About Budgeto


                    </h4>





                    <p>

                        Budgeto is a personal finance
                        management application that helps
                        users track income, expenses and
                        financial insights.

                    </p>





                    <p>

                        Built using React.js, FastAPI and SQL.

                    </p>





                </div>






            </div>




        </Layout>

    );

};


export default Settings;