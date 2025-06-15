import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

// Menu theo vai trò
const NAV_ITEMS = {
  Admin: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Quản lý người dùng", path: "/admin/users" },
  ],
  Owner: [
    { label: "Tiệm của tôi", path: "/owner/shop" },
    { label: "Barber", path: "/owner/barbers" },
    { label: "Lịch hẹn", path: "/owner/schedule" },
    { label: "Giá dịch vụ", path: "/owner/pricing" },
  ],
  Barber: [
    { label: "Lịch của tôi", path: "/barber/schedule" },
    { label: "Hồ sơ", path: "/barber/profile" },
  ],
};

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const role = user?.role;
  const menuItems = NAV_ITEMS[role] || [];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-lg">
      <div className="flex justify-between items-center mx-auto">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer hover:text-yellow-300 transition"
        >
          💈 BarberBooking
        </div>

        {/* Hamburger toggle (mobile only) */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu (desktop) */}
        <ul className="hidden md:flex gap-6 items-center">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="hover:text-yellow-300 transition">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Info (desktop) */}
        {user ? (
          <div className="hidden md:flex items-center gap-4">
            <img
              src={user.avatar || "https://i.pravatar.cc/150?u=default"}
              alt="Avatar"
              className="w-8 h-8 rounded-full border border-gray-400"
            />
            <span className="text-sm font-medium">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="hidden md:flex">
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-400 text-black font-semibold text-sm px-4 py-1 rounded-xl shadow hover:scale-105 transition"
            >
              Đăng nhập
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 px-4 pb-4 border-t border-gray-700">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block text-white hover:text-yellow-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <img
                src={user.avatar || "https://i.pravatar.cc/150?u=default"}
                alt="Avatar"
                className="w-8 h-8 rounded-full border border-gray-400"
              />
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="hidden md:flex">
              <button
                onClick={() => navigate("/login")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-1 rounded transition"
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
