import React, { useState } from "react";
import { updateShop } from "../../services/shopServices";

export default function EditShop({ shop, onClose }) {
  const [formData, setFormData] = useState(shop);
  const [img, setImg] = useState(null);
  const [imgPre, setImgPre] = useState(shop.img);

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
      data.append(
        "shop",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );

      if (img) {
        data.append("img", img);
      }

      await updateShop(shop.id, data);
      alert("Cập nhật cửa hàng thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi cập nhật cửa hàng:", error);
    }
  };

  if (!formData) return <div className="p-4">Đang tải cửa hàng...</div>;

  return (
    <div className="p-6 bg-gray-800 rounded-2xl shadow-xl text-white max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">
          Chỉnh sửa cửa hàng
        </h2>
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-300 text-lg font-semibold"
        >
          ✖
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Tên cửa hàng"
            required
            className="px-4 py-2 rounded-lg bg-gray-700"
          />
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email"
            required
            className="px-4 py-2 rounded-lg bg-gray-700"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="px-4 py-2 rounded-lg bg-gray-700"
          />
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Địa chỉ"
            className="px-4 py-2 rounded-lg bg-gray-700"
          />
          <input
            type="text"
            name="slogan"
            value={formData.slogan || ""}
            onChange={handleChange}
            placeholder="Slogan"
            className="px-4 py-2 rounded-lg bg-gray-700"
          />
        </div>

        {/* File input */}
        <div>
          <label className="block mb-1 font-medium text-gray-300">
            Ảnh cửa hàng
          </label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700"
          />
          {/* Hiển thị ảnh nếu có */}
          <div className="mt-4">
            <img
              src={img ? URL.createObjectURL(img) : imgPre}
              alt="Ảnh cửa hàng"
              className="w-40 h-40 object-cover rounded-lg border-2 border-yellow-400"
            />
          </div>
        </div>

        {/* Mô tả */}
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Mô tả"
          className="w-full px-4 py-2 rounded-lg bg-gray-700"
          rows={3}
        ></textarea>

        <div className="text-right">
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold"
          >
            💾 Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
