import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/userServices";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUser";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi khi tải người dùng", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá người dùng này?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 flex items-center gap-2"
        >
          <FaPlus />
          Thêm người dùng
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-200 bg-gray-800 rounded-xl shadow-md">
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th className="px-6 py-3">Tên</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Vai trò</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.status === "active" ? "Hoạt động" : "Đã khoá"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-4 justify-center">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEditModal(true);
                      }}
                      className="text-blue-400 hover:text-blue-600 transition"
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-400 hover:text-red-600 transition"
                      title="Xoá"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
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
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl">
            <AddUserForm
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
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl">
            <EditUserForm
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
