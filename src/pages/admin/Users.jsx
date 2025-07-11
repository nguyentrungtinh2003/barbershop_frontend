import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, restoreUser } from "../../services/userServices";
import {
  FaTrashAlt,
  FaEdit,
  FaPlus,
  FaLock,
  FaLockOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { searchUser } from "../../services/userServices";
import Swal from "sweetalert2";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [keyword, setKeyword] = useState("");

  // Phân trang
  const [page, setPage] = useState(0);
  const size = 6;
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async (currentPage = page) => {
    setLoading(true);
    try {
      const res = await getUsers(currentPage, size);
      setUsers(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      setPage(currentPage);
    } catch (error) {
      console.error("Lỗi lấy danh sách người dùng:", error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    const res = await searchUser(keyword, 0, 6);
    setUsers(res.data.data.content);
    setUsers(res.data.data.content);
    setTotalPages(res.data.data.totalPages);
    setPage(currentPage);

    if (!keyword) {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePrevPage = () => {
    if (page > 0) fetchUsers(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) fetchUsers(page + 1);
  };

  return (
    <div className="p-6 mx-auto bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">
          Quản lý người dùng
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl hover:bg-yellow-500 flex items-center gap-2 shadow"
        >
          <FaPlus />
          Thêm người dùng
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm kiếm người dùng..."
          className="px-4 py-2 w-full md:w-1/3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow"
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-xl shadow"
        >
          <FaSearch />
          {keyword ? `Tìm ${keyword}` : "Tìm ..."}
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-300">Đang tải...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-black/20 rounded-xl overflow-hidden shadow-lg">
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
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="px-6 py-4 font-medium">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phoneNumber}</td>
                    <td className="px-6 py-4">
                      <img src={user.img} className="w-10 h-10"></img>
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
                    <td className="px-6 py-4 flex justify-center gap-4">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      {user.deleted === false ? (
                        <button
                          onClick={async () => {
                            const result = await Swal.fire({
                              title: "Bạn có chắc muốn khoá ?",
                              text: "",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Khoá",
                              cancelButtonText: "Huỷ",
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#aaa",
                            });

                            if (result.isConfirmed) {
                              await deleteUser(user.id); // Gọi API xoá
                              fetchUsers(); // Load lại danh sách
                              Swal.fire("Đã khoá", "", "success");
                            }
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                          title="Khoá"
                        >
                          <FaLock />
                        </button>
                      ) : (
                        <button
                          onClick={async () => {
                            const result = await Swal.fire({
                              title: "Bạn có chắc muốn mở khoá ?",
                              text: "",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Mở khoá",
                              cancelButtonText: "Huỷ",
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#aaa",
                            });

                            if (result.isConfirmed) {
                              await restoreUser(user.id);
                              fetchUsers();
                              Swal.fire("Đã mở khoá", "", "success");
                            }
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
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
                    <td colSpan="5" className="text-center py-4 text-gray-400">
                      Không có người dùng nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          <div className="flex justify-center mt-6 gap-4 items-center">
            <button
              onClick={handlePrevPage}
              disabled={page === 0}
              className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50"
            >
              Trước
            </button>
            <span>
              Trang <strong>{page + 1}</strong> / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </>
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
