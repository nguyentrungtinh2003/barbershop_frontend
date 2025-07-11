import React, { useState } from "react";
import { FiLock, FiMail, FiShield } from "react-icons/fi";
import { reset } from "../../services/authService";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning("2 mật khẩu không khớp");
      return;
    }
    await reset({ email, otp, password });
    location.replace("/login");
  };

  return (
    <div className="h-full w-full px-2 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 relative">
      <div className="absolute inset-0 bg-[url('/barbershop-background.jpg')] bg-cover bg-center opacity-20"></div>

      <form
        className="relative z-10 bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-6">
          <img
            src="https://marketplace.canva.com/EAFzl_fI3WU/1/0/1600w/canva-red-and-black-illustrative-barber-shop-logo-A5183UnPgkI.jpg"
            alt="Barbershop Logo"
            className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
          />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-8 font-serif drop-shadow-lg">
          Đặt lại mật khẩu
        </h2>

        <div className="relative mb-6">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-xl" />
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="relative mb-6">
          <FiShield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-xl" />
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="relative mb-6">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-xl" />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="relative mb-6">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-xl" />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold text-lg shadow-md hover:scale-105 transition"
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
}
