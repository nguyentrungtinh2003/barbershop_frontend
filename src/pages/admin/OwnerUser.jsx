import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, restoreUser } from "../../services/userServices";
import { getShopsById } from "../../services/shopServices";
import {
  FaTrashAlt,
  FaEdit,
  FaPlus,
  FaLock,
  FaLockOpen,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { useParams } from "react-router-dom";

export default function OwnerUser() {
  const [users, setUsers] = useState([]);
  const [shop, setShop] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { id } = useParams();

  const fetchShop = async () => {
    setLoading(true);
    try {
      const res = await getShopsById(parseInt(id));
      setShop(res.data.data);
      setUsers(res.data.data.barbers);
    } catch (error) {
      console.error("Lỗi khi lấy shop:", error);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    // Tái lấy danh sách user từ shop
    fetchShop();
  };

  useEffect(() => {
    fetchShop();
  }, []);

  return (
    <div className="p-6 mx-auto bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      {/* THÔNG TIN SHOP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-gray-900 p-6 rounded-xl border border-yellow-400 shadow-lg">
        {/* Ảnh shop */}
        <div className="md:col-span-1 flex justify-center">
          <div className="w-52 h-52 rounded-xl overflow-hidden shadow-md border border-yellow-300">
            {shop.img ? (
              <img
                src={shop.img}
                alt="Shop"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-300">
                Không có ảnh
              </div>
            )}
          </div>
        </div>

        {/* Thông tin shop */}
        <div className="md:col-span-2 space-y-2">
          {/* <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            Thông tin Shop
          </h1> */}
          <p className="text-xl font-semibold">{shop.name}</p>
          {shop.slogan && (
            <p className="text-sm italic text-yellow-300">"{shop.slogan}"</p>
          )}
          <p className="text-sm text-gray-300">{shop.description}</p>
          <div className="">
            <p>
              <span className="font-semibold text-white">Địa chỉ:</span>{" "}
              {shop.address}
            </p>
            <p>
              <span className="font-semibold text-white">Email:</span>{" "}
              {shop.email}
            </p>
            <p>
              <span className="font-semibold text-white">SĐT:</span>{" "}
              {shop.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      {/* NÚT THÊM */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl hover:bg-yellow-500 flex items-center gap-2 shadow"
        >
          <FaPlus />
          Thêm Barber
        </button>
      </div>

      {/* BẢNG BARBER */}
      {loading ? (
        <div className="text-center text-gray-300">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-700">
          <table className="w-full text-sm text-left text-white bg-gray-800">
            <thead className="text-xs uppercase bg-yellow-400 text-black">
              <tr>
                <th className="px-6 py-3">Tên</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">SDT</th>
                <th className="px-6 py-3">Hình</th>
                <th className="px-6 py-3">Vai trò</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-700 ${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } hover:bg-gray-700 transition`}
                >
                  <td className="px-6 py-4 font-medium">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">
                    <img src={user.img} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-6 py-4 capitalize">{user.roleEnum}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        !user.deleted
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {!user.deleted ? (
                        <FaCheckCircle className="text-lg" />
                      ) : (
                        <FaTimesCircle className="text-lg" />
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEditModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>
                    {user.deleted === false ? (
                      <button
                        onClick={async () => {
                          await deleteUser(user.id);
                          fetchUsers();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                        title="Khoá"
                      >
                        <FaLock />
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          await restoreUser(user.id);
                          fetchUsers();
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                        title="Mở khoá"
                      >
                        <FaLockOpen />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-400">
                    Không có người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal Thêm */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
          <div className="bg-black border border-yellow-400 p-6 rounded-lg w-full max-w-xl text-white shadow-xl">
            <AddUser
              onClose={() => {
                setShowAddModal(false);
                fetchUsers();
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Sửa */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
          <div className="bg-black border border-yellow-400 p-6 rounded-lg w-full max-w-xl text-white shadow-xl">
            <EditUser
              user={selectedUser}
              onClose={() => {
                setShowEditModal(false);
                setSelectedUser(null);
                fetchUsers();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
