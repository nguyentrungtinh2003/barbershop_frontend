import React, { useState } from "react";
import { updateUser } from "../../services/userServices";
import { toast } from "react-toastify";

export default function EditUser({ user, onClose }) {
  const [formData, setFormData] = useState(user);
  const [img, setImg] = useState(null);
  const [imgPre, setImgPre] = useState(user.img);

  const userLogin = JSON.parse(localStorage.getItem("user"));
  const role = userLogin.roleEnum;

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
      const data = new FormData();

      const userData = {
        ...formData,
        birthDay: formData.birthDay ? `${formData.birthDay}T00:00:00` : null, // hoặc undefined nếu backend chấp nhận
      };

      data.append(
        "user",
        new Blob([JSON.stringify(userData)], { type: "application/json" })
      );

      if (img) {
        data.append("img", img);
      }

      await updateUser(user.id, data);
      toast.success("Cập nhật thành công");
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  if (!formData) return <div className="p-4">Đang tải người dùng...</div>;

  return (
    <div className="p-6 bg-gray-800 rounded-2xl shadow-xl text-white max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">
          Chỉnh sửa người dùng
        </h2>
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-300 text-lg font-semibold"
        >
          ✖
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            placeholder="Tên người dùng"
            required
            className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email"
            required
            className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none"
          />
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Địa chỉ"
            className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none"
          />
          <input
            type="date"
            name="birthDay"
            value={formData.birthDay ? formData.birthDay.slice(0, 10) : ""}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none"
          />
          <select
            name="roleEnum"
            value={formData.roleEnum || "USER"}
            onChange={handleChange}
            className="bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow"
            disabled={role !== "ADMIN"}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#1f2937", // bg-gray-800
                borderColor: "#4b5563", // border-gray-600
                color: "white",
                borderRadius: "0.75rem",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#facc15", // hover: yellow-400
                },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#facc15"
                  : state.isFocused
                  ? "#374151"
                  : "#1f2937",
                color: state.isSelected ? "black" : "white",
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#facc15",
                color: "black",
                borderRadius: "0.5rem",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "black",
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: "black",
                ":hover": {
                  backgroundColor: "#f59e0b",
                  color: "white",
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: "#9ca3af", // text-gray-400
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#1f2937", // dropdown bg
                borderRadius: "0.75rem",
                overflow: "hidden",
              }),
            }}
          >
            <option value="ADMIN">Admin</option>
            <option value="OWNER">Owner</option>
            <option value="BARBER">Barber</option>
            <option value="USER">User</option>
          </select>
        </div>

        {/* File input */}
        <div>
          <label className="block mb-1 font-medium text-gray-300">
            Ảnh đại diện
          </label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 focus:outline-none"
          />
          {/* Hiển thị ảnh nếu có */}
          <div className="mt-4">
            <img
              src={img ? URL.createObjectURL(img) : imgPre}
              alt="Ảnh đại diện"
              className="w-32 h-32 object-cover rounded-full border-2 border-yellow-400"
            />
          </div>
        </div>

        {/* Mô tả */}
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Mô tả"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 focus:outline-none"
          rows={3}
        ></textarea>

        {/* Nút lưu */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold transition duration-200"
          >
            💾 Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
