import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes/routes";
import PrivateRoute from "./routes/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Auth/Login";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />

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

        {/* Tương tự cho Barber và Customer */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
