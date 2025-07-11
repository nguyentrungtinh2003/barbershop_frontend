import { useState } from "react";
import { register } from "../../services/userServices";
import { toast } from "react-toastify";

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
        formDataToSend.append("img", img);
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

      toast.success("Thêm thành công");
      onAdd && onAdd(); // gọi callback nếu có
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      toast.error("Thêm thất bại");
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
          className="bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow"
        >
          styles=
          {{
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
          <option value="OWNER">Chủ tiệm</option>
          <option value="BARBER">Thợ cắt</option>
          <option value="CUSTOMER">Khách hàng</option>
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
