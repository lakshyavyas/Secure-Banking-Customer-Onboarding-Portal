// import { useNavigate } from "react-router-dom";

// function Dashboard() {

//     const navigate = useNavigate();

//     const username = localStorage.getItem("username");

//     const role = localStorage.getItem("role");

//     const logout = () => {

//         localStorage.clear();

//         navigate("/");

//     };

//     return (

//         <div className="container mt-5">

//             <div className="card shadow">

//                 <div className="card-header bg-dark text-white">

//                     <h3>Admin Dashboard</h3>

//                 </div>

//                 <div className="card-body">

//                     <h5>Welcome, {username}</h5>

//                     <p>Role : {role}</p>

//                     <hr/>

//                     <button
//                         className="btn btn-primary me-3"
//                         onClick={() => navigate("/create-employee")}
//                     >
//                         Create Employee
//                     </button>

//                     <button
//                         className="btn btn-success me-3"
//                         onClick={() => navigate("/employees")}
//                     >
//                         View Employees
//                     </button>

//                     <button
//                         className="btn btn-danger"
//                         onClick={logout}
//                     >
//                         Logout
//                     </button>

//                 </div>

//             </div>

//         </div>

//     );
// }

// export default Dashboard;





import { useNavigate } from "react-router-dom";
import "../../styles/adminDashboard.css";
import GenderChart from "../../pages/admin/GenderChart";
import KycStatusChart from "../../pages/admin/KycStatusChart";
import AccountTypeChart from "../../pages/admin/AccountTypeChart";

function Dashboard() {
  const navigate = useNavigate();

  // Add fallbacks in case localStorage is empty during a weird render cycle
  const username = localStorage.getItem("username") || "Admin";
  const role = localStorage.getItem("role") || "ADMIN";

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
  <div className="admin-page">

    <div className="admin-container">

      {/* Navbar */}

      <div className="admin-navbar">

        <div className="admin-title">
          <h2>Administrator Dashboard</h2>
          <p>Manage employees and monitor the banking portal.</p>
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* Banner */}

      <div className="admin-banner">

        <div className="admin-avatar">
          {username.charAt(0).toUpperCase()}
        </div>

        <div>

          <h2>Welcome back, {username}</h2>

          <span className="admin-role">
            {role}
          </span>

        </div>

      </div>

      <h3 className="section-title">
  Quick Actions
</h3>

<div className="action-grid">

  {/* Create Employee */}

  <div
    className="action-card"
    onClick={() => navigate("/create-employee")}
  >
    <div className="action-icon">
      👤
    </div>

    <h4>Create Employee</h4>

    <p>
      Register a new employee into the banking system.
    </p>

  </div>

  {/* Employee Directory */}

  <div
    className="action-card"
    onClick={() => navigate("/employees")}
  >
    <div className="action-icon">
      👥
    </div>

    <h4>Employee Directory</h4>

    <p>
      View and manage all registered employees.
    </p>

  </div>

  {/* Customers */}

  <div
    className="action-card"
    onClick={() => navigate("/customer")}
  >
    <div className="action-icon">
      🏦
    </div>

    <h4>Customers</h4>

    <p>
      View all registered customers.
    </p>

  </div>

</div>

{/* Analytics */}

<h3 className="section-title mt-5">
  Banking Analytics
</h3>

<div className="analytics-grid">

  <div className="chart-card">
    <GenderChart />
  </div>

  <div className="chart-card">
    <KycStatusChart />
  </div>

  <div className="chart-card chart-wide">
    <AccountTypeChart />
  </div>

</div>
</div>
</div>
  );
}

export default Dashboard;