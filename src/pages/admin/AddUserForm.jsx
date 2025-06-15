import { useState } from "react";

export default function AddUserForm({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "User",
    status: "active",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // gọi hàm từ Users.jsx để thêm user
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "User",
      status: "active",
    });
    onClose(); // đóng modal
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Thêm người dùng</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-red-500 hover:underline"
        >
          Đóng
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-700 p-4 rounded-xl"
      >
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Tên"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Số điện thoại"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="flex gap-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="px-3 py-2 bg-gray-800 text-white rounded"
          >
            <option value="Admin">Admin</option>
            <option value="Owner">Owner</option>
            <option value="Barber">Barber</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-3 py-2 bg-gray-800 text-white rounded"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Đã khoá</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          Thêm người dùng
        </button>
      </form>
    </div>
  );
}
