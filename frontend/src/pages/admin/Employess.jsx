// import { useEffect, useState } from "react";
// import {
//     getEmployees,
//     enableEmployee,
//     disableEmployee,
// } from "../../api/adminApi";

// function Employees() {

//     const [employees, setEmployees] = useState([]);

//     useEffect(() => {
//         loadEmployees();
//     }, []);

//     const loadEmployees = async () => {

//         try {

//             const response = await getEmployees();

//             setEmployees(response.data);

//         } catch (error) {

//             console.log(error);

//             alert("Unable to load employees");

//         }
//     };

//     const handleEnable = async (id) => {

//         try {

//             await enableEmployee(id);

//             loadEmployees();

//         } catch (error) {

//             console.log(error);

//             alert("Unable to enable employee");

//         }

//     };

//     const handleDisable = async (id) => {

//         try {

//             await disableEmployee(id);

//             loadEmployees();

//         } catch (error) {

//             console.log(error);

//             alert("Unable to disable employee");

//         }

//     };

//     return (

//         <div className="container mt-5">

//             <h2 className="mb-4">Employee Management</h2>

//             <table className="table table-bordered table-hover">

//                 <thead className="table-dark">

//                     <tr>

//                         <th>ID</th>
//                         <th>Username</th>
//                         <th>Role</th>
//                         <th>Status</th>
//                         <th>Action</th>

//                     </tr>

//                 </thead>

//                 <tbody>

//                     {employees.map((employee) => (

//                         <tr key={employee.id}>

//                             <td>{employee.id}</td>

//                             <td>{employee.username}</td>

//                             <td>{employee.role}</td>

//                             <td>

//                                 {employee.enabled
//                                     ? "Enabled"
//                                     : "Disabled"}

//                             </td>

//                             <td>

//                                 {employee.enabled ? (

//                                     <button
//                                         className="btn btn-danger btn-sm"
//                                         onClick={() =>
//                                             handleDisable(employee.id)
//                                         }
//                                     >
//                                         Disable
//                                     </button>

//                                 ) : (

//                                     <button
//                                         className="btn btn-success btn-sm"
//                                         onClick={() =>
//                                             handleEnable(employee.id)
//                                         }
//                                     >
//                                         Enable
//                                     </button>

//                                 )}

//                             </td>

//                         </tr>

//                     ))}

//                 </tbody>

//             </table>

//         </div>

//     );
// }

// export default Employees;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for back navigation
import {
  getEmployees,
  enableEmployee,
  disableEmployee,
} from "../../api/adminApi";
import "../../styles/employees.css";

function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setIsLoading(true);
    setApiError("");
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      setApiError("Unable to load employees. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnable = async (id) => {
    setApiError("");
    try {
      await enableEmployee(id);
      loadEmployees();
    } catch (error) {
      console.error(error);
      setApiError("Unable to enable employee.");
    }
  };

  const handleDisable = async (id) => {
    setApiError("");
    try {
      await disableEmployee(id);
      loadEmployees();
    } catch (error) {
      console.error(error);
      setApiError("Unable to disable employee.");
    }
  };

  return (
  <div className="employees-page">
    <div className="employees-container">
      <div className="employees-card">

        {/* Header */}
        <div className="employees-header">
          <div>
            <h2>Employee Management</h2>
            <p>Manage employee access to the banking portal.</p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>
        </div>

        {/* Error */}
        {apiError && (
          <div className="alert-box">
            {apiError}
          </div>
        )}

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table className="employee-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>

            <tbody>

              {/* Loading */}
              {isLoading && (
                <tr>
                  <td
                    colSpan="5"
                    className="loading-row"
                  >
                    Loading employees...
                  </td>
                </tr>
              )}

              {/* Empty */}
              {!isLoading && employees.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="empty-row"
                  >
                    No employees found.
                  </td>
                </tr>
              )}

              {/* Data */}
              {!isLoading &&
                employees.map((employee) => (
                  <tr key={employee.id}>

                    <td>{employee.id}</td>

                    <td>{employee.username}</td>

                    <td>
                      <span className="role-pill">
                        {employee.role}
                      </span>
                    </td>

                    <td>
                      {employee.enabled ? (
                        <span className="active-pill">
                          Active
                        </span>
                      ) : (
                        <span className="disabled-pill">
                          Disabled
                        </span>
                      )}
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {employee.enabled ? (
                        <button
                          className="action-btn disable-btn"
                          onClick={() =>
                            handleDisable(employee.id)
                          }
                        >
                          Disable
                        </button>
                      ) : (
                        <button
                          className="action-btn enable-btn"
                          onClick={() =>
                            handleEnable(employee.id)
                          }
                        >
                          Enable
                        </button>
                      )}
                    </td>

                  </tr>
                ))}

            </tbody>

          </table>
        </div>

      </div>
    </div>
  </div>
  );
}

export default Employees;