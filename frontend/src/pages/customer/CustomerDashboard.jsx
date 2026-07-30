// import { Link } from "react-router-dom";

// function CustomerDashboard() {
//   return (
//     <div className="container mt-5">
//       <h2>Customer Dashboard</h2>

//       <hr />

//       <div className="d-grid gap-3 col-4">
//         <Link to="/customer/profile" className="btn btn-primary">
//           Complete Profile
//         </Link>

//         <Link to="/customer/kyc" className="btn btn-success">
//           Submit KYC
//         </Link>

//         <Link to="/customer/accounts" className="btn btn-warning">
//           Open Account
//         </Link>

//         <Link to="/" className="btn btn-danger">
//           Logout
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default CustomerDashboard;


import { useNavigate, Link } from "react-router-dom";
import "../../styles/customerDashboard.css";

function CustomerDashboard() {
  const navigate = useNavigate();

  // Retrieve user info for a personalized greeting
  const username = localStorage.getItem("username") || "Customer";
  
  // Proper logout function to destroy the session token
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
  <div className="dashboard-page">

    {/* Navbar */}

    <nav className="dashboard-navbar">

      <div className="dashboard-logo">
        🏦 Secure Digital Banking
      </div>

      <div className="dashboard-user">

        <span>
          Welcome, <strong>{username}</strong>
        </span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>

    {/* Hero */}

    <section className="hero-banner">

      <h1>
        Welcome Back, {username} 👋
      </h1>

      <p>
        Manage your profile, complete KYC verification,
        and open your bank accounts securely from one place.
      </p>

    </section>

    {/* Service Cards */}

    <section className="service-grid">

      <Link
        to="/customer/profile"
        className="service-card"
      >

        <div className="service-icon profile">
          👤
        </div>

        <h3>Complete Profile</h3>

        <p>
          Update your personal information
          and keep your banking profile current.
        </p>

        <span className="open-link">
          Open →
        </span>

      </Link>

      <Link
        to="/customer/kyc"
        className="service-card"
      >

        <div className="service-icon kyc">
          🛡
        </div>

        <h3>Submit KYC</h3>

        <p>
          Complete identity verification
          to unlock banking services.
        </p>

        <span className="open-link">
          Open →
        </span>

      </Link>

      <Link
        to="/customer/accounts"
        className="service-card"
      >

        <div className="service-icon account">
          💳
        </div>

        <h3>Open Account</h3>

        <p>
          Apply for savings and
          current bank accounts.
        </p>

        <span className="open-link">
          Open →
        </span>

      </Link>

    </section>
  </div>
  );
}

export default CustomerDashboard;