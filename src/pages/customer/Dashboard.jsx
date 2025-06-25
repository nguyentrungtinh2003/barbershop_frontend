import React, { useEffect, useState } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { getShopsById, getAllShops } from "../../services/shopServices";
import { createAppointment } from "../../services/appointmentService";
import Select from "react-select";

export default function CustomerDashboard() {
  const [formData, setFormData] = useState({
    appointmentStatus: "DONE", // Ví dụ: "PENDING", "COMPLETED", v.v.
    price: "", // Có thể để trống hoặc 0
    customer: {
      id: "", // Thường chỉ cần user ID (hoặc name nếu
    },
    barber: {
      id: "",
    },
    services: [], // Mảng các service id hoặc object
    // payments: {
    //   id: "", // Nếu bạn chỉ gửi id
    // },
    shop: {
      id: "",
    },
    timeSlot: "",
  });

  const [shops, setShops] = useState([]); // Mỗi shop có id, name
  const [barbers, setBarbers] = useState([]); // Tất cả barbers có shopId
  const [services, setServices] = useState([]); // Tất cả services có shopId

  const [currentShop, setCurrentShop] = useState(null); // Shop đang được chọn

  const filteredBarbers = currentShop ? currentShop.barbers : [];
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

  const customerId = user.id;

  const timeSlots = [
    { id: 1, startTime: "07:00" },
    { id: 2, startTime: "08:00" },
    { id: 3, startTime: "09:00" },
    { id: 4, startTime: "10:00" },
    { id: 5, startTime: "11:00" },
    { id: 6, startTime: "12:00" },
    { id: 7, startTime: "13:00" },
    { id: 8, startTime: "14:00" },
    { id: 9, startTime: "15:00" },
    { id: 10, startTime: "16:00" },
    { id: 11, startTime: "17:00" },
    { id: 12, startTime: "18:00" },
    { id: 13, startTime: "19:00" },
    { id: 14, startTime: "20:00" },
    { id: 15, startTime: "21:00" },
    // ...
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formData);
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
    <div className="p-2 mx-auto bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-2 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center uppercase tracking-wide">
          Đặt lịch cắt tóc
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-black p-6 rounded-lg shadow-lg border border-yellow-500"
        >
          {/* Trạng thái ẩn */}
          <input
            type="hidden"
            name="appointmentStatus"
            value={formData.appointmentStatus}
          />

          {/* Shop */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-yellow-400">
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
                  shop: { id: selectedShop.id },
                  customer: { id: customerId },
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
            <label className="block mb-2 text-sm font-semibold text-yellow-400">
              Chọn Barber
            </label>
            <Select
              name="barber"
              value={
                filteredBarbers.filter(
                  (barber) => barber.id === formData.barber.id
                ) || null
              }
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
            <label className="block mb-2 text-sm font-semibold text-yellow-400">
              Chọn Dịch vụ
            </label>
            <Select
              isMulti
              name="services"
              value={filteredServices.filter((service) =>
                formData.services.some((ser) => ser.id === service.id)
              )}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  services: selected ? selected.map((s) => ({ id: s.id })) : [],
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

          {/* Ngày */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-yellow-400">
              Chọn ngày
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-700 text-black"
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </div>

          {/* Khung giờ */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-yellow-400">
              Chọn khung giờ bắt đầu
            </label>
            <Select
              name="timeSlot"
              value={timeSlots.filter(
                (time) => time.startTime === formData.timeSlot
              )}
              onChange={(selectedSlot) =>
                setFormData((prev) => ({
                  ...prev,
                  timeSlot: selectedSlot.startTime,
                }))
              }
              options={timeSlots}
              getOptionLabel={(option) => option.startTime}
              getOptionValue={(option) => option.id}
              className="text-black"
              placeholder={
                currentShop ? "Chọn khung giờ..." : "Chọn shop trước đã"
              }
              isDisabled={!currentShop || formData.services.length === 0}
            />
            {/* {formData.timeSlot && (
              <p className="text-sm text-yellow-300 mt-1">
                Tổng thời gian: {totalDuration} phút
              </p>
            )} */}
          </div>

          {/* Tổng giá */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-yellow-400">
              Tổng giá (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              readOnly
              className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-yellow-200 font-semibold placeholder-gray-400"
              placeholder="Tổng giá dịch vụ"
            />
          </div>

          {/* Nút submit */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-md transition duration-200 shadow-lg"
          >
            Đặt lịch ngay
          </button>
        </form>
      </div>
    </div>
  );
}
