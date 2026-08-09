import React, { useState, useEffect } from "react";
import api from "./api";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PieChartCard from "./components/dashboard/PieChartCard";
import BarChartCard from "./components/dashboard/BarChartCard";
import DashboardCards from "./components/dashboard/DashboardCards";
import SearchBar from "./components/transactions/SearchBar";
import Filter from "./components/transactions/Filter";
import TransactionForm from "./components/transactions/TransactionForm";
import TransactionTable from "./components/transactions/TransactionTable";
import DeleteModal from "./components/transactions/DeleteModal";
import Navbar from "./components/Navbar";


const App = () => {

    const [transactions, setTransactions] = useState([]);

    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        description: "",
        is_income: false,
        date: ""
    });

    const fetchTransactions = async () => {
        const response = await api.get("/transactions/");
        setTransactions(response.data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

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

    const handleFormSubmit = async (event) => {
        event.preventDefault();

       if (editingId) {
    await api.put(`/transactions/${editingId}`, formData);
    toast.success("Transaction updated successfully!");
} else {
    await api.post("/transactions/", formData);
    toast.success("Transaction added successfully!");
}

        fetchTransactions();

        setFormData({
            amount: "",
            category: "",
            description: "",
            is_income: false,
            date: "",
        });
        setEditingId(null);
    };
    const [editingId, setEditingId] = useState(null);
   const deleteTransaction = async () => {

    await api.delete(`/transactions/${deleteId}`);

    toast.success("Transaction deleted successfully!");

    fetchTransactions();

    setDeleteId(null);

};
const editTransaction = (transaction) => {
  setEditingId(transaction.id);

setFormData({
    amount: transaction.amount,
    category: transaction.category,
    description: transaction.description,
    is_income: transaction.is_income,
    date: transaction.date,
});

};

const totalIncome = transactions
    .filter((transaction) => transaction.is_income)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

const totalExpense = transactions
    .filter((transaction) => !transaction.is_income)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

const balance = totalIncome - totalExpense;

const [searchTerm, setSearchTerm] = useState("");
const [filterType, setFilterType] = useState("All");
const [deleteId, setDeleteId] = useState(null);


const filteredTransactions = transactions.filter((transaction) => {

    const matchesSearch =
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
        filterType === "All" ||
        (filterType === "Income" && transaction.is_income) ||
        (filterType === "Expense" && !transaction.is_income);

    return matchesSearch && matchesFilter;
});


    return (
      
        <div>
          <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick
    pauseOnHover
    theme="colored"
/>
            <Navbar />
            <div className="container mt-4">
              <div className="card">
                <div className="card-body">
                  <div className="row mb-4">

<DashboardCards
    totalIncome={totalIncome}
    totalExpense={totalExpense}
    balance={balance}
/>
</div>
<PieChartCard
    totalIncome={totalIncome}
    totalExpense={totalExpense}
/>
<BarChartCard
    transactions={transactions}
/>
<SearchBar
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
/>
<Filter
    filterType={filterType}
    setFilterType={setFilterType}
/>
                  <TransactionForm
    formData={formData}
    handleInputChange={handleInputChange}
    handleFormSubmit={handleFormSubmit}
    editingId={editingId}
/>
<TransactionTable
    filteredTransactions={filteredTransactions}
    editTransaction={editTransaction}
    setDeleteId={setDeleteId}
/>
<DeleteModal
    deleteTransaction={deleteTransaction}
/>

            

        </div>

    </div>

        </div>
        </div>
    )
}

export default App;