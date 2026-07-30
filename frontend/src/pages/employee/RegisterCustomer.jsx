// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { registerCustomer } from "../../api/authApi";
// import { registrationSchema } from "../../utils/schemas";

// function RegisterCustomer() {
//   const [apiError, setApiError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate(); // 👈 Initialized navigate

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(registrationSchema),
//   });

//   const onSubmit = async (data) => {
//     setApiError("");
//     setSuccessMessage("");

//     try {
//       await registerCustomer(data);
//       setSuccessMessage("Customer Registered Successfully! Redirecting...");

//       // Redirect to login after 1 second so the user sees the success message
//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);
//     } catch (err) {
//       console.error(err);
//       setApiError(err.response?.data?.message || "Registration Failed");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header">
//               <h3>Register Customer</h3>
//             </div>

//             <div className="card-body">
//               {apiError && (
//                 <div className="alert alert-danger py-2" role="alert">
//                   {apiError}
//                 </div>
//               )}
//               {successMessage && (
//                 <div className="alert alert-success py-2" role="alert">
//                   {successMessage}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="mb-3">
//                   <label className="form-label">Username</label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       errors.username ? "is-invalid" : ""
//                     }`}
//                     placeholder="Enter username (4-20 characters)"
//                     {...register("username")}
//                   />
//                   {errors.username && (
//                     <div className="invalid-feedback">
//                       {errors.username.message}
//                     </div>
//                   )}
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className={`form-control ${
//                       errors.password ? "is-invalid" : ""
//                     }`}
//                     placeholder="Enter strong password"
//                     {...register("password")}
//                   />
//                   {errors.password && (
//                     <div className="invalid-feedback">
//                       {errors.password.message}
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn btn-primary w-100"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Registering..." : "Register Customer"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterCustomer;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerCustomer } from "../../api/authApi";
import { registrationSchema } from "../../utils/schemas";
import "../../styles/registerCustomer.css";

function RegisterCustomer() {
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    setApiError("");
    setSuccessMessage("");

    try {
      await registerCustomer(data);
      setSuccessMessage("Customer Registered Successfully! Redirecting...");

      // Redirecting after 1.5 seconds for better readability
      setTimeout(() => {
        navigate("/login"); 
        // Note: If you want the employee to stay in their dashboard instead of going to login, 
        // you can change this to navigate("/employee/dashboard")
      }, 1500);
    } catch (err) {
      console.error(err);
      setApiError(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
  <div className="register-page">

    <div className="register-card">

      <div className="register-header">

        <div>
          <h2>Register Customer</h2>
          <p>Create a new banking customer profile.</p>
        </div>

        <button
          className="back-btn"
          type="button"
          onClick={() => navigate("/employee/dashboard")}
        >
          ← Dashboard
        </button>

      </div>

      {apiError && (
        <div className="alert-box alert-error">
          {apiError}
        </div>
      )}

      {successMessage && (
        <div className="alert-box alert-success">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            {...register("username")}
          />

          {errors.username && (
            <div className="error-text">
              {errors.username.message}
            </div>
          )}

        </div>

        <div className="form-group">

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />

          {errors.password && (
            <div className="error-text">
              {errors.password.message}
            </div>
          )}

        </div>

        <button
          className="submit-btn"
          type="submit"
          disabled={isSubmitting || successMessage}
        >
          {isSubmitting
            ? "Registering..."
            : "Register Customer"}
        </button>

      </form>

    </div>

  </div>
  );
}

export default RegisterCustomer;