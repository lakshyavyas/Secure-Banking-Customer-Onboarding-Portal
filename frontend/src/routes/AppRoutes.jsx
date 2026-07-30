import { Routes, Route } from "react-router-dom";

// Auth
import Login from "../pages/Login";

// Admin
import Dashboard from "../pages/admin/Dashboard";
import CreateEmployee from "../pages/admin/CreateEmployee";
import Employees from "../pages/admin/Employess";
import AdminCustomer from "../pages/admin/AdminCustomer";
// Employee
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import RegisterCustomer from "../pages/employee/RegisterCustomer";
import Customer from "../pages/employee/Customer";
import PendingKyc from "../pages/employee/PendingKyc";
import PendingAccounts from "../pages/employee/PendingAccounts";

// Customer
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerProfile from "../pages/customer/Profile";
import Kyc from "../pages/customer/Kyc";
import Accounts from "../pages/customer/Accounts";
import ChangePassword from "../pages/customer/ChangePassword";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-employee" element={<CreateEmployee />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/customer" element={<AdminCustomer />} />

      {/* Employee */}
      <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      <Route path="/employee/register" element={<RegisterCustomer />} />
      <Route path="/employee/customer" element={<Customer />} />
      <Route path="/employee/pending-kyc" element={<PendingKyc />} />
      <Route path="/employee/pending-accounts" element={<PendingAccounts />} />

      {/* Customer */}
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/customer/profile" element={<CustomerProfile />} />
      <Route path="/customer/change-password" element={<ChangePassword />} />
      <Route path="/customer/kyc" element={<Kyc />} />

      {/* Fallback */}
      <Route
        path="*"
        element={<div className="container mt-5">404 - Page Not Found</div>}
      />

      {/* Open Account */}
      <Route path="/customer/accounts" element={<Accounts />} />
    </Routes>
  );
}

export default AppRoutes;
