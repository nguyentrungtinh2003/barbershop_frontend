import React, { useState, useEffect } from "react";
import { updateShop } from "../../services/shopServices";
import { getAllUsers } from "../../services/userServices";
import Select from "react-select";
import { toast } from "react-toastify";
export default function EditShop({ shop, onClose }) {
  const [formData, setFormData] = useState({
    name: shop.name,
    email: shop.email,
    phoneNumber: shop.phoneNumber,
    address: shop.address,
    slogan: shop.slogan,
    description: shop.description,
    ownerId: shop.owner.id,
  });
  const [img, setImg] = useState(null);
  const [imgPre, setImgPre] = useState(shop.img);
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const response = await getAllUsers();

    const options = response.data.data.map((user) => ({
      value: user.id,
      label: user.username,
    }));
    setUsers(options);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSelectOwnerChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      ownerId: selectedOption?.value || "",
    }));
  };

  const handleSelectBarberChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      barbers: selectedOption
        ? selectedOption.map((option) => option.value)
        : [],
    }));
  };

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
      toast.success("Cập nhật thành công");
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      toast.error("Cập nhật thất bại");
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

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-h-[80vh] overflow-y-auto scrollbar-thin pr-2"
      >
        {/* Grid input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Chọn chủ sở hữu */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Chủ sở hữu
            </label>
            <Select
              options={users}
              onChange={handleSelectOwnerChange}
              value={
                users.find((option) => formData.ownerId === option.value) ||
                null
              }
              className="bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow"
              placeholder="-- Chọn chủ sở hữu --"
              isClearable
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

          {/* Chọn barber */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Barbers
            </label>
            <Select
              isMulti
              options={users}
              onChange={handleSelectBarberChange}
              // value={
              //   Array.isArray(formData.barbers) &&
              //   users.filter((option) =>
              //     formData.barbers.map(
              //       (barber) => barber.id.some(option.value) || []
              //     )
              //   )
              // }
              className="bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow"
              placeholder="-- Chọn barber --"
              isClearable
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

          {/* Các input text */}
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Tên cửa hàng"
            required
            className="px-4 py-2 rounded-lg bg-gray-700 col-span-2"
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
            className="px-4 py-2 rounded-lg bg-gray-700 col-span-2"
          />
          <input
            type="text"
            name="slogan"
            value={formData.slogan || ""}
            onChange={handleChange}
            placeholder="Slogan"
            className="px-4 py-2 rounded-lg bg-gray-700 col-span-2"
          />
        </div>

        {/* File input + ảnh */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Ảnh cửa hàng
          </label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700"
          />
          <div className="mt-3">
            <img
              src={img ? URL.createObjectURL(img) : imgPre}
              alt="Ảnh cửa hàng"
              className="w-40 h-40 object-cover rounded-lg border-2 border-yellow-400"
            />
          </div>
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Mô tả
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Mô tả"
            className="w-full px-4 py-2 rounded-lg bg-gray-700"
            rows={3}
          ></textarea>
        </div>

        {/* Nút lưu */}
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
