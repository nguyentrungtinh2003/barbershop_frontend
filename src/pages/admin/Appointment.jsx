import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAppointmentByShopId,
  markAsPaid,
} from "../../services/appointmentService";
import {
  FaCalendarAlt,
  FaUser,
  FaPhoneAlt,
  FaClock,
  FaUserTie,
  FaStore,
} from "react-icons/fa";
// Thay vì từ "react-icons/fa", dùng từ Game Icons:
import { GiScissors } from "react-icons/gi";
import { toast } from "react-toastify";

export default function Appointment() {
  const { id } = useParams(); // id của shop
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // yyyy-MM-dd
  });

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await getAppointmentByShopId(parseInt(id)); // Truyền shopId
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
    setLoading(false);
  };

  const handleMarkAsPaid = async (id) => {
    try {
      await markAsPaid(id);
      toast.success("Đã xác nhận thanh toán");
      setTimeout(() => {
        fetchAppointments();
      }, 3000);
    } catch (e) {
      toast.error("Xác nhận thanh toán thất bại");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  return (
    <div className="p-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      <div className="flex justify-center items-center gap-4 mb-6">
        <label htmlFor="date" className="text-lg text-white font-medium">
          Chọn ngày:
        </label>
        <input
          type="date"
          id="date"
          className="bg-white text-black px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button
          onClick={() => window.location.reload()}
          className="w-50 mt-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-md"
        >
          Xem lịch hôm nay
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-yellow-400 mb-10 text-center flex justify-center items-center gap-3 drop-shadow-md">
        <FaCalendarAlt className="text-yellow-400 text-3xl" />
        Lịch hẹn {selectedDate.substring(8, 10)} {selectedDate.substring(5, 7)}{" "}
        {selectedDate.substring(0, 4)}
      </h1>

      {loading ? (
        <p className="text-center text-gray-400 animate-pulse">
          Đang tải dữ liệu...
        </p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-400 italic">
          Hôm nay chưa có lịch hẹn nào.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="bg-gray-800 border border-yellow-500 rounded-2xl shadow-lg p-6 space-y-3 hover:scale-[1.02] transition-transform duration-300"
            >
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold 
              ${
                a.paid
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
              >
                {a.paid ? "Đã thanh toán" : "Chưa thanh toán"}
              </div>

              <h2 className="text-xl font-bold text-yellow-300 flex items-center gap-2">
                <FaUser className="text-base" />
                {a.customer.username}
              </h2>

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
                Lúc {a.startTime[3]}h - Ngày {a.startTime[2]}/{a.startTime[1]}/
                {a.startTime[0]}
              </p>

              <p className="text-sm text-gray-300 flex items-center gap-2">
                <FaUserTie className="text-green-400" />
                {a.barber.username}
              </p>

              <p className="text-sm text-gray-300 flex items-center gap-2">
                <FaStore className="text-purple-400" />
                {a.shop.name}
              </p>

              {!a.paid && (
                <button
                  onClick={() => handleMarkAsPaid(a.id)}
                  className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-md"
                >
                  Xác nhận đã thanh toán
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
