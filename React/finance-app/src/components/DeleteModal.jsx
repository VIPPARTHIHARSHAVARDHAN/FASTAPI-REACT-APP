import React from "react";

const DeleteModal = ({ deleteTransaction }) => {
    return (
        <div
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
        >
            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Delete Transaction
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>

                    </div>

                    <div className="modal-body">
                        Are you sure you want to delete this transaction?
                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={deleteTransaction}
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default DeleteModal;