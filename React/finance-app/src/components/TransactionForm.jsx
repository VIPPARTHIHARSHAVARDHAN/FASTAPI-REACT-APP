import React from "react";

const TransactionForm = ({
    formData,
    handleInputChange,
    handleFormSubmit,
    editingId,
}) => {
    return (
        <form onSubmit={handleFormSubmit}>

            <h3 className="mb-4">Add Transaction</h3>

            <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                    Amount
                </label>

                <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="category" className="form-label">
                    Category
                </label>

                <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>

                <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="is_income"
                    name="is_income"
                    checked={formData.is_income}
                    onChange={handleInputChange}
                />

                <label
                    className="form-check-label"
                    htmlFor="is_income"
                >
                    Income
                </label>
            </div>

            <div className="mb-3">
                <label htmlFor="date" className="form-label">
                    Date
                </label>

                <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary"
            >
                {editingId
                    ? "Update Transaction"
                    : "Add Transaction"}
            </button>

            <hr className="my-5" />

        </form>
    );
};

export default TransactionForm;