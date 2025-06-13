import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();  // <— hook dùng để điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email);  // Lưu user vào localStorage
      // Redirect sang dashboard theo role của user
      navigate(`/${user.role.toLowerCase()}/dashboard`, { replace: true });
    } catch (err) {
      alert("Sai email");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
      <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
      <input
        type="email"
        placeholder="Nhập email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Đăng nhập
      </button>
    </form>
  );
}
