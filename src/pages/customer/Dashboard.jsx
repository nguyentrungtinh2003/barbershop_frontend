import React, { useState } from "react";

export default function CustomerDashboard() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    service: "",
    shop: "",
    barber: "",
  });

  const [user] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || { name: "Khách hàng" };
  });

  const [history, setHistory] = useState([
    {
      date: "2025-06-15",
      time: "14:00",
      service: "Cắt tóc",
      shop: "BarberShop Quận 1",
      barber: "Anh Tuấn",
    },
    {
      date: "2025-06-01",
      time: "10:30",
      service: "Gội đầu",
      shop: "BarberShop Thủ Đức",
      barber: "Chị Hoa",
    },
  ]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đặt lịch thành công!");
    setHistory((prev) => [formData, ...prev]);
    setFormData({ date: "", time: "", service: "", shop: "", barber: "" });
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">
        Xin chào, <span className="text-yellow-400">{user.name}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booking Form */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            Đặt lịch cắt tóc
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Ngày", name: "date", type: "date" },
              { label: "Giờ", name: "time", type: "time" },
              {
                label: "Tiệm",
                name: "shop",
                type: "text",
                placeholder: "Tên tiệm",
              },
              {
                label: "Barber",
                name: "barber",
                type: "text",
                placeholder: "Tên thợ cắt",
              },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block mb-1 font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
                  placeholder={placeholder}
                  required
                />
              </div>
            ))}

            <div>
              <label className="block mb-1 font-medium">Dịch vụ</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">-- Chọn dịch vụ --</option>
                <option value="Cắt tóc">Cắt tóc</option>
                <option value="Cạo râu">Cạo râu</option>
                <option value="Gội đầu">Gội đầu</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-md transition"
            >
              Đặt lịch ngay
            </button>
          </form>
        </div>

        {/* History Table */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            Lịch sử cắt tóc
          </h2>
          {history.length === 0 ? (
            <p className="text-gray-400">Chưa có lịch sử đặt lịch.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-700">
                <thead className="bg-gray-700 text-yellow-300">
                  <tr>
                    {["Ngày", "Giờ", "Dịch vụ", "Tiệm", "Barber"].map(
                      (head) => (
                        <th key={head} className="p-2 border border-gray-700">
                          {head}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="p-2 border border-gray-700">
                        {item.date}
                      </td>
                      <td className="p-2 border border-gray-700">
                        {item.time}
                      </td>
                      <td className="p-2 border border-gray-700">
                        {item.service}
                      </td>
                      <td className="p-2 border border-gray-700">
                        {item.shop}
                      </td>
                      <td className="p-2 border border-gray-700">
                        {item.barber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
