import React, { use, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";
import { FiPhone, FiLock, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(username, password); // login() phải trả về user object có `roleEnum`

      if (user && user.roleEnum) {
        setTimeout(() => {
          navigate(`/${user.roleEnum.toLowerCase()}/dashboard`, {
            replace: true,
          });
        }, 3000);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Đăng nhập thành công");
      } else {
        toast.warning("Bạn không có quyền truy cập");
      }
    } catch (error) {
      console.error("Login thất bại:", error);
      toast.error("Đăng nhập thất bại");
    }
  };

  const loginGoogle = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  };

  return (
    <div className="w-full h-full px-2 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 relative">
      <div className="absolute inset-0 bg-[url('/barbershop-background.jpg')] bg-cover bg-center opacity-20"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://marketplace.canva.com/EAFzl_fI3WU/1/0/1600w/canva-red-and-black-illustrative-barber-shop-logo-A5183UnPgkI.jpg"
            alt="Barbershop Logo"
            className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
          />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-8 font-serif drop-shadow-lg">
          Đăng nhập tài khoản
        </h2>

        {/* Số điện thoại */}
        <div className="relative mb-6">
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-xl" />
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* Mật khẩu */}
        <div className="relative mb-6">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-xl" />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* Nút đăng nhập thường */}
        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
        >
          Đăng nhập
        </button>

        {/* Nút đăng nhập với Google */}
        <button
          onClick={() => loginGoogle()}
          className="mt-3 w-full py-3 rounded-2xl bg-white text-gray-700 border border-gray-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Đăng nhập với Google
        </button>

        {/* Điều hướng */}
        <div className="mt-6 text-center text-sm text-white">
          <p className="mb-2">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-yellow-400 font-semibold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
          <p>
            <Link
              to="/forgot-password"
              className="text-yellow-400 font-semibold hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
