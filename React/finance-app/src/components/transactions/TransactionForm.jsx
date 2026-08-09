import React from "react";
import "./TransactionForm.css";


const TransactionForm = ({
    formData,
    handleInputChange,
    handleFormSubmit,
    editingId,
    submitting
}) => {


    return (

        <div className="form-card">


            <h3>

                {
                    editingId
                    ? "Update Transaction"
                    : "Add Transaction"
                }

            </h3>





            <form onSubmit={handleFormSubmit}>


                <div className="form-grid">





                    <div className="input-group">


                        <label>
                            Amount
                        </label>



                        <input


                            type="number"


                            name="amount"


                            placeholder="Enter amount"


                            value={formData.amount}


                            onChange={handleInputChange}


                            min="1"


                        />


                    </div>









                    <div className="input-group">


                        <label>
                            Category
                        </label>



                        <input


                            type="text"


                            name="category"


                            placeholder="Food, Salary..."


                            value={formData.category}


                            onChange={handleInputChange}


                        />


                    </div>









                    <div className="input-group">


                        <label>
                            Date
                        </label>



                        <input


                            type="date"


                            name="date"


                            value={formData.date}


                            onChange={handleInputChange}


                        />


                    </div>






                </div>









                <div className="input-group">


                    <label>
                        Description
                    </label>



                    <textarea


                        name="description"


                        placeholder="Enter description"


                        value={formData.description}


                        onChange={handleInputChange}


                    />



                </div>









                <div className="income-toggle">



                    <input


                        type="checkbox"


                        id="income"


                        name="is_income"


                        checked={formData.is_income}


                        onChange={handleInputChange}


                    />



                    <label htmlFor="income">


                        Income Transaction


                    </label>



                </div>









                <button


                    className="save-btn"


                    disabled={submitting}



                >



                    {

                        submitting

                        ? (

                            editingId

                            ? "Updating..."

                            : "Adding..."

                        )

                        : (

                            editingId

                            ? "Update Transaction"

                            : "Add Transaction"

                        )

                    }



                </button>







            </form>



        </div>

    );

};


export default TransactionForm;