import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes/routes";
import PrivateRoute from "./routes/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Import các trang Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
        <Route path="/reset-password" element={<AuthLayout><ResetPassword /></AuthLayout>} />

        {/* Admin routes */}
        {routes.Admin.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <PrivateRoute allowedRoles={["Admin"]}>
                <MainLayout>{route.element}</MainLayout>
              </PrivateRoute>
            }
          />
        ))}

        {/* Owner routes */}
        {routes.Owner.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <PrivateRoute allowedRoles={["Owner"]}>
                <MainLayout>{route.element}</MainLayout>
              </PrivateRoute>
            }
          />
        ))}

        {/* Tương tự thêm cho Barber và Customer nếu bạn có */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
