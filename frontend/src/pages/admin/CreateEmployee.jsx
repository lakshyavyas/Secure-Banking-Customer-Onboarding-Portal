// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { createEmployee } from "../../api/adminApi";
// import { registrationSchema } from "../../utils/schemas";

// function CreateEmployee() {
//   const navigate = useNavigate();
//   const [apiError, setApiError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   // 1. Hook Form setup with Zod resolver
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(registrationSchema),
//   });

//   // 2. Submit handler (triggers only when form validation passes)
//   const onSubmit = async (data) => {
//     setApiError("");
//     setSuccessMessage("");

//     try {
//       await createEmployee(data);
//       setSuccessMessage("Employee created successfully!");

//       // Brief pause so user sees success feedback before redirecting
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1500);
//     } catch (error) {
//       console.error(error);
//       setApiError(error.response?.data?.message || "Unable to create employee");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header">
//               <h3>Create Employee</h3>
//             </div>

//             <div className="card-body">
//               {/* API Alert Messages */}
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
//                 {/* Username Input */}
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

//                 {/* Password Input */}
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

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="btn btn-primary w-100"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Creating..." : "Create Employee"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateEmployee;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createEmployee } from "../../api/adminApi";
import { registrationSchema } from "../../utils/schemas";
import "../../styles/createEmployee.css";

function CreateEmployee() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      await createEmployee(data);
      setSuccessMessage("Employee created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);
      setApiError(error.response?.data?.message || "Unable to create employee");
    }
  };

  return (
  <div className="create-page">

    <div className="create-card">

      <div className="create-header">

        <div>
          <h2>Create Employee</h2>
          <p>Register a new banking employee.</p>
        </div>

        <button
          className="back-btn"
          type="button"
          onClick={() => navigate("/dashboard")}
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
            ? "Creating Employee..."
            : "Create Employee"}
        </button>

      </form>

    </div>

  </div>
  );
}

export default CreateEmployee;