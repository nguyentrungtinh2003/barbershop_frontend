import Users from "../pages/admin/Users";
import OwnerUser from "../pages/admin/OwnerUser";
import Services from "../pages/admin/Services";
import AdminDashboard from "../pages/admin/Dashboard";
import OwnerDashboard from "../pages/owner/Dashboard";
import Dashboard from "../pages/barber/Dashboard";
import CustomerDashboard from "../pages/customer/Dashboard";
import HomePage from "../pages/HomePage";
import Shops from "../pages/admin/Shops";
import Appointment from "../pages/admin/Appointment";

export const routes = {
  Public: [{ path: "/", element: <HomePage /> }],
  Admin: [
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/users", element: <Users /> },
    { path: "/admin/shops", element: <Shops /> },
  ],
  Owner: [
    { path: "/owner/dashboard", element: <OwnerDashboard /> },
    { path: "/owner/barber/shop/:id", element: <OwnerUser /> },
    { path: "/owner/appointment/shop/:id", element: <Appointment /> },
    { path: "/owner/services", element: <Services /> },
    { path: "/owner/shops", element: <Shops /> },
  ],
  Barber: [{ path: "/barber/dashboard", element: <Dashboard /> }],
  Customer: [{ path: "/customer/dashboard", element: <CustomerDashboard /> }],
};
