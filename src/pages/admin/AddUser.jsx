import { useState } from "react";
import { register } from "../../services/userServices";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { PiDivideFill } from "react-icons/pi";

export default function AddUser({ onAdd, onClose }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    birthDay: "",
    roleEnum: "CUSTOMER",
    description: "",
    shopId: id,
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

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      if (img) {
        formDataToSend.append("img", img);
      }

      // Tạo object user (loại bỏ file)
      const user = { ...formData };
      user.birthDay = formData.birthDay;
      // Gửi user dưới dạng JSON blob
      formDataToSend.append(
        "user",
        new Blob([JSON.stringify(user)], { type: "application/json" }),
      );

      console.log("Dữ liệu gửi đi:", {
        formDataToSend: JSON.parse(await formDataToSend.get("user").text()),
        img: formDataToSend.get("img"),
      });
      const res = await register(formDataToSend);
      if (!res || res.status !== 200) {
        throw new Error("Đăng ký thất bại");
      }
      toast.success("Thêm thành công");
      onAdd && onAdd(); // gọi callback nếu có
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Lỗi thêm người dùng:", error.message);
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

      <div className="space-y-4">
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
          className="w-full px-3 py-2 rounded bg-gray-800 text-white"
        />

        <select
          name="roleEnum"
          value={formData.roleEnum}
          onChange={handleChange}
          className="bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow"
        >
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
          type="button"
          onClick={() => handleSubmit()}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          Thêm người dùng
        </button>
      </div>
    </div>
  );
}
