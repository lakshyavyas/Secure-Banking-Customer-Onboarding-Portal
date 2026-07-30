// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { submitKyc } from "../../api/kycService";
// import { kycSchema } from "../../utils/schemas";

// function Kyc() {
//   const navigate = useNavigate();
//   const [apiError, setApiError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   // 1. Initialize React Hook Form with Zod schema resolver
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(kycSchema),
//   });

//   // 2. Submit Handler (runs only if client validation passes)
//   const onSubmit = async (data) => {
//     setApiError("");
//     setSuccessMessage("");

//     try {
//       await submitKyc(data);
//       setSuccessMessage("KYC Submitted Successfully!");

//       setTimeout(() => {
//         navigate("/customer/dashboard");
//       }, 1500);
//     } catch (error) {
//       console.error("Full Error:", error);
//       console.error("Response:", error.response);
//       console.error("Request:", error.request);
//       console.error("Message:", error.message);

//       setApiError(
//         error.response?.data?.message || "Failed to submit KYC details",
//       );
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header">
//               <h3>Submit KYC Verification</h3>
//             </div>

//             <div className="card-body">
//               {/* Alert Feedback Messages */}
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
//                 {/* Aadhaar Number */}
//                 <div className="mb-3">
//                   <label className="form-label">Aadhaar Number</label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       errors.aadhaarNumber ? "is-invalid" : ""
//                     }`}
//                     placeholder="Enter 12-digit Aadhaar Number"
//                     maxLength={12}
//                     {...register("aadhaarNumber")}
//                   />
//                   {errors.aadhaarNumber && (
//                     <div className="invalid-feedback">
//                       {errors.aadhaarNumber.message}
//                     </div>
//                   )}
//                 </div>

//                 {/* PAN Number */}
//                 <div className="mb-3">
//                   <label className="form-label">PAN Number</label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       errors.panNumber ? "is-invalid" : ""
//                     }`}
//                     placeholder="e.g. ABCDE1234F"
//                     maxLength={10}
//                     style={{ textTransform: "uppercase" }}
//                     {...register("panNumber")}
//                   />
//                   {errors.panNumber && (
//                     <div className="invalid-feedback">
//                       {errors.panNumber.message}
//                     </div>
//                   )}
//                 </div>

//                 {/* Address */}
//                 <div className="mb-3">
//                   <label className="form-label">Address</label>
//                   <textarea
//                     rows="4"
//                     className={`form-control ${
//                       errors.address ? "is-invalid" : ""
//                     }`}
//                     placeholder="Enter permanent address (10-250 characters)"
//                     {...register("address")}
//                   />
//                   {errors.address && (
//                     <div className="invalid-feedback">
//                       {errors.address.message}
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="btn btn-success w-100"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit KYC"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Kyc;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { submitKyc } from "../../api/kycService";
import { kycSchema } from "../../utils/schemas";
import "../../styles/kyc.css";

function Kyc() {
  const navigate = useNavigate();
  // const [apiError, setApiError] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [panFile, setPanFile] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(kycSchema),
  });

  // const onSubmit = async (data) => {
  //   setApiError("");
  //   setSuccessMessage("");

  //   try {
  //     await submitKyc(data, panFile, aadhaarFile);
  //     setSuccessMessage("KYC Submitted Successfully! Redirecting...");

  //     setTimeout(() => {
  //       navigate("/customer/dashboard");
  //     }, 1500);
  //   } catch (error) {
  //     console.error("Full Error:", error);
  //     setApiError(
  //       error.response?.data?.message || "Failed to submit KYC details",
  //     );
  //   }
  // };
const onSubmit = async (data) => {

  setApiError("");
  setSuccessMessage("");

  try {

    await submitKyc(
      data,
      panFile,
      aadhaarFile
    );

    setSuccessMessage("KYC Submitted Successfully! Redirecting...");

    setTimeout(() => {
      navigate("/customer/dashboard");
    }, 1500);

  } catch (error) {

    console.error(error);

    setApiError(
      error.response?.data?.message ||
      "Failed to submit KYC details"
    );
  }
};


  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3 py-5">
      <div
        className="card shadow-lg border-0 rounded-4 w-100"
        style={{ maxWidth: "600px" }}
      >
        <div className="card-body p-4 p-md-5">
          {/* Header Section with Back Button */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h3 className="fw-bold text-success mb-1">KYC Verification</h3>
              <p className="text-muted small mb-0">
                Securely submit your identity details
              </p>
            </div>
            <button
              onClick={() => navigate("/customer/dashboard")}
              className="btn btn-light rounded-circle shadow-sm border p-2 d-flex align-items-center justify-content-center transition-all"
              title="Back to Dashboard"
              style={{ width: "40px", height: "40px" }}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </button>
          </div>

          {/* Error Alert */}
          {apiError && (
            <div
              className="alert alert-danger d-flex align-items-center py-2 px-3 rounded-3 mb-4"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="me-2 flex-shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <div>{apiError}</div>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div
              className="alert alert-success d-flex align-items-center py-2 px-3 rounded-3 mb-4"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="me-2 flex-shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <div>{successMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
  {/* Aadhaar Number */}
  <div className="form-floating mb-3">
    <input
      type="text"
      id="aadhaarInput"
      className={`form-control font-monospace ${
        errors.aadhaarNumber ? "is-invalid" : ""
      }`}
      placeholder="Enter 12-digit Number"
      maxLength={12}
      {...register("aadhaarNumber")}
    />

    <label htmlFor="aadhaarInput" className="text-muted">
      Aadhaar Number
    </label>

    {errors.aadhaarNumber && (
      <div className="invalid-feedback">
        {errors.aadhaarNumber.message}
      </div>
    )}
  </div>

  {/* Upload Aadhaar */}
  <div className="form-group">

<label>Aadhaar Card</label>

<label className="upload-card">

    <div style={{fontSize:"48px"}}>📄</div>

    <h5>Upload Aadhaar</h5>

    <p>
        Drag & Drop or
        <span> Choose File</span>
    </p>

    <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e)=>setAadhaarFile(e.target.files[0])}
    />

</label>

{aadhaarFile && (

<div className="file-name">

✅ {aadhaarFile.name}

</div>

)}

</div>

  {/* PAN Number */}
  <div className="form-floating mb-3">
    <input
      type="text"
      id="panInput"
      className={`form-control font-monospace ${
        errors.panNumber ? "is-invalid" : ""
      }`}
      placeholder="e.g. ABCDE1234F"
      maxLength={10}
      style={{ textTransform: "uppercase" }}
      {...register("panNumber")}
    />

    <label htmlFor="panInput" className="text-muted">
      PAN Number
    </label>

    {errors.panNumber && (
      <div className="invalid-feedback">
        {errors.panNumber.message}
      </div>
    )}
  </div>

  {/* Upload PAN */}
  <div className="form-group">

<label>PAN Card</label>

<label className="upload-card">

    <div style={{fontSize:"48px"}}>💳</div>

    <h5>Upload PAN</h5>

    <p>
        Drag & Drop or
        <span> Choose File</span>
    </p>

    <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e)=>setPanFile(e.target.files[0])}
    />

</label>

{panFile && (

<div className="file-name">

✅ {panFile.name}

</div>

)}

</div>

  {/* Address */}
  <div className="form-floating mb-4">
    <textarea
      id="addressInput"
      className={`form-control ${
        errors.address ? "is-invalid" : ""
      }`}
      placeholder="Enter permanent address"
      style={{ height: "120px" }}
      {...register("address")}
    />

    <label htmlFor="addressInput" className="text-muted">
      Permanent Address
    </label>

    {errors.address && (
      <div className="invalid-feedback">
        {errors.address.message}
      </div>
    )}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="btn btn-success w-100 py-3 fs-5 rounded-3 shadow-sm d-flex justify-content-center align-items-center gap-2"
    disabled={isSubmitting || successMessage}
  >
    {isSubmitting && (
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    )}

    {isSubmitting
      ? "Encrypting & Submitting..."
      : "Submit Securely"}
  </button>
</form>
        </div>
      </div>
    </div>
  );
}

export default Kyc;
