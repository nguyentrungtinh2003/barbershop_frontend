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
import Profile from "../pages/admin/Profile";
import FeedbackForm from "../pages/admin/FeedbackForm";
import Payments from "../pages/admin/Payments";
import OAuth2RedirectHandler from "../pages/Auth/OAuth2RedirectHandler";
import PaymentSuccessVNPay from "../pages/payment/PaymentSuccessVNPay";
import Payment from "../pages/payment/Payment";
import Products from "../pages/admin/Products";
import Shopping from "../pages/customer/Shopping";
import Cart from "../pages/customer/Cart";
import ProductDetails from "../pages/customer/ProductDetails";
import ShopDetails from "../pages/customer/ShopDetails";
import HistoryBooking from "../pages/customer/HistoryBooking";
import TryHairstyle from "../pages/customer/TryHairstyle";
import OrderHistory from "../pages/customer/OrderHistory";
import Order from "../pages/customer/Order";

export const routes = {
  Public: [{ path: "/", element: <HomePage /> }],
  Admin: [
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/users", element: <Users /> },
    { path: "/admin/shops", element: <Shops /> },
    { path: "/admin/profile/:id", element: <Profile /> },
    { path: "/admin/payments/shop/:id", element: <Payments /> },
  ],
  Owner: [
    { path: "/owner/dashboard", element: <OwnerDashboard /> },
    { path: "/owner/barber/shop/:id", element: <OwnerUser /> },
    { path: "/owner/appointment/shop/:id", element: <Appointment /> },
    { path: "/owner/services", element: <Services /> },
    { path: "/owner/shops", element: <Shops /> },
    { path: "/owner/profile/:id", element: <Profile /> },
    { path: "/owner/payments/shop/:id", element: <Payments /> },
  ],
  Barber: [
    { path: "/barber/dashboard", element: <Dashboard /> },
    { path: "/barber/profile/:id", element: <Profile /> },
  ],
  Customer: [
    { path: "/customer/dashboard", element: <CustomerDashboard /> },
    { path: "/customer/profile/:id", element: <Profile /> },
    { path: "/customer/feedback", element: <FeedbackForm /> },
    { path: "/oauth2/redirect", element: <OAuth2RedirectHandler /> },
    { path: "/vnpay-return", element: <PaymentSuccessVNPay /> },
    { path: "/payment-vnpay", element: <Payment /> },
    { path: "/customer/shopping", element: <Shopping /> },
    { path: "/customer/cart", element: <Cart /> },
    { path: "/customer/shopping/product/:id", element: <ProductDetails /> },
    { path: "/customer/shop/:id", element: <ShopDetails /> },
    { path: "/customer/history-booking", element: <HistoryBooking /> },
    { path: "/customer/try-hairstyle", element: <TryHairstyle /> },
    { path: "/customer/order-history", element: <OrderHistory /> },
    { path: "/customer/orders", element: <Order /> },
  ],
};
