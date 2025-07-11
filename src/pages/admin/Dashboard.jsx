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
import { toast } from "react-toastify";
export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [shops, setShops] = useState([]);

  const fetchAllUsers = async () => {
    toast.success(`Xin chào bạn ${user.username}`);
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

  const [user] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || { name: "Khách hàng" };
  });

  const role = user.roleEnum;

  const stats = [
    {
      label: "Người dùng",
      value: users.length,
      icon: <FaUsers className="text-3xl text-yellow-400" />,
    },
    {
      label: "Tiệm",
      value: shops.length,
      icon: <FaTools className="text-3xl text-green-400" />,
    },
    {
      label: "Dịch vụ",
      value: shops.length,
      icon: <FaTools className="text-3xl text-pink-400" />,
    },
    {
      label: "Thanh toán",
      value: 340,
      icon: <FaMoneyCheckAlt className="text-3xl text-teal-400" />,
    },
    {
      label: "Lịch hẹn",
      value: 120,
      icon: <FaCalendarAlt className="text-3xl text-purple-400" />,
    },
    {
      label: "Phản hồi",
      value: 45,
      icon: <FaComments className="text-3xl text-red-400" />,
    },
  ];

  const cards = [
    {
      label: "Người dùng mới",
      value: users.slice(0, 5).map((user) => user.username),
      button: role == "ADMIN" ? "/admin/users" : "/owner/shops",
    },
    {
      label: "Tiệm nổi bật",
      value: shops.slice(0, 5).map((shop) => shop.name),
      button: role == "ADMIN" ? "/admin/shops" : "/owner/shops",
    },
    {
      label: "Phản hồi gần đây",
      value: ["Dịch vụ rất tốt", "Thợ cắt tóc thân thiện"],
      button: "Xem tất cả phản hồi",
    },

    {
      label: "Thanh toán",
      value: ["Dịch vụ rất tốt", "Thợ cắt tóc thân thiện"],
      button: "Xem tất cả phản hồi",
    },
    {
      label: "Lịch hẹn",
      value: ["Dịch vụ rất tốt", "Thợ cắt tóc thân thiện"],
      button: "Xem tất cả phản hồi",
    },
  ];

  const visibleStats = role === "ADMIN" ? stats.slice(0, 2) : stats;
  const visibleCards = role === "ADMIN" ? cards.slice(0, 2) : cards;

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white font-sans">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-yellow-400 drop-shadow-lg tracking-wide">
        {role} Dashboard
      </h1>

      {/* Tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {visibleStats.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-xl flex items-center justify-between transition hover:scale-105 hover:bg-gray-700 duration-300"
          >
            <div>
              <p className="text-sm uppercase text-gray-400">{item.label}</p>
              <p className="text-3xl font-bold text-yellow-300">{item.value}</p>
            </div>
            {item.icon}
          </div>
        ))}
      </div>

      {/* Chi tiết */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCards.map((item, index) => (
          <Section
            key={index}
            title={item.label}
            data={item.value}
            button={item.button}
          />
        ))}
      </div>
    </div>
  );
}

const Section = ({ title, data, button }) => (
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-yellow-400/20 transition duration-300">
    <h2 className="text-xl font-semibold text-yellow-300 mb-4">{title}</h2>
    <ul className="space-y-2 text-gray-300 text-sm">
      {data.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <span>•</span> <span>{item}</span>
        </li>
      ))}
    </ul>
    <a href={button} className="text-decorection-none">
      <button className="mt-5 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 text-sm rounded-lg transition duration-300">
        Quản lí
      </button>
    </a>
  </div>
);
