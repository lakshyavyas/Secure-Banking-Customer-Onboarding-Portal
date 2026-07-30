// import { Link } from "react-router-dom";

// function EmployeeDashboard() {
//   return (
//     <div className="container mt-5">
//       <h2>Employee Dashboard</h2>

//       <hr />

//       <div className="d-grid gap-3 col-4">
//         <Link to="/employee/register" className="btn btn-primary">
//           Register Customer
//         </Link>

//         <Link to="/employee/customer" className="btn btn-success">
//           View Customers
//         </Link>
//         <Link to="/employee/pending-kyc" className="btn btn-info">
//           Pending KYC Requests
//         </Link>

//         <Link to="/" className="btn btn-danger">
//           Logout
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default EmployeeDashboard;


import { useNavigate, Link } from "react-router-dom";
import "../../styles/employeeDashboard.css";

function EmployeeDashboard() {
  const navigate = useNavigate();

  // Retrieve user info for a personalized greeting
  const username = localStorage.getItem("username") || "Employee";
  const role = localStorage.getItem("role") || "EMPLOYEE";

  // Proper logout function to destroy the session token
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
  <div className="employee-dashboard-page">

    <div className="employee-dashboard-container">

      {/* Header */}

      <div className="employee-navbar">

        <div>

          <h2>Employee Operations</h2>

          <p>Secure Banking Management Portal</p>

        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* Welcome Banner */}

      <div className="employee-banner">

        <div className="employee-avatar">
          {username.charAt(0).toUpperCase()}
        </div>

        <div>

          <h3>
            Welcome, {username}
          </h3>

          <p>
            Manage customers, KYC verification and account
            approvals securely.
          </p>

          <span className="employee-role">
            {role}
          </span>

        </div>

      </div>

      {/* Quick Actions */}

      <h3 className="section-title">
        Banking Operations
      </h3>

      <div className="employee-grid">

        {/* Register */}

        <Link
          to="/employee/register"
          className="employee-card"
        >

          <div className="employee-icon">
              👤
          </div>

          <h4>
            Register Customer
          </h4>

          <p>
            Create new customer profiles.
          </p>

        </Link>

        {/* Customers */}

        <Link
          to="/employee/customer"
          className="employee-card"
        >

          <div className="employee-icon">
              👥
          </div>

          <h4>
            View Customers
          </h4>

          <p>
            Browse all registered customers.
          </p>

        </Link>

        {/* Pending KYC */}

        <Link
          to="/employee/pending-kyc"
          className="employee-card"
        >

          <div className="employee-icon">
              📄
          </div>

          <h4>
            Pending KYC
          </h4>

          <p>
            Verify customer identity documents.
          </p>

        </Link>

        {/* Pending Accounts */}

        <Link
          to="/employee/pending-accounts"
          className="employee-card"
        >

          <div className="employee-icon">
              🏦
          </div>

          <h4>
            Pending Accounts
          </h4>

          <p>
            Review new account requests.
          </p>

        </Link>

      </div>

    </div>

  </div>
  );
}

export default EmployeeDashboard;