import axios from "axios";

const customerApi = axios.create({
  baseURL: "http://localhost:8082",
});

customerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Endpoint matching @GetMapping("/all") under @RequestMapping("/profile")
// export const getAllCustomers = () => {
//   return customerApi.get("/profile/all");
// };

// export const getAllCustomers = (page, size) => {
//     return customerApi.get(
//         `/profile/all?page=${page}&size=${size}`
//     );
// };

//Change by Tejas
export const getAllCustomers = (keyword, page, size, sort) => {
  return customerApi.get(
    `/profile/all?keyword=${keyword}&page=${page}&size=${size}&sort=${sort}`
  );
};

export default customerApi;
