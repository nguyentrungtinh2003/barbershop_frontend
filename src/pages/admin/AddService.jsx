import React, { useEffect, useState } from "react";
import { createService } from "../../services/serviceServices";
import { getAllShops } from "../../services/shopServices";
import Select from "react-select";

export default function AddService({ onClose }) {
  const [shops, setShops] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    shopId: "",
  });

  const [img, setImg] = useState(null);

  const fetchShops = async () => {
    const res = await getAllShops();
    setShops(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSelectChange = (selectedOption) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     ownerId: selectedOption?.value || "",
  //   }));
  // };

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append(
        "service",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );

      if (img) {
        data.append("img", img);
      }

      await createService(data);
      alert("Tạo dịch vụ thành công!");
      console.log("form data", formData);
    } catch (error) {
      console.error("Lỗi khi tạo dịch vụ:", error);
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
          <label className="block mb-1 text-sm">Hình ảnh</label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
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
          <label className="block mb-1 text-sm">Shop</label>
          <Select
            name="shop"
            // value={shops.filter((shop) => shop.id == formData.shopId)}
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                shopId: selected.id || "",
              }))
            }
            options={shops}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            className="text-black"
            placeholder="Chọn Shop"
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
