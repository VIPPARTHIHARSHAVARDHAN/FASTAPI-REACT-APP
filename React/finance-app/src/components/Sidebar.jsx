import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">

            <h2 className="logo">Budgeto</h2>

            <div className="profile">

                <div className="profile-image"></div>

                <h4>Harsha</h4>

            </div>

            <nav>

                <Link to="/">🏠 Dashboard</Link>

                <Link to="/transactions">💰 Transactions</Link>

                <Link to="/add-transaction">➕ Add Transaction</Link>

                <Link to="/analytics">📊 Analytics</Link>

                <Link to="/settings">⚙️ Settings</Link>

            </nav>

        </div>
    );
}

export default Sidebar;