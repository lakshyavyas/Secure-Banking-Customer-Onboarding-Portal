// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { createProfile } from "../../api/customerService";
// import { customerProfileSchema } from "../../utils/schemas";

// function Profile() {
//   const navigate = useNavigate();
//   const [apiError, setApiError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   // 1. Initialize Hook Form with Zod resolver
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(customerProfileSchema),
//   });

//   // 2. Submit Handler (runs only if client validation passes)
//   const onSubmit = async (data) => {
//     setApiError("");
//     setSuccessMessage("");

//     try {
//       const response = await createProfile(data);
//       console.log("Success response:", response);

//       setSuccessMessage("Profile Created Successfully!");

//       setTimeout(() => {
//         navigate("/customer/dashboard");
//       }, 1500);
//     } catch (error) {
//       console.error("Error creating profile:", error);
//       setApiError(error.response?.data?.message || "Failed to create profile");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header">
//               <h3>Complete Customer Profile</h3>
//             </div>

//             <div className="card-body">
//               {/* API Alerts */}
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
//                 {/* First Name */}
//                 <div className="mb-3">
//                   <label className="form-label">First Name</label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       errors.firstName ? "is-invalid" : ""
//                     }`}
//                     placeholder="Enter First Name"
//                     {...register("firstName")}
//                   />
//                   {errors.firstName && (
//                     <div className="invalid-feedback">
//                       {errors.firstName.message}
//                     </div>
//                   )}
//                 </div>

//                 {/* Last Name */}
//                 <div className="mb-3">
//                   <label className="form-label">Last Name</label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       errors.lastName ? "is-invalid" : ""
//                     }`}
//                     placeholder="Enter Last Name"
//                     {...register("lastName")}
//                   />
//                   {errors.lastName && (
//                     <div className="invalid-feedback">
//                       {errors.lastName.message}
//                     </div>
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div className="mb-3">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className={`form-control ${
//                       errors.email ? "is-invalid" : ""
//                     }`}
//                     placeholder="e.g. user@example.com"
//                     {...register("email")}
//                   />
//                   {errors.email && (
//                     <div className="invalid-feedback">
//                       {errors.email.message}
//                     </div>
//                   )}
//                 </div>

//                 {/* Mobile */}
//                 <div className="mb-3">
//                   <label className="form-label">Mobile Number</label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       errors.mobile ? "is-invalid" : ""
//                     }`}
//                     placeholder="10 digit number starting with 6-9"
//                     maxLength={10}
//                     {...register("mobile")}
//                   />
//                   {errors.mobile && (
//                     <div className="invalid-feedback">
//                       {errors.mobile.message}
//                     </div>
//                   )}
//                 </div>

//                 {/* Date of Birth */}
//                 <div className="mb-3">
//                   <label className="form-label">Date of Birth</label>
//                   <input
//                     type="date"
//                     className={`form-control ${
//                       errors.dateOfBirth ? "is-invalid" : ""
//                     }`}
//                     {...register("dateOfBirth")}
//                   />
//                   {errors.dateOfBirth && (
//                     <div className="invalid-feedback">
//                       {errors.dateOfBirth.message}
//                     </div>
//                   )}
//                 </div>

//                 {/* Gender */}
//                 <div className="mb-3">
//                   <label className="form-label">Gender</label>
//                   <select
//                     className={`form-select ${
//                       errors.gender ? "is-invalid" : ""
//                     }`}
//                     {...register("gender")}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   {errors.gender && (
//                     <div className="invalid-feedback">
//                       {errors.gender.message}
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="btn btn-primary w-100"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Saving..." : "Save Profile"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "../../styles/profile.css";

import {
  createProfile,
  getMyProfile,
  updateMyProfile,
} from "../../api/customerService";
import { customerProfileSchema } from "../../utils/schemas";

function Profile() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm({
  //   resolver: zodResolver(customerProfileSchema),
  // });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(customerProfileSchema),
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getMyProfile();

      reset({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        mobile: response.data.mobile,
        dateOfBirth: response.data.dateOfBirth,
        gender: response.data.gender,
      });

      setIsUpdate(true);
    } catch (error) {
      if (error.response?.status === 404) {
        setIsUpdate(false);
      }
    }
  };

  // const onSubmit = async (data) => {
  //   setApiError("");
  //   setSuccessMessage("");

  //   try {
  //     const response = await createProfile(data);
  //     console.log("Success response:", response);

  //     setSuccessMessage("Profile Created Successfully! Redirecting...");

  //     setTimeout(() => {
  //       navigate("/customer/dashboard");
  //     }, 1500);
  //   } catch (error) {
  //     console.error("Error creating profile:", error);
  //     setApiError(error.response?.data?.message || "Failed to create profile");
  //   }
  // };

  const onSubmit = async (data) => {
    setApiError("");
    setSuccessMessage("");

    try {
      let response;

      if (isUpdate) {
        response = await updateMyProfile(data);
        setSuccessMessage("Profile Updated Successfully!");
      } else {
        response = await createProfile(data);
        setSuccessMessage("Profile Created Successfully!");
      }

      console.log(response);

      setTimeout(() => {
        navigate("/customer/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);
      setApiError(error.response?.data?.message || "Operation failed");
    }
  };

  return (
  <div className="profile-page">

    <div className="profile-container">

      {/* Header */}

      <div className="profile-header">

        <div className="profile-title">
          <h2>
            {isUpdate ? "Update Profile" : "Create Profile"}
          </h2>

          <p>
            Keep your personal information updated for secure banking services.
          </p>
        </div>

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/customer/dashboard")}
        >
          ← Dashboard
        </button>

      </div>

      {/* Alerts */}

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

      {/* Form */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="profile-form"
      >

        {/* First Name */}

        <div className="form-group">

          <label>First Name</label>

          <input
            type="text"
            {...register("firstName")}
          />

          {errors.firstName && (
            <span className="error-text">
              {errors.firstName.message}
            </span>
          )}

        </div>

        {/* Last Name */}

        <div className="form-group">

          <label>Last Name</label>

          <input
            type="text"
            {...register("lastName")}
          />

          {errors.lastName && (
            <span className="error-text">
              {errors.lastName.message}
            </span>
          )}

        </div>

        {/* Email */}

        <div className="form-group">

          <label>Email Address</label>

          <input
            type="email"
            {...register("email")}
          />

          {errors.email && (
            <span className="error-text">
              {errors.email.message}
            </span>
          )}

        </div>

        {/* Mobile */}

        <div className="form-group">

          <label>Mobile Number</label>

          <input
            type="text"
            maxLength={10}
            {...register("mobile")}
          />

          {errors.mobile && (
            <span className="error-text">
              {errors.mobile.message}
            </span>
          )}

        </div>

        {/* DOB */}

        <div className="form-group">

          <label>Date of Birth</label>

          <input
            type="date"
            {...register("dateOfBirth")}
          />

          {errors.dateOfBirth && (
            <span className="error-text">
              {errors.dateOfBirth.message}
            </span>
          )}

        </div>

        {/* Gender */}

        <div className="form-group">

          <label>Gender</label>

          <select
            {...register("gender")}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {errors.gender && (
            <span className="error-text">
              {errors.gender.message}
            </span>
          )}

        </div>

        {/* Submit */}

        <div className="submit-section">

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || successMessage}
          >
            {isSubmitting
              ? "Saving Profile..."
              : isUpdate
                ? "Update Profile"
                : "Create Profile"}
          </button>

        </div>

      </form>

    </div>

  </div>
);
}

export default Profile;
