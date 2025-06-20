import React, { useState } from "react";
import { updateService } from "../../services/serviceServices";

export default function EditService({ service, onClose }) {
  const [formData, setFormData] = useState(service);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateService(service.id, formData);
      alert("Cập nhật dịch vụ thành công!");
      onClose(); // đóng modal sau khi cập nhật
    } catch (error) {
      console.error("Lỗi cập nhật dịch vụ:", error);
    }
  };

  if (!formData) return <div className="p-4">Đang tải dịch vụ...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-yellow-400">Chỉnh sửa dịch vụ</h2>
        <button
          onClick={onClose}
          className="text-red-500 font-semibold hover:underline"
        >
          X
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-800 text-white p-6 rounded-xl"
      >
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 bg-gray-900 rounded"
          placeholder="Tên dịch vụ"
          required
        />
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 bg-gray-900 rounded"
          placeholder="Mô tả dịch vụ"
          rows="3"
        />
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full px-3 py-2 bg-gray-900 rounded"
          placeholder="Giá dịch vụ (VNĐ)"
          required
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-3 py-2 bg-gray-900 rounded"
        >
          <option value="active">Hoạt động</option>
          <option value="inactive">Ngưng hoạt động</option>
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
