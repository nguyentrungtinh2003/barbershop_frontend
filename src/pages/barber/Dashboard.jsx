import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaPhoneAlt,
  FaClock,
  FaUserTie,
  FaStore,
} from "react-icons/fa";
import { GiScissors } from "react-icons/gi";
import { getAppointmentByBarberId } from "../../services/appointmentService";
import { getFeedbackByBarberId } from "../../services/feedbackServices";
import websocketConfig from "../../utils/websocketConfig";
import { toast } from "react-toastify";
export default function BarberDashboard() {
  const [appointments, setAppointments] = useState([]);
  const barber = JSON.parse(localStorage.getItem("user"));
  const barberId = barber.id;

  const [feedbacks, setFeedbacks] = useState([]);

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // yyyy-MM-dd
  });

  const fetchAppointments = async () => {
    try {
      toast.success(`Xin chào bạn ${barber.username}`);
      const res = await getAppointmentByBarberId(parseInt(barberId));
      const rawAppointment = res.data.data;

      const filteredAppointments = rawAppointment.filter((a) => {
        const [year, month, day] = a.startTime;
        const formattedDate = `${year}-${String(month).padStart(
          2,
          "0"
        )}-${String(day).padStart(2, "0")}`;
        return formattedDate === selectedDate;
      });

      setAppointments(filteredAppointments);
    } catch (error) {
      console.error("Lỗi khi lấy lịch hẹn:", error);
    }
  };

  const fetchFeedbackBarber = async () => {
    const res = await getFeedbackByBarberId(barberId);
    setFeedbacks(res.data.data);
  };

  useEffect(() => {
    websocketConfig.onConnect = () => {
      console.log("Websocket connected");
      websocketConfig.subscribe(`/topic/feedback/${barberId}`, (message) => {
        const newFeedback = JSON.parse(message.body);
        setFeedbacks((prev) => [...prev, newFeedback]);
      });
    };
    websocketConfig.activate();

    return () => {
      websocketConfig.deactivate();
    };
  }, []);

  useEffect(() => {
    fetchAppointments();
    fetchFeedbackBarber();
  }, [selectedDate]);

  return (
    <div className="p-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      <h1 className="text-4xl font-extrabold text-yellow-400 mb-8 text-center drop-shadow-md">
        ✂️ Barber Dashboard
      </h1>

      {/* Bộ lọc ngày */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <label htmlFor="date" className="text-lg font-medium text-white">
          Chọn ngày:
        </label>
        <input
          type="date"
          id="date"
          className="bg-white text-black px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button
          onClick={() => window.location.reload()}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-md"
        >
          Xem lịch hôm nay
        </button>
      </div>

      {/* Thông tin thợ */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-yellow-300 mb-1">
          Xin chào, <span className="text-yellow-400">{barber.username}</span>{" "}
          👋
        </h2>
        <p className="text-sm text-gray-400">
          Chúc bạn một ngày làm việc hiệu quả và vui vẻ.
        </p>
      </div>

      {/* Lịch làm việc */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-yellow-300 mb-3">
          🗓️ Lịch làm việc hôm nay
        </h2>
        <ul className="text-gray-300 space-y-1">
          <li>🕗 Ca sáng: 07:00 - 12:30</li>
          <li>🕐 Ca chiều: 13:00 - 22:00</li>
        </ul>
      </div>

      {/* Lịch hẹn khách hàng */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-yellow-300 mb-5">
          📅 Danh sách lịch hẹn
        </h2>

        {appointments.length === 0 ? (
          <p className="text-gray-400 italic">
            Không có lịch hẹn nào cho ngày này.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {appointments.map((a) => (
              <div
                key={a.id}
                className="bg-gray-900 border border-yellow-500 rounded-xl p-5 shadow-lg hover:scale-[1.02] transition duration-300"
              >
                <div
                  className={`inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide 
                    ${
                      a.paid
                        ? "bg-green-200 text-green-900"
                        : "bg-red-200 text-red-800"
                    }`}
                >
                  {a.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                </div>

                <h3 className="text-lg font-bold text-yellow-300 mb-2 flex items-center gap-2">
                  <FaUser className="text-base" />
                  {a.customer.username}
                </h3>

                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <FaPhoneAlt className="text-gray-400" />
                  {a.customer.phoneNumber}
                </p>

                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <GiScissors className="text-pink-400" />
                  {a.services.map((s) => s.name).join(", ")}
                </p>

                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <FaClock className="text-blue-400" />
                  Lúc {a.startTime[3]}h - Ngày {a.startTime[2]}/{a.startTime[1]}
                  /{a.startTime[0]}
                </p>

                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <FaUserTie className="text-green-400" />
                  {a.barber.username}
                </p>

                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <FaStore className="text-purple-400" />
                  {a.shop.name}
                </p>
              </div>
            ))}
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
                <span className="text-yellow-400 font-semibold">Customer:</span>{" "}
                {fb.customerName}
              </p>
              <p>
                <span className="text-yellow-400 font-semibold">Rating:</span>{" "}
                {fb.rating} ⭐
              </p>
              <p>
                <span className="text-yellow-400 font-semibold">Comment:</span>{" "}
                {fb.comment}
              </p>
              <p>
                <span className="text-yellow-400 font-semibold">Ngày gửi:</span>{" "}
                {new Date(fb.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
