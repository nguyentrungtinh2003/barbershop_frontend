import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppointmentByShopId } from "../../services/appointmentService";
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

export default function Appointment() {
  const { id } = useParams(); // id của shop
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await getAppointmentByShopId(parseInt(id)); // Truyền shopId
      setAppointments(res.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy lịch hẹn:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center flex justify-center items-center gap-3">
        <FaCalendarAlt className="text-yellow-400" />
        Lịch hẹn
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Đang tải dữ liệu...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-400">
          Hôm nay chưa có lịch hẹn nào.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="bg-gray-900 border border-yellow-400 rounded-xl shadow-lg p-5 space-y-2 hover:border-yellow-600 transition-all"
            >
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
                Lúc {a.startTime[3]} H, Ngày {a.startTime[2]} {a.startTime[1]}{" "}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
