import { useState } from "react";
import axios from "axios";
import { register } from "../../services/userServices";

export default function AddUser({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    birthDay: "",
    roleEnum: "CUSTOMER",
    description: "",
  });

  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      if (img) {
        formDataToSend.append("img", formData.img);
      }

      // Tạo object user (loại bỏ file)
      const user = { ...formData };
      user.birthDay = formData.birthDay + "T00:00:00";
      // Gửi user dưới dạng JSON blob
      formDataToSend.append(
        "user",
        new Blob([JSON.stringify(user)], { type: "application/json" })
      );

      const res = await register(formDataToSend);

      alert("Thêm người dùng thành công!");
      onAdd && onAdd(); // gọi callback nếu có
      onClose(); // đóng form
    } catch (error) {
      console.error("Lỗi thêm người dùng:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-700 rounded-xl text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Thêm người dùng</h2>
        <button onClick={onClose} className="text-red-400 hover:underline">
          Đóng
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Tên người dùng"
          className="w-full px-3 py-2 rounded bg-gray-800"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className="w-full px-3 py-2 rounded bg-gray-800"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Mật khẩu"
          className="w-full px-3 py-2 rounded bg-gray-800"
        />

        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Số điện thoại"
          className="w-full px-3 py-2 rounded bg-gray-800"
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Địa chỉ"
          className="w-full px-3 py-2 rounded bg-gray-800"
        />

        <input
          type="date"
          name="birthDay"
          value={formData.birthDay}
          onChange={handleChange}
          placeholder="Ngày sinh"
          className="w-full px-3 py-2 rounded bg-gray-800"
        />

        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full px-3 py-2 rounded bg-gray-800 text-white"
        />

        <select
          name="roleEnum"
          value={formData.roleEnum}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-800"
        >
          <option value="ADMIN">Admin</option>
          <option value="OWNER">Owner</option>
          <option value="BARBER">Barber</option>
          <option value="USER">User</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Mô tả"
          className="w-full px-3 py-2 rounded bg-gray-800"
        ></textarea>

        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          Thêm người dùng
        </button>
      </form>
    </div>
  );
}
