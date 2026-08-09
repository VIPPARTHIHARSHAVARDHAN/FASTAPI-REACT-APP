import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

import {
    FaHome,
    FaWallet,
    FaPlusCircle,
    FaChartBar,
    FaCog,
    FaTimes,
    FaSignOutAlt
} from "react-icons/fa";



const Sidebar = ({ isOpen, closeSidebar }) => {


    const navigate = useNavigate();



    const menuItems = [


        {
            path: "/",
            name: "Dashboard",
            icon: <FaHome />
        },


        {
            path: "/transactions",
            name: "Transactions",
            icon: <FaWallet />
        },


        {
            path: "/add-transaction",
            name: "Add Transaction",
            icon: <FaPlusCircle />
        },


        {
            path: "/analytics",
            name: "Analytics",
            icon: <FaChartBar />
        },


        {
            path: "/settings",
            name: "Settings",
            icon: <FaCog />
        }


    ];






    const handleLogout = () => {


        localStorage.removeItem("token");
        localStorage.removeItem("email");


        navigate("/login");


    };






    return (


        <aside

            className={
                isOpen
                ? "sidebar mobile-open"
                : "sidebar"
            }

        >






            {/* Mobile Close Button */}


            <button

                className="sidebar-close"

                onClick={closeSidebar}

            >

                <FaTimes />

            </button>









            {/* Brand */}


            <div className="brand">


                <img

                    src="/budgeto-logo.png"

                    alt="Budgeto"

                    className="brand-logo"

                />


                <h2>
                    Budgeto
                </h2>


            </div>









            {/* Profile */}


            <div className="profile-card">

    <div className="profile-avatar">
        {
            localStorage.getItem("email")
            ? localStorage.getItem("email")[0].toUpperCase()
            : "U"
        }
    </div>

    <div>

        <h4>
            {
                localStorage.getItem("email")
                ? localStorage.getItem("email").split("@")[0]
                : "User"
            }
        </h4>

        <span>
            Personal Finance
        </span>

    </div>

</div>









            {/* Menu */}


            <nav className="menu">


                {

                    menuItems.map((item)=>(


                        <NavLink


                            key={item.path}


                            to={item.path}


                            onClick={closeSidebar}



                            className={({isActive}) =>

                                isActive

                                ? "menu-link active"

                                : "menu-link"

                            }


                        >



                            <span className="menu-icon">

                                {item.icon}

                            </span>





                            <span>

                                {item.name}

                            </span>




                        </NavLink>



                    ))

                }


            </nav>









            {/* Logout */}


            <button

                className="menu-link logout-btn"

                onClick={handleLogout}

            >


                <span className="menu-icon">

                    <FaSignOutAlt />

                </span>


                <span>

                    Logout

                </span>


            </button>









            {/* Footer */}


            <div className="sidebar-footer">


                <p>
                    © 2026 Budgeto
                </p>


            </div>





        </aside>


    );


};



export default Sidebar;