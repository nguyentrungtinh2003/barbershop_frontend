import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaTools,
  FaMoneyCheckAlt,
  FaCalendarAlt,
  FaComments,
} from "react-icons/fa";

import { getAllUsers } from "../../services/userServices";
import { getAllShops } from "../../services/shopServices";

export default function AdminDashboard() {
  const fakeUsers = ["Nguyễn Văn A", "Trần Thị B", "Phạm Văn C"];
  const fakeServices = ["Cắt tóc", "Gội đầu", "Nhuộm"];
  const fakePayments = ["VNPay - 200k", "PayPal - 500k"];
  const fakeAppointments = ["10:00 - Nguyễn Văn A", "11:30 - Trần Thị B"];
  const fakeFeedbacks = ["Dịch vụ rất tốt", "Thợ cắt tóc thân thiện"];

  const [users, setUsers] = useState([]);
  const [shops, setShops] = useState([]);

  const fetchAllUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data.data);
  };

  const fetchAllShops = async () => {
    const res = await getAllShops();
    setShops(res.data.data);
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllShops();
  }, []);

  const stats = [
    {
      label: "Người dùng",
      value: users.length,
      icon: <FaUsers className="text-2xl text-blue-400" />,
    },
    {
      label: "Tiệm",
      value: shops.length,
      icon: <FaTools className="text-2xl text-green-400" />,
    },
    {
      label: "Dịch vụ",
      value: shops.length,
      icon: <FaTools className="text-2xl text-green-400" />,
    },
    {
      label: "Thanh toán",
      value: 340,
      icon: <FaMoneyCheckAlt className="text-2xl text-yellow-400" />,
    },
    {
      label: "Lịch hẹn",
      value: 120,
      icon: <FaCalendarAlt className="text-2xl text-purple-400" />,
    },
    {
      label: "Phản hồi",
      value: 45,
      icon: <FaComments className="text-2xl text-red-400" />,
    },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">
        Admin Control Panel
      </h1>

      {/* Tổng quan thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-xl flex justify-between items-center shadow-md"
          >
            <div>
              <div className="text-sm text-gray-300">{item.label}</div>
              <div className="text-2xl font-bold text-yellow-300">
                {item.value}
              </div>
            </div>
            {item.icon}
          </div>
        ))}
      </div>

      {/* Quản lý chi tiết */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Section
          title="Người dùng mới"
          data={users.slice(0, 5).map((user) => user.username)}
          button="Quản lý người dùng"
        />
        <Section
          title="Tiệm"
          data={shops.slice(0, 5).map((shop) => shop.name)}
          button="Quản lý dịch vụ"
        />
        <Section
          title="Thanh toán gần đây"
          data={fakePayments}
          button="Xem thanh toán"
        />
        <Section
          title="Lịch hẹn hôm nay"
          data={fakeAppointments}
          button="Quản lý lịch hẹn"
        />
        <Section
          title="Phản hồi người dùng"
          data={fakeFeedbacks}
          button="Xem phản hồi"
        />
      </div>
    </div>
  );
}

// Component nhỏ để tái sử dụng
const Section = ({ title, data, button }) => (
  <div className="bg-gray-800 p-5 rounded-xl shadow-md">
    <h2 className="text-lg font-semibold text-yellow-300 mb-3">{title}</h2>
    <ul className="text-sm text-gray-300 space-y-2">
      {data.map((item, idx) => (
        <li key={idx}>- {item}</li>
      ))}
    </ul>
    <button className="mt-4 px-4 py-2 text-sm bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 transition">
      {button}
    </button>
  </div>
);
