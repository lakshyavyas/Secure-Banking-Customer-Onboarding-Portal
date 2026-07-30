// import { useState, useEffect } from "react";
// import { getAllCustomers } from "../../api/customerApi";

// function Customer() {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const response = await getAllCustomers();
//       setCustomers(response.data);
//     } catch (err) {
//       console.error("Error fetching customers:", err);
//       setError("Failed to fetch customer list.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return <div className="container mt-5">Loading customers...</div>;
//   if (error)
//     return <div className="container mt-5 alert alert-danger">{error}</div>;

//   return (
//     <div className="container mt-5">
//       <h2>Bank Customers</h2>
//       <table className="table table-bordered table-striped mt-3">
//         <thead className="table-dark">
//           <tr>
//             <th>Customer ID</th>
//             <th>User ID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Mobile</th>
//             <th>DOB</th>
//             <th>Gender</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.length > 0 ? (
//             customers.map((cust) => (
//               <tr key={cust.customerId}>
//                 <td>{cust.customerId}</td>
//                 <td>{cust.userId}</td>
//                 <td>{`${cust.firstName || ""} ${cust.lastName || ""}`}</td>
//                 <td>{cust.email}</td>
//                 <td>{cust.mobile}</td>
//                 <td>{cust.dateOfBirth}</td>
//                 <td>{cust.gender}</td>
//                 <td>
//                   <span
//                     className={`badge ${cust.profileCompleted ? "bg-success" : "bg-warning"}`}
//                   >
//                     {cust.profileCompleted ? "Completed" : "Pending"}
//                   </span>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className="text-center">
//                 No customer profiles found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Customer;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added for back navigation
import { getAllCustomers } from "../../api/customerApi";
import "../../styles/customer.css";

function Customer() {
  const navigate = useNavigate();
  // const [customers, setCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [size] = useState(10);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // useEffect(() => {
  //   fetchCustomers();
  // }, []);

  //Change by Tejas
  useEffect(() => {
    fetchCustomers();
  }, [page, sortOrder, searchKeyword]);

  // const fetchCustomers = async () => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     const response = await getAllCustomers();
  //     setCustomers(response.data);
  //   } catch (err) {
  //     console.error("Error fetching customers:", err);
  //     setError("Failed to fetch customer list.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  {
    /*secod iteration*/
  }
  // const fetchCustomers = async () => {
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const response = await getAllCustomers(page, size);

  //     // setCustomers(response.data.content);
  //     // setTotalPages(response.data.totalPages);
  //     setCustomers(response.data.content);
  //     setTotalPages(response.data.totalPages);
  //     console.log(response.data);
  //   } catch (err) {
  //     console.error("Error fetching customers:", err);
  //     setError("Failed to fetch customer list.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchCustomers = async () => {
    setLoading(true);
    setError("");

    try {
      //Change by Tejsa
      const response = await getAllCustomers(
        searchKeyword,
        page,
        size,
        sortOrder,
      );
      setCustomers(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch customer list.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container" style={{ maxWidth: "1350px" }}>
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          {/* Header */}
          <div className="card-body px-s pt-4 pb-2">
            {/* Header */}

            {/* <div className="d-flex justify-content-between align-items-start mb-5">

            <div>

                <h2
                    className="fw-bold mb-2"
                    style={{
                        color: "#0F4C81",
                        fontSize: "48px"
                    }}
                >
                    Customer Management
                </h2>

                <p
                    className="mb-0"
                    style={{
                        color: "#6B7280",
                        fontSize: "24px"
                    }}
                >
                    Search, view and manage all registered banking customers.
                </p>

            </div>

            <button
                onClick={() => navigate("/employee/dashboard")}
                className="dashboard-btn"
            >
                ← Dashboard
            </button>

        </div> */}

            <div className="customer-header">
              <div>
                <h2>Customer Management</h2>
                <p>Search, view and manage all registered banking customers.</p>
              </div>

              <button
                className="back-btn"
                onClick={() => navigate("/employee/dashboard")}
              >
                ← Dashboard
              </button>
            </div>
          </div>

          {/* Error */}

          {error && <div className="alert alert-danger rounded-4">{error}</div>}

          {/* Search Card */}

          <div className="card border-0 shadow-sm rounded-4 mb-5">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0" style={{ color: "#0F4C81" }}>
                  🔍 Search Customers
                </h5>
              </div>

              <div className="row g-3">
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    placeholder="Search by Name, Email or Mobile..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>

                <div className="col-lg-5">
                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-primary px-4 flex-fill"
                      onClick={() => {
                        setSearchKeyword(keyword);
                        setPage(0);
                      }}
                    >
                      🔍 Search
                    </button>

                    <button
                      className="btn btn-outline-primary px-4 flex-fill"
                      onClick={() =>
                        setSortOrder((prev) =>
                          prev === "desc" ? "asc" : "desc",
                        )
                      }
                    >
                      {sortOrder === "desc" ? "↓ Newest" : "↑ Oldest"}
                    </button>

                    <button
                      className="btn btn-outline-secondary px-4"
                      onClick={() => {
                        setKeyword("");
                        setSearchKeyword("");
                        setPage(0);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="row g-3 mb-4 mx-4">

            <div className="col-md-4">
              <div className="stats-card-small">
                <h4>{customers.length}</h4>
                <span>Customers on this Page</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stats-card-small">
                <h4>{page + 1}</h4>
                <span>Current Page</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stats-card-small">
                <h4>{totalPages}</h4>
                <span>Total Pages</span>
              </div>
            </div>

          </div>

          {/* Customer Table */}

          <div className="table-responsive border rounded-4 mx-4">
            <table className="table table-hover align-middle mb-0">
              <thead
                style={{
                  background: "#0F4C81",
                  color: "#fff",
                }}
              >
                <tr>
                  <th className="py-3">Customer</th>

                  <th>User ID</th>

                  <th>Email</th>

                  <th>Mobile</th>

                  <th>DOB</th>

                  <th>Gender</th>

                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {/* Loading */}

                {loading && (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Empty */}

                {!loading && customers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No customer profiles found.
                    </td>
                  </tr>
                )}

                {/* Customer Rows */}

                {!loading &&
                  customers.map((cust) => {
                    const fullName =
                      `${cust.firstName || ""} ${cust.lastName || ""}`.trim();

                    const initial =
                      fullName.length > 0
                        ? fullName.charAt(0).toUpperCase()
                        : "?";

                    return (
                      <tr key={cust.customerId}>
                        {/* Customer */}

                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                              style={{
                                width: 45,
                                height: 45,
                                background: "#0F4C81",
                                fontSize: "18px",
                              }}
                            >
                              {initial}
                            </div>

                            <div>
                              <div className="fw-semibold">
                                {fullName || "Pending"}
                              </div>

                              <small className="text-muted">
                                Customer #{cust.customerId}
                              </small>
                            </div>
                          </div>
                        </td>

                        {/* User */}

                        <td>{cust.userId}</td>

                        {/* Email */}

                        <td>{cust.email || "-"}</td>

                        {/* Mobile */}

                        <td>{cust.mobile || "-"}</td>

                        {/* DOB */}

                        <td>{cust.dateOfBirth || "-"}</td>

                        {/* Gender */}

                        <td>{cust.gender || "-"}</td>

                        {/* Status */}

                        <td>
                          {cust.profileCompleted ? (
                            <span
                              className="px-3 py-2 rounded-pill fw-semibold"
                              style={{
                                background: "#DCFCE7",
                                color: "#15803D",
                              }}
                            >
                              Completed
                            </span>
                          ) : (
                            <span
                              className="px-3 py-2 rounded-pill fw-semibold"
                              style={{
                                background: "#FEF3C7",
                                color: "#B45309",
                              }}
                            >
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-outline-primary rounded-3 px-4 mx-4 mb-4"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              ◀ Previous
            </button>

            <div
              className="fw-semibold"
              style={{
                color: "#0F4C81",
              }}
            >
              Page {page + 1} of {totalPages}
            </div>

            <button
              className="btn btn-outline-primary rounded-3 px-4 mx-4 mb-4"
              disabled={page === totalPages - 1 || totalPages === 0}
              onClick={() => setPage(page + 1)}
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
