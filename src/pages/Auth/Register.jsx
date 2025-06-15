import React, { useState } from "react";
import { FiLock, FiUser, FiPhone, FiMail, FiImage } from "react-icons/fi";
import { Link } from "react-router-dom";
import { register } from "../../services/userServices";

export default function Register() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: name,
      phoneNumber: phone,
      email,
      password,
    };

    const formData = new FormData();
    formData.append(
      "user",
      new Blob([JSON.stringify(user)], { type: "application/json" })
    );
    if (img) {
      formData.append("img", img);
    }

    const response = await register(formData);
    if (response?.status === 200) {
      alert("Đăng ký thành công!");
    } else {
      alert("Đăng ký thất bại!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full h-full px-2 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 relative">
      <div className="absolute inset-0 bg-[url('/barbershop-background.jpg')] bg-cover bg-center opacity-20"></div>

      <form
        className="relative z-10 bg-white/10 backdrop-blur-lg p-5 rounded-3xl shadow-2xl w-full max-w-md border border-white/20"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-6">
          <img
            src={
              "https://marketplace.canva.com/EAFzl_fI3WU/1/0/1600w/canva-red-and-black-illustrative-barber-shop-logo-A5183UnPgkI.jpg"
            }
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
          />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-8 font-serif drop-shadow-lg">
          Đăng ký tài khoản
        </h2>

        <div className="relative mb-6">
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-xl" />
          <input
            type="text"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="relative mb-6">
          <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-xl" />
          <input
            type="tel"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="relative mb-6">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-xl" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="relative mb-6">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-xl" />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="relative mb-6 flex">
          <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-xl" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <img
            src={
              preview ||
              "https://marketplace.canva.com/EAFzl_fI3WU/1/0/1600w/canva-red-and-black-illustrative-barber-shop-logo-A5183UnPgkI.jpg"
            }
            alt="Avatar"
            className="w-13 ml-2 h-13 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold text-lg shadow-md hover:scale-105 transition"
        >
          Đăng ký
        </button>

        <div className="mt-6 text-center text-sm text-white">
          <p>
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-yellow-400 font-semibold hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
