import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { getAppointmentByCustomerId } from "../../services/appointmentServices";
import { getFeedbackByCustomerId } from "../../services/feedbackServices";
import FeedbackForm from "../admin/FeedbackForm";

export default function HistoryBooking() {
  const [appointments, setAppointments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchHistoryAppointment = async () => {
    const res = await getAppointmentByCustomerId(user.id);
    setAppointments(res.data.data.reverse());
  };

  const fetchFeedbackCustomer = async () => {
    const res = await getFeedbackByCustomerId(user.id);
    setFeedbacks(res.data.data);
    console.log("Feedback customer", res.data.data);
  };

  useEffect(() => {
    fetchHistoryAppointment();
    fetchFeedbackCustomer();
    setLoading(false);
  }, []);

  const openFeedbackForm = (appt) => {
    setSelectedAppointment(appt);
    setShowModal(true);
  };

  const formatCustomDateTime = (value) => {
    // value kiểu [2025,6,25,12] hoặc tương tự
    const hour = value[3];
    return `${hour}:00`;
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <FaRegCalendarCheck className="text-yellow-400 text-3xl" />
          <h1 className="text-3xl font-bold text-yellow-400">
            Lịch sử đặt lịch
          </h1>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Đang tải...</div>
        ) : (
          <>
            {/* ===== TABLE ===== */}
            <div
              className="relative max-h-[500px] overflow-y-auto overflow-x-auto
                            rounded-2xl border border-yellow-500
                            bg-black/30 backdrop-blur-md shadow-2xl"
            >
              <table className="min-w-[900px] w-full text-sm table-fixed">
                <thead
                  className="sticky top-0 z-20
                                 bg-gradient-to-r from-yellow-400 to-yellow-500
                                 text-black text-xs uppercase shadow"
                >
                  <tr>
                    <th className="px-6 py-3">Dịch vụ</th>
                    <th className="px-6 py-3">Barber</th>
                    <th className="px-6 py-3">Shop</th>
                    <th className="px-6 py-3">Ngày</th>
                    <th className="px-6 py-3">Giờ</th>
                    <th className="px-6 py-3">Giá</th>
                    <th className="px-6 py-3">Thanh toán</th>
                    <th className="px-6 py-3 text-center">Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b border-gray-700
                                 hover:bg-yellow-500/10 transition"
                    >
                      <td className="px-6 py-4 font-medium">
                        {appointment.services.map((s) => s.name).join(", ")}
                      </td>

                      <td className="px-6 py-4">
                        {appointment.barber.username}
                      </td>

                      <td className="px-6 py-4">{appointment.shop.name}</td>

                      <td className="px-6 py-4">
                        {new Date(appointment.date).toLocaleDateString("vi-VN")}
                      </td>

                      <td className="px-6 py-4">
                        {formatCustomDateTime(appointment.startTime)}
                      </td>

                      <td className="px-6 py-4 text-yellow-400 font-semibold">
                        {appointment.price.toLocaleString()} đ
                      </td>

                      <td className="px-6 py-4 text-center">
                        {appointment.paid ? (
                          <span className="flex items-center justify-center gap-1 text-green-400">
                            <FaCheckCircle /> Đã thanh toán
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1 text-red-400">
                            <FaTimesCircle /> Chưa thanh toán
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 flex justify-center gap-3">
                        {appointment.paid ? (
                          <button
                            onClick={() => openFeedbackForm(appointment)}
                            className="bg-yellow-400 text-black px-4 py-1.5
                                       rounded-full font-semibold text-sm
                                       hover:bg-yellow-500 transition shadow"
                          >
                            Gửi Feedback
                          </button>
                        ) : (
                          <a
                            href={`/payment-vnpay?amount=${appointment.price}`}
                          >
                            <button
                              className="bg-red-500 text-white px-4 py-1.5
                                         rounded-full text-sm
                                         hover:bg-red-600 transition shadow
                                         whitespace-nowrap"
                            >
                              Thanh toán Online
                            </button>
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}

                  {appointments.length === 0 && (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-6 text-gray-400"
                      >
                        Không có lịch hẹn nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ===== FEEDBACK HISTORY ===== */}
            <div
              className="mt-12 bg-black/40 border border-yellow-500/30
                            rounded-2xl p-6 shadow-xl"
            >
              <h3
                className="text-xl font-bold text-yellow-400 mb-6
                             text-center uppercase tracking-wider"
              >
                Lịch sử Feedback
              </h3>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {feedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="bg-black/60 border border-gray-700
                               rounded-xl p-4 shadow
                               hover:shadow-yellow-500/20 transition"
                  >
                    <p>
                      <span className="text-yellow-400 font-semibold">
                        Shop:
                      </span>{" "}
                      {fb.shopName}
                    </p>
                    <p>
                      <span className="text-yellow-400 font-semibold">
                        Barber:
                      </span>{" "}
                      {fb.barberName}
                    </p>
                    <p className="text-yellow-400">{"★".repeat(fb.rating)}</p>
                    <p className="text-gray-300">{fb.comment}</p>
                    <p className="text-sm text-gray-500">
                      {fb.createdAt[2]}/{fb.createdAt[1]}/{fb.createdAt[0]}{" "}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* MODAL FEEDBACK */}
        {showModal && (
          <FeedbackForm
            show={showModal}
            onHide={() => setShowModal(false)}
            appointment={selectedAppointment}
          />
        )}
      </div>
    </div>
  );
}
