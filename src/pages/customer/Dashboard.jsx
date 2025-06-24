import React, { useEffect, useState } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { getShopsById, getAllShops } from "../../services/shopServices";
import { createAppointment } from "../../services/appointmentService";
import Select from "react-select";

export default function CustomerDashboard() {
  const [formData, setFormData] = useState({
    appointmentStatus: "", // Ví dụ: "PENDING", "COMPLETED", v.v.
    price: "", // Có thể để trống hoặc 0
    customer: {
      id: "", // Thường chỉ cần user ID (hoặc name nếu
    },
    barber: {
      id: "",
    },
    services: [], // Mảng các service id hoặc object
    payments: {
      id: "", // Nếu bạn chỉ gửi id
    },
  });

  const [shops, setShops] = useState([]); // Mỗi shop có id, name
  const [barbers, setBarbers] = useState([]); // Tất cả barbers có shopId
  const [services, setServices] = useState([]); // Tất cả services có shopId

  const [currentShop, setCurrentShop] = useState(null); // Shop đang được chọn

  const filteredBarbers = currentShop ? currentShop.barbers : {};
  const filteredServices = currentShop ? currentShop.services : [];

  const fetchShops = async () => {
    const res = await getAllShops();
    setShops(res.data.data);
  };

  useEffect(() => {
    fetchShops();
  }, []);

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAppointment(formData);
      alert("Đặt lịch thành công!");
    } catch (error) {
      console.error("Lỗi đặt lịch:", error);
    }
  };

  return (
    <div className="p-6 mx-auto bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center uppercase tracking-wide">
          Đặt lịch cắt tóc
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Trạng thái ẩn */}
          <input
            type="hidden"
            name="appointmentStatus"
            value={formData.appointmentStatus}
          />

          {/* Shop */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-yellow-300">
              Chọn Shop
            </label>
            <Select
              name="shop"
              value={currentShop}
              onChange={(selectedShop) => {
                setCurrentShop(selectedShop);
                setFormData((prev) => ({
                  ...prev,
                  barber: { id: "" },
                  services: [],
                  price: 0,
                }));
              }}
              options={shops}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              className="text-black"
              placeholder="Chọn shop..."
            />
          </div>

          {/* Barber */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-yellow-300">
              Chọn Barber
            </label>
            <Select
              name="barber"
              value={filteredBarbers.id === formData.id || null}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  barber: { id: selected.id },
                }))
              }
              options={filteredBarbers}
              getOptionLabel={(option) => option.username}
              getOptionValue={(option) => option.id}
              className="text-black"
              placeholder={
                currentShop ? "Chọn barber..." : "Hãy chọn shop trước"
              }
              isDisabled={!currentShop}
            />
          </div>

          {/* Dịch vụ */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-yellow-300">
              Chọn Dịch vụ
            </label>
            <Select
              isMulti
              name="services"
              value={filteredServices.filter((service) =>
                formData.services.includes(service.id)
              )}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  services: selected ? selected.map((s) => s.id) : [],
                  price: selected
                    ? selected.reduce((total, s) => total + s.price, 0)
                    : 0,
                }))
              }
              options={filteredServices}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              className="text-black"
              placeholder={
                currentShop ? "Chọn dịch vụ..." : "Hãy chọn shop trước"
              }
              isDisabled={!currentShop}
            />
          </div>

          {/* Khung giờ */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-yellow-300">
              Chọn khung giờ bắt đầu
            </label>
            <Select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={(selectedSlot) =>
                setFormData((prev) => ({
                  ...prev,
                  timeSlot: selectedSlot,
                }))
              }
              options={null}
              getOptionLabel={(option) => option.startTime}
              getOptionValue={(option) => option.id}
              className="text-black"
              placeholder={
                currentShop ? "Chọn khung giờ..." : "Chọn shop trước đã"
              }
              isDisabled={!currentShop || formData.services.length === 0}
            />
            {formData.timeSlot && (
              <p className="text-sm text-yellow-300 mt-1">
                Tổng thời gian:{" "}
                {formData.services.length > 0 ? totalDuration : 0} phút
              </p>
            )}
          </div>

          {/* Tổng tiền */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-yellow-300">
              Tổng giá (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              readOnly
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-yellow-100 font-semibold placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
              placeholder="Tổng giá dịch vụ"
            />
          </div>

          {/* Phương thức thanh toán */}
          {/* <div>
      <label className="block mb-2 text-sm font-semibold text-yellow-300">Phương thức thanh toán</label>
      <select
        name="payments"
        value={formData.payments?.id || ""}
        onChange={handlePaymentChange}
        className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-yellow-100 focus:ring-2 focus:ring-yellow-400"
        required
      >
        <option value="">-- Chọn phương thức --</option>
        {payments.map((pay) => (
          <option key={pay.id} value={pay.id}>
            {pay.method}
          </option>
        ))}
      </select>
    </div> */}

          {/* Nút Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-md transition duration-200 shadow-md"
          >
            Đặt lịch ngay
          </button>
        </form>
      </div>
    </div>
  );
}
