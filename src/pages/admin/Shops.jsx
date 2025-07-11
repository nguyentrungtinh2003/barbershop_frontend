import React, { useEffect, useState } from "react";
import {
  getShops,
  deleteShop,
  restoreShop,
  getShopsByOwnerId,
  searchShop,
} from "../../services/shopServices";
import {
  FaTrashAlt,
  FaEdit,
  FaPlus,
  FaLock,
  FaLockOpen,
  FaTimesCircle,
  FaCheckCircle,
  FaEye,
  FaRegCalendarCheck,
  FaCoins,
  FaSearch,
} from "react-icons/fa";
import AddShop from "./AddShop";
import EditShop from "./EditShop";
import Swal from "sweetalert2";
export default function Shops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const size = 6;
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchShops = async (currentPage = page) => {
    setLoading(true);
    try {
      console.log(user.roleEnum);
      if (user.roleEnum === "ADMIN") {
        const res = await getShops(currentPage, size);
        setShops(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
        setPage(currentPage);
        console.log(res.data.data.content);
      }
      if (user.roleEnum === "OWNER") {
        const res = await getShopsByOwnerId(user.id);
        setShops(res.data.data);
        console.log(res.data.data);
        // setTotalPages(res.data.data.totalPages);
        // setPage(currentPage);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách cửa hàng:", error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    const res = await searchShop(keyword, 0, 6);
    setShops(res.data.data.content);
    setTotalPages(res.data.data.totalPages);
    setPage(currentPage);

    if (!keyword) {
      fetchShops();
    }
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

      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm kiếm shop..."
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
                  <th className="px-6 py-3">Số điện thoại</th>
                  <th className="px-6 py-3">Địa chỉ</th>
                  <th className="px-6 py-3">Chủ tiệm</th>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          className="w-12 h-12 rounded-full object-cover border border-gray-500"
                          src={shop.owner?.img}
                          alt={shop.owner?.username || "avatar"}
                        />
                        <p className="font-medium text-white">
                          {shop.owner?.username || "Không rõ"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 italic">{shop.slogan}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          !shop.deleted
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {!shop.deleted ? (
                          <FaCheckCircle className="text-lg" />
                        ) : (
                          <FaTimesCircle className="text-lg" />
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-4">
                      <a href={`/owner/appointment/shop/${shop.id}`}>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                          title="Xem lịch hẹn"
                        >
                          <FaRegCalendarCheck />
                        </button>
                      </a>
                      <a href={`/owner/barber/shop/${shop.id}`}>
                        <button
                          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded transition"
                          title="Xem thông tin"
                        >
                          <FaEye />
                        </button>
                      </a>
                      <a href={`/owner/payments/shop/${shop.id}`}>
                        <button
                          className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded transition"
                          title="Xem doanh thu"
                        >
                          <FaCoins />
                        </button>
                      </a>
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
                              await deleteShop(shop.id);
                              fetchShops();
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
                              await restoreShop(shop.id);
                              fetchShops();
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
