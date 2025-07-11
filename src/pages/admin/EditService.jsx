import React, { useState, useEffect } from "react";
import { updateService } from "../../services/serviceServices";
import { getAllShops } from "../../services/shopServices";
import Select from "react-select";
import { toast } from "react-toastify";

export default function EditService({ service, onClose }) {
  const [formData, setFormData] = useState(service);
  const [img, setImg] = useState(null);
  const [imgPre, setImgPre] = useState(service?.img || "");

  const [shops, setShops] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchShops = async () => {
    const res = await getAllShops();
    setShops(res.data.data);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      const serviceData = {
        ...formData,
      };

      data.append(
        "service",
        new Blob([JSON.stringify(serviceData)], { type: "application/json" })
      );

      if (img) {
        data.append("img", img);
      }

      await updateService(service.id, data);
      toast.success("Cập nhật thành công!");
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  if (!formData) return <div className="p-4">Đang tải dịch vụ...</div>;

  return (
    <div className="m-2 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-yellow-400">Chỉnh sửa dịch vụ</h2>
        <button
          onClick={onClose}
          className="text-red-500 font-semibold hover:underline"
        >
          X
        </button>
      </div>

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
          <label className="block mb-1 text-sm">Hình ảnh</label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
          {/* Hiển thị ảnh nếu có */}
          <div className="mt-4">
            <img
              src={img ? URL.createObjectURL(img) : imgPre}
              alt="Ảnh đại diện"
              className="w-20 h-20 object-cover rounded-full border-2 border-yellow-400"
            />
          </div>
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
          <label className="block mb-1 text-sm">Thời lượng (phút)</label>
          <input
            type="number"
            name="duration"
            required
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Shop</label>
          <Select
            name="services"
            value={shops.find((shop) => shop.id === formData.shopId)}
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                shopId: selected.id || "",
              }))
            }
            options={shops}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            className="bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow"
            placeholder="Chọn Shop"
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
          />
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
