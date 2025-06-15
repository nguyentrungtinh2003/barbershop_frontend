import Users from "../pages/admin/Users";
import AdminDashboard from "../pages/admin/Dashboard";
import OwnerDashboard from "../pages/owner/Dashboard";
import Dashboard from "../pages/barber/Dashboard";
import CustomerDashboard from "../pages/customer/Dashboard";
import HomePage from "../pages/HomePage";
import AddUser from "../pages/admin/AddUserForm";
import EditUser from "../pages/admin/EditUser";

export const routes = {
  Public: [
    { path: "/", element: <HomePage /> },
  ],
  Admin: [
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/users", element: <Users /> },
    { path: "/admin/users/add", element: <AddUser /> },
    { path: "/admin/users/edit/:id", element: <EditUser /> },
  ],
  Owner: [
    { path: "/owner/dashboard", element: <OwnerDashboard /> },
  ],
  Barber: [
    { path: "/barber/dashboard", element: <Dashboard /> },
  ],
  Customer: [
    { path: "/customer/dashboard", element: <CustomerDashboard /> },
  ],
};


