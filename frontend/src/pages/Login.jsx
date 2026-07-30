// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import ReCAPTCHA from "react-google-recaptcha";

// import { login } from "../api/authApi";
// import { loginSchema } from "../utils/schemas";
// import "../styles/login.css";

// function Login() {
//   const navigate = useNavigate();
//   const [apiError, setApiError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [captchaToken, setCaptchaToken] = useState(null);
  

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const handleLogin = async (data) => {
//       if (!captchaToken) {
//     alert("Please complete the CAPTCHA");
//     return;
//   }
//     setApiError("");

//     try {
//       const response = await login(data.username, data.password);

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("role", response.data.role);
//       localStorage.setItem("username", response.data.username);

//       const role = response.data.role;

//       // if (role === "ADMIN") {
//       //   navigate("/dashboard");
//       // } else if (role === "EMPLOYEE") {
//       //   navigate("/employee/dashboard");
//       // } else if (role === "CUSTOMER") {
//       //   navigate("/customer/dashboard");
//       // } else {
//       //   setApiError("Unauthorized Role");
//       // }

//   if (role === "ADMIN") {
//         navigate("/dashboard");
//       } else if (role === "EMPLOYEE") {
//         navigate("/employee/dashboard");
//       } else if (role === "CUSTOMER") {
//         if (response.data.passwordChanged) {
//           navigate("/customer/dashboard");
//         } else {
//           navigate("/customer/change-password");
//         }
//       } else {
//         setApiError("Unauthorized Role");
//       }


//     } catch (error) {
//       const resData = error.response?.data;
//       let rawMessage = "";

//       if (typeof resData === "string" && resData.trim() !== "") {
//         rawMessage = resData;
//       } else if (resData?.message) {
//         rawMessage = resData.message;
//       } else if (resData?.error) {
//         rawMessage = resData.error;
//       } else {
//         rawMessage = "Invalid Username or Password";
//       }

//       // Strips patterns like '401 UNAUTHORIZED "' and trailing quotes
//       const cleanMessage = rawMessage
//         .replace(/^\d{3}\s+[A-Z_]+\s*"?/, "")
//         .replace(/"$/, "");

//       setApiError(cleanMessage);
//     }
//   };

//   return (



//   <div className="login-page">

//           {/* <ReCAPTCHA
//         sitekey="6LeIkGktAAAAABeoO5qbSDeedD0zxar7RA-vq_J4"

//         onChange={(token) => setCaptchaToken(token)}
//       /> */}

//     {/* Left Branding Section */}
//     <div className="login-left">
//       <div>

//         <h1>Secure Digital Banking Portal</h1>

//       </div>
//     </div>

//     {/* Right Login Section */}
//     <div className="login-right">
//       <div
//         className="login-card bg-white rounded-4 shadow-lg p-5"
//         style={{ maxWidth: "430px" }}
//       >
//         <div className="text-center mb-4">
//           <h2 className="fw-bold">Welcome Back</h2>

//           <p className="text-muted">
//             Login to continue your banking journey
//           </p>
//         </div>

//         {apiError && (
//           <div className="alert alert-danger">{apiError}</div>
//         )}

//         <form onSubmit={handleSubmit(handleLogin)}>

//           <div className="mb-3">

//             <label className="form-label fw-semibold">
//               Username
//             </label>

//             <input
//               className={`form-control ${
//                 errors.username ? "is-invalid" : ""
//               }`}
//               {...register("username")}
//             />

//             {errors.username && (
//               <div className="invalid-feedback">
//                 {errors.username.message}
//               </div>
//             )}

//           </div>

//           <div className="mb-4 position-relative">

//             <label className="form-label fw-semibold">
//               Password
//             </label>

//             <input
//               type={showPassword ? "text" : "password"}
//               className={`form-control ${
//                 errors.password ? "is-invalid" : ""
//               }`}
//               {...register("password")}
//             />

//             <button
//               type="button"
//               className="btn btn-link position-absolute"
//               style={{
//                 right: "10px",
//                 top: "38px",
//                 textDecoration: "none",
//               }}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>

//             {/* {errors.password && (
//               <div className="invalid-feedback">
//                 {errors.password.message}
//               </div>
//             )}

//           </div>

//           <button
//             className="btn btn-primary w-100 py-3 fw-bold"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Signing In..." : "Login Securely"}
//           </button> */}
//           {errors.password && (
//   <div className="invalid-feedback">
//     {errors.password.message}
//   </div>
// )}

// </div>

// {/* CAPTCHA */}
// <div className="mb-4 d-flex justify-content-center">
//   <ReCAPTCHA
//     sitekey="6LeIkGktAAAAABeoO5qbSDeedD0zxar7RA-vq_J4"
//     onChange={(token) => setCaptchaToken(token)}
//   />
// </div>

// <button
//   className="btn btn-primary w-100 py-3 fw-bold"
//   disabled={isSubmitting || !captchaToken}
// >
//   {isSubmitting ? "Signing In..." : "Login Securely"}
// </button>

//         </form>

//         <hr className="my-4" />

//         <div className="text-center text-muted small">
//           🔒 Protected by 256-bit SSL Encryption
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }

// export default Login;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";

import { login } from "../api/authApi";
import { loginSchema } from "../utils/schemas";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data) => {
      console.log("Login button clicked");
  console.log(data);
    if (!captchaToken) {
      alert("Please complete the CAPTCHA");
      return;
    }

    setApiError("");

    try {
      console.log("Calling login API...");
      const response = await login(data.username, data.password,captchaToken);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", response.data.username);

      const role = response.data.role;

      if (role === "ADMIN") {
        navigate("/dashboard");
      } else if (role === "EMPLOYEE") {
        navigate("/employee/dashboard");
      } else if (role === "CUSTOMER") {
        if (response.data.passwordChanged) {
          navigate("/customer/dashboard");
        } else {
          navigate("/customer/change-password");
        }
      } else {
        setApiError("Unauthorized Role");
      }
    } catch (error) {
      console.error("Login error:", error);
          console.log("Response:", error.response);
    console.log("Request:", error.request);
    console.log("Message:", error.message);
      const resData = error.response?.data;
      let rawMessage = "";

      if (typeof resData === "string" && resData.trim() !== "") {
        rawMessage = resData;
      } else if (resData?.message) {
        rawMessage = resData.message;
      } else if (resData?.error) {
        rawMessage = resData.error;
      } else {
        rawMessage = "Invalid Username or Password";
      }

      const cleanMessage = rawMessage
        .replace(/^\d{3}\s+[A-Z_]+\s*"?/, "")
        .replace(/"$/, "");

      setApiError(cleanMessage);
    }
  };

  return (
    <div className="login-page">
      {/* Left Branding Section */}
      <div className="login-left">
        <div>
          <h1>Secure Digital Banking Portal</h1>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="login-right">
        <div
          className="login-card bg-white rounded-4 shadow-lg p-5"
          style={{ maxWidth: "430px" }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold">Welcome Back</h2>
            <p className="text-muted">
              Login to continue your banking journey
            </p>
          </div>

          {apiError && (
            <div className="alert alert-danger">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(handleLogin)}>
            {/* Username */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Username
              </label>

              <input
                type="text"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                {...register("username")}
              />

              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username.message}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="mb-4 position-relative">
              <label className="form-label fw-semibold">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password")}
              />

              <button
                type="button"
                className="btn btn-link position-absolute"
                style={{
                  right: "10px",
                  top: "38px",
                  textDecoration: "none",
                }}
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>

              {errors.password && (
                <div className="invalid-feedback d-block">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Google CAPTCHA */}
            <div className="mb-4 d-flex justify-content-center">
              <ReCAPTCHA
                sitekey="6LeIkGktAAAAABeoO5qbSDeedD0zxar7RA-vq_J4"
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-3 fw-bold"
              disabled={isSubmitting || !captchaToken}
            >
              {isSubmitting ? "Signing In..." : "Login Securely"}
            </button>
          </form>

          <hr className="my-4" />

          <div className="text-center text-muted small">
            🔒 Protected by 256-bit SSL Encryption
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;