import React, { useEffect, useState } from "react";
import { getShops, deleteShop, restoreShop } from "../../services/shopServices";
import { FaTrashAlt, FaEdit, FaPlus, FaLock, FaLockOpen } from "react-icons/fa";
import AddShop from "./AddShop";
import EditShop from "./EditShop";
export default function Shops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const size = 6;
  const [totalPages, setTotalPages] = useState(0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const fetchShops = async (currentPage = page) => {
    setLoading(true);
    try {
      const res = await getShops(currentPage, size);
      setShops(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      setPage(currentPage);
    } catch (error) {
      console.error("Lỗi lấy danh sách cửa hàng:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handlePrevPage = () => {
    if (page > 0) fetchShops(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) fetchShops(page + 1);
  };

  return (
    <div className="p-6 mx-auto bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">Quản lý cửa hàng</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl hover:bg-yellow-500 flex items-center gap-2 shadow"
        >
          <FaPlus />
          Thêm cửa hàng
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
                  <th className="px-6 py-3">Số điện thoại</th>
                  <th className="px-6 py-3">Địa chỉ</th>
                  <th className="px-6 py-3">Slogan</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {shops.map((shop) => (
                  <tr
                    key={shop.id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="px-6 py-4 font-medium">{shop.name}</td>
                    <td className="px-6 py-4">{shop.email}</td>
                    <td className="px-6 py-4">{shop.phoneNumber}</td>
                    <td className="px-6 py-4">{shop.address}</td>
                    <td className="px-6 py-4 italic">{shop.slogan}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          !shop.deleted
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {!shop.deleted ? "Hoạt động" : "Đã khoá"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-4">
                      <button
                        onClick={() => {
                          setSelectedShop(shop);
                          setShowEditModal(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      {!shop.deleted ? (
                        <button
                          onClick={async () => {
                            await deleteShop(shop.id);
                            fetchShops();
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                          title="Khoá"
                        >
                          <FaLock />
                        </button>
                      ) : (
                        <button
                          onClick={async () => {
                            await restoreShop(shop.id);
                            fetchShops();
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
                {shops.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-400">
                      Không có cửa hàng nào.
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
            <AddShop
              onClose={() => {
                setShowAddModal(false);
                fetchShops();
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Sửa */}
      {showEditModal && selectedShop && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
          <div className="bg-black border border-yellow-400 p-6 rounded-lg w-full max-w-xl text-white shadow-xl">
            <EditShop
              shop={selectedShop}
              onClose={() => {
                setShowEditModal(false);
                setSelectedShop(null);
                fetchShops();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
