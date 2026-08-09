import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Pages

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";


// Protected Route

import ProtectedRoute from "./components/common/ProtectedRoute";



const AppRouter = () => {


    return (

        <BrowserRouter>


            <ToastContainer

                position="top-right"

                autoClose={2500}

                theme="colored"

            />



            <Routes>



                {/* Public Routes */}


                <Route

                    path="/login"

                    element={<Login />}

                />



                <Route

                    path="/register"

                    element={<Register />}

                />








                {/* Protected Routes */}



                <Route

                    path="/"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                />





                <Route

                    path="/transactions"

                    element={

                        <ProtectedRoute>

                            <Transactions />

                        </ProtectedRoute>

                    }

                />







                <Route

                    path="/add-transaction"

                    element={

                        <ProtectedRoute>

                            <AddTransaction />

                        </ProtectedRoute>

                    }

                />







                <Route

                    path="/analytics"

                    element={

                        <ProtectedRoute>

                            <Analytics />

                        </ProtectedRoute>

                    }

                />







                <Route

                    path="/settings"

                    element={

                        <ProtectedRoute>

                            <Settings />

                        </ProtectedRoute>

                    }

                />




            </Routes>



        </BrowserRouter>

    );

};


export default AppRouter;