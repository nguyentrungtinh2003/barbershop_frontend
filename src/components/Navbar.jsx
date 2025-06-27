import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NAV_ITEMS = {
  ADMIN: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "User", path: "/admin/users" },
    { label: "Shop", path: "/admin/shops" },
  ],
  OWNER: [
    { label: "Quản lí tiệm", path: "/owner/shops" },
    { label: "Giá dịch vụ", path: "/owner/services" },
  ],
  BARBER: [
    { label: "Lịch của tôi", path: "/barber/schedule" },
    { label: "Hồ sơ", path: "/barber/profile" },
  ],
  CUSTOMER: [
    { label: "Lịch sử đặt lịch", path: "/customer/dashboard" },
    { label: "Hồ sơ", path: "/customer/users" },
  ],
};

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const role = user?.roleEnum;
  const menuItems = NAV_ITEMS[role] || [];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer hover:text-yellow-400 transition"
        >
          💈 BarberBooking
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center font-medium">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="hover:text-yellow-400 transition duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Info */}
        {user ? (
          <div className="hidden md:flex items-center gap-4">
            <img
              src={user.img}
              alt="Avatar"
              className="w-9 h-9 rounded-full border-2 border-yellow-400 shadow"
            />
            <span className="text-sm font-semibold">{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded-full shadow transition"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="hidden md:flex">
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-400 text-black font-semibold text-sm px-5 py-1.5 rounded-full shadow hover:scale-105 transition"
            >
              Đăng nhập
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pt-4 pb-6 space-y-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-white hover:text-yellow-400 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {user ? (
            <div className="flex items-center gap-3 mt-4">
              <img
                src={user.img}
                alt="Avatar"
                className="w-9 h-9 rounded-full border-2 border-yellow-400"
              />
              <span className="text-sm font-semibold">{user.username}</span>
              <button
                onClick={handleLogout}
                className="ml-auto bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded-full transition"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/login");
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black w-full text-sm py-2 rounded-full shadow"
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
