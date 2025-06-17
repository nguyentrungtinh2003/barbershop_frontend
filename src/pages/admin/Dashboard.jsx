import React from "react";
import { FaUsers, FaStore, FaUserTie, FaCalendarAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Người dùng",
      value: 1500,
      icon: <FaUsers className="text-2xl text-yellow-400" />,
    },
    {
      label: "Tiệm Barber",
      value: 85,
      icon: <FaStore className="text-2xl text-yellow-400" />,
    },
    {
      label: "Barber",
      value: 320,
      icon: <FaUserTie className="text-2xl text-yellow-400" />,
    },
    {
      label: "Lịch hẹn",
      value: 1290,
      icon: <FaCalendarAlt className="text-2xl text-yellow-400" />,
    },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-yellow-400">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-xl p-5 bg-gray-800 shadow-md flex items-center justify-between"
          >
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xl font-bold">{item.value}</div>
            </div>
            <div>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Các bảng chức năng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quản lý người dùng */}
        <div className="bg-gray-800 shadow-md rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3">Người dùng mới</h2>
          <ul className="text-sm space-y-2">
            <li>- Nguyễn Văn A (Khách hàng)</li>
            <li>- Trần Thị B (Chủ tiệm)</li>
            <li>- Phạm Văn C (Barber)</li>
          </ul>
          <button className="mt-4 px-4 py-2 text-sm bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 transition">
            Quản lý người dùng
          </button>
        </div>

        {/* Quản lý tiệm */}
        <div className="bg-gray-800 shadow-md rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3">Tiệm gần đây</h2>
          <ul className="text-sm space-y-2">
            <li>- BarberShop Quận 1</li>
            <li>- BarberShop Tân Bình</li>
            <li>- BarberShop Thủ Đức</li>
          </ul>
          <button className="mt-4 px-4 py-2 text-sm bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 transition">
            Quản lý tiệm
          </button>
        </div>

        {/* Quản lý lịch hẹn */}
        <div className="bg-gray-800 shadow-md rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3">Lịch hẹn hôm nay</h2>
          <ul className="text-sm space-y-2">
            <li>- Cắt tóc: 10:00 AM - Nguyễn Văn A</li>
            <li>- Gội đầu: 11:30 AM - Trần Thị B</li>
          </ul>
          <button className="mt-4 px-4 py-2 text-sm bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 transition">
            Quản lý lịch hẹn
          </button>
        </div>

        {/* Quản lý barber */}
        <div className="bg-gray-800 shadow-md rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3">Barber đang hoạt động</h2>
          <ul className="text-sm space-y-2">
            <li>- Anh Tuấn (Quận 1)</li>
            <li>- Chị Hoa (Tân Bình)</li>
          </ul>
          <button className="mt-4 px-4 py-2 text-sm bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 transition">
            Quản lý barber
          </button>
        </div>
      </div>
    </div>
  );
}
