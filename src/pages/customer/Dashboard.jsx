import React, { useEffect, useState } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { getShopsById, getAllShops } from "../../services/shopServices";
import {
  createAppointment,
  getTimeSlot,
  getAppointmentByCustomerId,
} from "../../services/appointmentService";
import { getFeedbackByCustomerId } from "../../services/feedbackServices";
import Select from "react-select";
import FeedbackForm from "../admin/FeedbackForm";
import websocketConfig from "../../utils/websocketConfig";

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
  const [timeSlot, setTimeSlot] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [currentShop, setCurrentShop] = useState(null); // Shop đang được chọn
  const [appointments, setAppointments] = useState([]);

  const filteredBarbers = currentShop ? currentShop.barbers : [];
  const filteredServices = currentShop ? currentShop.services : [];

  // modal send feedback
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const openFeedbackForm = (appt) => {
    setSelectedAppointment(appt);
    setShowModal(true);
  };
  //

  const fetchShops = async () => {
    const res = await getAllShops();
    setShops(res.data.data);
  };

  const fetchFeedbackCustomer = async () => {
    const res = await getFeedbackByCustomerId(customerId);
    setFeedbacks(res.data.data);
  };

  const fetchHistoryAppointment = async () => {
    const res = await getAppointmentByCustomerId(customerId);
    setAppointments(res.data.data);
  };

  const fetchTimeSlot = async () => {
    if (formData.shop?.id && formData.barber?.id && formData.date) {
      const res = await getTimeSlot(
        formData.shop.id,
        formData.barber.id,
        formData.date
      );
      console.log("fetch time", res.data.data);
      setTimeSlot(res.data.data);
    }
  };

  useEffect(() => {
    fetchTimeSlot();
  }, [formData.shop?.id, formData.barber?.id, formData.date]);

  useEffect(() => {
    fetchShops();
    fetchHistoryAppointment();
    fetchFeedbackCustomer();
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

  const cleanedBookedTimes = timeSlot.map((t) => t.trim());

  const availableTimeSlot = timeSlots.filter(
    (slot) => !cleanedBookedTimes.includes(slot.startTime?.trim())
  );

  console.log("backend time ", timeSlot);
  console.log("valai time ", availableTimeSlot);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formData);
  const handleSubmit = async () => {
    // VALIDATE TRƯỚC
    if (
      !formData.shop?.id ||
      !formData.barber?.id ||
      formData.services.length === 0 ||
      !formData.date ||
      !formData.timeSlot
    ) {
      alert("Vui lòng điền đầy đủ thông tin trước khi đặt lịch!");
      return;
    }

    try {
      await createAppointment(formData);
      alert("Đặt lịch thành công!");
    } catch (error) {
      console.error("Lỗi đặt lịch:", error);
      alert("Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-4 mx-auto bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
        {/* <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center uppercase tracking-widest">
          Đặt lịch cắt tóc
        </h2> */}

        <form className="space-y-6 bg-black p-6 rounded-xl shadow-lg border border-yellow-500">
          {/* Hidden appointment status */}
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
                filteredBarbers.find(
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

          {/* Services */}
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
              className="w-full px-4 py-2 rounded-lg bg-white border border-gray-700 text-black"
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {availableTimeSlot.map((slot) => {
                const isSelected = formData.timeSlot === slot.startTime;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        timeSlot: slot.startTime,
                      }))
                    }
                    className={`w-full text-center py-2 rounded-xl font-semibold transition duration-200 border shadow-sm
                  ${
                    !currentShop || formData.services.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : isSelected
                      ? "bg-yellow-400 text-black border-yellow-500 ring-2 ring-yellow-300"
                      : "bg-white text-black border-gray-300 hover:bg-yellow-100"
                  }
                `}
                    disabled={!currentShop || formData.services.length === 0}
                  >
                    {slot.startTime}
                  </button>
                );
              })}
            </div>
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
              className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-yellow-200 font-semibold"
              placeholder="Tổng giá dịch vụ"
            />
          </div>

          {/* Submit button */}
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl transition duration-200 shadow-lg text-lg"
          >
            Đặt lịch ngay
          </button>
        </form>
        {/* Lich su book */}
        {/* Lịch sử đặt lịch */}
        <div className="mt-12 bg-gray-900 rounded-xl p-6 shadow-md border border-yellow-500">
          <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center uppercase">
            Lịch sử đặt lịch của bạn
          </h3>

          {appointments.length === 0 ? (
            <p className="text-gray-300 text-center">Chưa có lịch hẹn nào.</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-black border border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-lg transition"
                >
                  <p>
                    <span className="text-yellow-400 font-semibold">
                      Dịch vụ:
                    </span>{" "}
                    {appt.services.map((s) => s.name).join(", ")}
                  </p>
                  <p>
                    <span className="text-yellow-400 font-semibold">
                      Barber:
                    </span>{" "}
                    {appt.barber.username}
                  </p>
                  <p>
                    <span className="text-yellow-400 font-semibold">Shop:</span>{" "}
                    {appt.shop.name}
                  </p>
                  <p>
                    <span className="text-yellow-400 font-semibold">Ngày:</span>{" "}
                    {appt.date}
                  </p>
                  <p>
                    <span className="text-yellow-400 font-semibold">
                      Giờ bắt đầu:
                    </span>{" "}
                    {appt.startTime}
                  </p>
                  <p>
                    <span className="text-yellow-400 font-semibold">
                      Tổng giá:
                    </span>{" "}
                    {appt.price.toLocaleString()} VNĐ
                  </p>
                  <p>
                    <span className="text-yellow-400 font-semibold">
                      Trạng thái:
                    </span>{" "}
                    {appt.appointmentStatus}
                  </p>
                  <p>
                    <span className="text-yellow-400 font-semibold">
                      Trạng thái:
                    </span>{" "}
                    {appt.paid == true ? (
                      <button
                        className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
                        onClick={() => openFeedbackForm(appt)}
                      >
                        Gửi Feedback
                      </button>
                    ) : (
                      <span className="text-gray-400">Chưa thanh toán</span>
                    )}
                  </p>
                </div>
              ))}
              {selectedAppointment && (
                <FeedbackForm
                  show={showModal}
                  onHide={() => setShowModal(false)}
                  appointment={selectedAppointment}
                />
              )}
            </div>
          )}
        </div>
        {/* Lịch sử feedback */}
        <div className="mt-12 bg-gray-900 rounded-xl p-6 shadow-md border border-yellow-500">
          <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center uppercase">
            Lịch sử Feedback
          </h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-black border border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-lg transition"
              >
                <p>
                  <span className="text-yellow-400 font-semibold">Shop:</span>{" "}
                  {fb.shopName}
                </p>
                <p>
                  <span className="text-yellow-400 font-semibold">Barber:</span>{" "}
                  {fb.barberName}
                </p>
                <p>
                  <span className="text-yellow-400 font-semibold">Rating:</span>{" "}
                  {fb.rating} ⭐
                </p>
                <p>
                  <span className="text-yellow-400 font-semibold">
                    Comment:
                  </span>{" "}
                  {fb.comment}
                </p>
                <p>
                  <span className="text-yellow-400 font-semibold">
                    Ngày gửi:
                  </span>{" "}
                  {new Date(fb.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
