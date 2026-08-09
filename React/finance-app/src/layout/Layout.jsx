import React, { useState } from "react";

import Sidebar from "../components/common/Sidebar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaBars } from "react-icons/fa";
import "./Layout.css";



const Layout = ({ children }) => {


    const [sidebarOpen, setSidebarOpen] = useState(false);




    const openSidebar = () => {

        setSidebarOpen(true);

    };




    const closeSidebar = () => {

        setSidebarOpen(false);

    };





    return (


        <div className="app-layout">






            <ToastContainer

                position="top-right"

                autoClose={2500}

                theme="colored"

            />






            <Sidebar

                isOpen={sidebarOpen}

                closeSidebar={closeSidebar}

            />







            {
                sidebarOpen && (

                    <div

                        className="sidebar-overlay"

                        onClick={closeSidebar}

                    ></div>

                )
            }








            <div className="main-content">





                <button

                    className="mobile-menu-btn"

                    onClick={openSidebar}

                >

                    <FaBars />

                </button>





                {children}





            </div>





        </div>


    );

};



export default Layout;