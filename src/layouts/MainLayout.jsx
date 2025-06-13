import React from "react";
import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/admin/dashboard">Admin</Link>
        <Link to="/owner/dashboard">Owner</Link>
      </nav>
      <div className="p-4">{children}</div>
    </div>
  );
}
