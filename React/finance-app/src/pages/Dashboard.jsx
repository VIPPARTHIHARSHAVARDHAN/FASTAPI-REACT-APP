import Sidebar from "../components/Sidebar";

function Dashboard() {
    return (
        <>
            <Sidebar />

            <div
                style={{
                    marginLeft: "270px",
                    padding: "30px",
                }}
            >
                <h1>Dashboard</h1>
            </div>
        </>
    );
}

export default Dashboard;