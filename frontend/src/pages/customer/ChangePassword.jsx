// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { changePassword } from "../../api/authApi";
// import "../../styles/changePassword.css";

// function ChangePassword() {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       await changePassword(data);

//       localStorage.setItem("passwordChanged", "true");

//       alert("Password changed successfully.");

//       navigate("/customer/dashboard");
//     } catch (err) {
//       console.log(err);
//       console.log(err.response);
//       alert(err.response?.data || "Unable to change password.");
//     }
//   };

//   return (
//     <div className="change-password-page">
//       <div className="change-password-card">
//         <div className="change-header">
//           <div>
//             <h2>Change Password</h2>
//             <p>Update your banking account password securely.</p>
//           </div>
//         </div>

//         <div className="password-note">
//           For your security, choose a strong password that you haven't used
//           before.
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="form-group">
//             <label>Current Password</label>

//             <input
//               type="password"
//               placeholder="Enter current password"
//               {...register("oldPassword")}
//             />
//           </div>

//           <div className="form-group">
//             <label>New Password</label>

//             <input
//               type="password"
//               placeholder="Enter new password"
//               {...register("newPassword")}
//             />
//           </div>

//           <button type="submit" className="submit-btn" disabled={isSubmitting}>
//             {isSubmitting ? "Updating Password..." : "Change Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
// export default ChangePassword;

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "../../api/authApi";
import { changePasswordSchema } from "../../utils/schemas"; // Adjust import path as needed
import "../../styles/changePassword.css";

function ChangePassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema), //Abhishek
  });

  const onSubmit = async (data) => {
    try {
      await changePassword(data);

      localStorage.setItem("passwordChanged", "true");

      alert("Password changed successfully.");

      navigate("/login");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      alert(err.response?.data || "Unable to change password.");
    }
  };

  return (
    <div className="change-password-page">
      <div className="change-password-card">
        <div className="change-header">
          <div>
            <h2>Change Password</h2>
            <p>Update your banking account password securely.</p>
          </div>
        </div>

        <div className="password-note">
          For your security, choose a strong password that you haven't used
          before.
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              {...register("oldPassword")}
            />
            {errors.oldPassword && (
              <span className="error-message">
                {errors.oldPassword.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <span className="error-message">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Updating Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
