import { useEffect, useState } from "react";
import { getUserById } from "../../services/userServices";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  const fetchUserInfo = async () => {
    const res = await getUserById(id);
    setUser(res.data.data);
    if (!res.data.data) {
      alert("Bạn không có quyền truy cập vào !");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-3xl border border-yellow-500">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={user?.img || "/user.jpg"}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-yellow-500 shadow-md hover:scale-105 transition duration-300"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">
              @{user?.username}
            </h1>
            <p className="text-gray-300 mb-1">
              📧 Email: <span className="text-white">{user?.email}</span>
            </p>
            <p className="text-gray-300 mb-1">
              📞 Số điện thoại:{" "}
              <span className="text-white">{user?.phoneNumber}</span>
            </p>
            <p className="text-gray-300 mb-1">
              📍 Địa chỉ: <span className="text-white">{user?.address}</span>
            </p>
            <p className="text-gray-300 mb-1">
              🎂 Ngày sinh: <span className="text-white"></span>
            </p>
            <p className="text-gray-300 mb-1">
              🧑 Vai trò: <span className="text-white">{user?.roleEnum}</span>
            </p>
            <p className="text-gray-300 mb-1">
              🗑️ Trạng thái:{" "}
              <span
                className={user?.isDeleted ? "text-red-400" : "text-green-400"}
              >
                {user?.isDeleted ? "Đã xoá" : "Đang hoạt động"}
              </span>
            </p>
            <p className="text-gray-300 mt-2 italic">"{user?.description}"</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-yellow-500 text-black font-bold px-6 py-2 rounded-xl shadow hover:bg-yellow-400 transition duration-300">
            ✏️ Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
}
