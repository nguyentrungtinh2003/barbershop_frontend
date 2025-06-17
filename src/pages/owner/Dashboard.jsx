import React from "react";
import { FaUserTie, FaCalendarCheck, FaDollarSign } from "react-icons/fa";

export default function OwnerDashboard() {
  const shopInfo = {
    name: "BarberShop Quận 1",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    status: "Đang hoạt động",
  };

  const stats = [
    {
      label: "Barber",
      value: 5,
      icon: <FaUserTie className="text-2xl text-yellow-300" />,
      bg: "bg-gray-800",
    },
    {
      label: "Lịch hẹn hôm nay",
      value: 12,
      icon: <FaCalendarCheck className="text-2xl text-yellow-300" />,
      bg: "bg-gray-800",
    },
    {
      label: "Dịch vụ",
      value: 8,
      icon: <FaDollarSign className="text-2xl text-yellow-300" />,
      bg: "bg-gray-800",
    },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-400">
        Owner Dashboard
      </h1>

      {/* Thông tin tiệm */}
      <div className="bg-gray-800 rounded-xl shadow-md p-5 mb-8">
        <h2 className="text-xl font-semibold text-yellow-400 mb-2">
          Thông tin tiệm
        </h2>
        <p className="text-sm text-gray-300">
          <strong className="text-yellow-300">Tên:</strong> {shopInfo.name}
        </p>
        <p className="text-sm text-gray-300">
          <strong className="text-yellow-300">Địa chỉ:</strong>{" "}
          {shopInfo.address}
        </p>
        <p className="text-sm text-gray-300">
          <strong className="text-yellow-300">Trạng thái:</strong>{" "}
          <span className="text-green-400 font-semibold">
            {shopInfo.status}
          </span>
        </p>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 shadow-lg flex items-center justify-between ${item.bg}`}
          >
            <div>
              <div className="text-sm text-yellow-300 font-medium">
                {item.label}
              </div>
              <div className="text-2xl font-bold text-white">{item.value}</div>
            </div>
            <div>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Điều hướng nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-xl transition font-semibold">
          Quản lý Barber
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-xl transition font-semibold">
          Quản lý lịch hẹn
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-xl transition font-semibold">
          Cập nhật dịch vụ
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-xl transition font-semibold">
          Cài đặt tiệm
        </button>
      </div>
    </div>
  );
}
