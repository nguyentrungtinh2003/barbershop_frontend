import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // if (!user) return <Navigate to="/login" />;

  // if (!allowedRoles.includes(user.roleEnum)) {
  //   return <div>Bạn không có quyền truy cập.</div>;
  // }

  return children;
}
