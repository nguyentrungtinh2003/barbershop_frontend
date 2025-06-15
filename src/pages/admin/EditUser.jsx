import React, { useState } from "react";
import {updateUser } from "../../services/userServices";

export default function EditUserForm({ user, onClose }) {
  const [formData, setFormData] = useState(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(user.id, formData);
    onClose(); // Đóng modal sau khi cập nhật
  };

  if (!formData) return <div className="p-4">Đang tải người dùng...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Chỉnh sửa người dùng</h2>
        <button
          onClick={onClose}
          className="text-red-500 font-semibold hover:underline"
        >
          Đóng ✖
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 text-white p-6 rounded-xl">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 bg-gray-800 rounded"
          placeholder="Tên"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 bg-gray-800 rounded"
          placeholder="Email"
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-3 py-2 bg-gray-800 rounded"
        >
          <option value="Admin">Admin</option>
          <option value="Owner">Owner</option>
          <option value="Barber">Barber</option>
        </select>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-3 py-2 bg-gray-800 rounded"
        >
          <option value="active">Hoạt động</option>
          <option value="inactive">Đã khoá</option>
        </select>
        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
