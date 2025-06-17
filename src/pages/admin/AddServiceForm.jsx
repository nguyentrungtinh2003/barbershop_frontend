import React, { useState } from "react";
import { createService } from "../../services/serviceServices";

export default function AddServiceForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "active", // hoặc "inactive"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createService(formData);
      alert("Tạo dịch vụ thành công!");
      onClose(); // Đóng modal và reload
    } catch (error) {
      console.error("Lỗi khi tạo dịch vụ:", error);
      alert("Tạo dịch vụ thất bại!");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        Thêm dịch vụ mới
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Tên dịch vụ</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Mô tả</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Giá (VNĐ)</label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Trạng thái</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngưng hoạt động</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
          >
            Huỷ
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 font-semibold"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
