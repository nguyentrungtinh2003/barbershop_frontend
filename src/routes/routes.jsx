import Users from "../pages/admin/Users";
import AdminDashboard from "../pages/admin/Dashboard";
import OwnerDashboard from "../pages/owner/Dashboard";
import BarberDashboard from "../pages/barber/Dashboard";
import CustomerDashboard from "../pages/customer/Dashboard";

export const routes = {
  Admin: [
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/users", element: <Users /> },
  ],
  Owner: [
    { path: "/owner/dashboard", element: <OwnerDashboard /> },
  ],
  Barber: [
    { path: "/barber/dashboard", element: <BarberDashboard /> },
  ],
  Customer: [
    { path: "/customer/dashboard", element: <CustomerDashboard /> },
  ],
};
