// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/authApi";

// function AdminLogin() {

//     const navigate = useNavigate();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {

//             const response = await API.post("/auth/login", {
//                 email,
//                 password
//             });

//             console.log(response.data);

//             localStorage.setItem("token", response.data.token);

//             navigate("/admin/dashboard");

//         } catch (error) {

//             alert("Invalid Credentials");

//         }
//     };





//     return (

//         <div style={styles.container}>

//             <div style={styles.card}>

//                 <h1>ABC BANK</h1>

//                 <h3>Admin Login</h3>

//                 <form onSubmit={handleLogin}>

//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e)=>setEmail(e.target.value)}
//                         style={styles.input}
//                     />

//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e)=>setPassword(e.target.value)}
//                         style={styles.input}
//                     />

//                     <button style={styles.button}>
//                         Login
//                     </button>

//                 </form>

//             </div>

//         </div>

//     );

// }

// const styles={

// container:{

// display:"flex",

// justifyContent:"center",

// alignItems:"center",

// height:"100vh",

// background:"#f5f5f5"

// },

// card:{

// width:"350px",

// padding:"30px",

// background:"white",

// borderRadius:"10px",

// boxShadow:"0 5px 20px rgba(0,0,0,.2)",

// textAlign:"center"

// },

// input:{

// width:"100%",

// padding:"12px",

// marginTop:"15px",

// boxSizing:"border-box"

// },

// button:{

// width:"100%",

// padding:"12px",

// marginTop:"20px",

// background:"#0052cc",

// color:"white",

// border:"none",

// cursor:"pointer",

// fontSize:"16px"

// }

// };

// export default AdminLogin;