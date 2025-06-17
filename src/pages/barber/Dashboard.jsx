import React from "react";

export default function BarberDashboard() {
  // Dữ liệu mẫu
  const appointments = [
    {
      id: 1,
      customer: "Nguyễn Văn A",
      time: "09:00",
      service: "Cắt tóc",
      shop: "BarberShop Quận 1",
    },
    {
      id: 2,
      customer: "Trần Thị B",
      time: "11:30",
      service: "Gội đầu",
      shop: "BarberShop Quận 1",
    },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">
        Barber Dashboard
      </h1>

      {/* Thông tin thợ */}
      <div className="bg-gray-800 rounded-xl shadow-md p-5 mb-6">
        <h2 className="text-xl font-semibold text-yellow-300 mb-2">
          Xin chào, <span className="text-yellow-400">Anh Tuấn</span> 👋
        </h2>
        <p className="text-sm text-gray-300">
          Chúc bạn một ngày làm việc hiệu quả!
        </p>
      </div>

      {/* Lịch làm việc */}
      <div className="bg-gray-800 rounded-xl shadow-md p-5 mb-6">
        <h2 className="text-lg font-semibold text-yellow-300 mb-3">
          Lịch làm việc hôm nay
        </h2>
        <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
          <li>Ca sáng: 08:00 - 12:00</li>
          <li>Ca chiều: 13:30 - 18:00</li>
        </ul>
      </div>

      {/* Lịch hẹn */}
      <div className="bg-gray-800 rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold text-yellow-300 mb-4">
          Lịch hẹn với khách
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-700">
            <thead className="bg-gray-700 text-yellow-300">
              <tr>
                <th className="p-2 border border-gray-600">Thời gian</th>
                <th className="p-2 border border-gray-600">Khách hàng</th>
                <th className="p-2 border border-gray-600">Dịch vụ</th>
                <th className="p-2 border border-gray-600">Tiệm</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-700 text-gray-200">
                  <td className="p-2 border border-gray-700">{a.time}</td>
                  <td className="p-2 border border-gray-700">{a.customer}</td>
                  <td className="p-2 border border-gray-700">{a.service}</td>
                  <td className="p-2 border border-gray-700">{a.shop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
