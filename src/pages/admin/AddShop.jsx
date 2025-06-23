import { useEffect, useState } from "react";
import { createShop } from "../../services/shopServices";
import { getAllUsers } from "../../services/userServices";
import Select from "react-select";

export default function AddShop({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    slogan: "",
    description: "",
    ownerId: "",
  });

  const [users, setUsers] = useState([]);
  const [img, setImg] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      ownerId: selectedOption?.value || "",
    }));
  };

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      if (img) {
        formDataToSend.append("img", img);
      }

      formDataToSend.append(
        "shop",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );

      await createShop(formDataToSend);

      alert("Thêm cửa hàng thành công!");
      onAdd && onAdd();
      onClose();
    } catch (error) {
      console.error("Lỗi thêm cửa hàng:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-700 rounded-xl text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Thêm cửa hàng</h2>
        <button onClick={onClose} className="text-red-400 hover:underline">
          Đóng
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          options={users}
          onChange={handleSelectChange}
          className="text-black"
          placeholder="-- Chọn chủ sở hữu --"
          isClearable
        />

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Tên cửa hàng"
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
          type="text"
          name="slogan"
          value={formData.slogan}
          onChange={handleChange}
          placeholder="Slogan"
          className="w-full px-3 py-2 rounded bg-gray-800"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Mô tả"
          className="w-full px-3 py-2 rounded bg-gray-800"
        ></textarea>

        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full px-3 py-2 rounded bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          Thêm cửa hàng
        </button>
      </form>
    </div>
  );
}
