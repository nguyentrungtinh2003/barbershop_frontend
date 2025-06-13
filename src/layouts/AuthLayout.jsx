import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {children}
    </div>
  );
}
