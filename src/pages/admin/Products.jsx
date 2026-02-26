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
import Swal from "sweetalert2";
import AddProduct from "./AddProduct";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const size = 4;
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProducts = async (currentPage = page) => {
    setLoading(true);
    try {
      const res = await getProducts(currentPage, size);
      setProducts(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      setPage(currentPage);
      console.log(res.data.data.content);
    } catch (error) {
      console.error("Lỗi lấy danh sách sản phẩm:", error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    const res = await searchProduct(keyword, 0, 6);
    setProducts(res.data.data.content);
    setTotalPages(res.data.data.totalPages);
    setPage(currentPage);

    if (!keyword) {
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePrevPage = () => {
    if (page > 0) fetchProducts(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) fetchProducts(page + 1);
  };

  return (
    <div className="p-6 mx-auto bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">Quản lý sản phẩm</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl hover:bg-yellow-500 flex items-center gap-2 shadow"
        >
          <FaPlus />
          Thêm sản phẩm
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
                  <th className="px-6 py-3">Mô tả</th>
                  <th className="px-6 py-3">Giá</th>
                  <th className="px-6 py-3">Hình</th>
                  <th className="px-6 py-3">Số lượng</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4">{product.description}</td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4">{product.quantity}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          !product.deleted
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {!product.deleted ? (
                          <FaCheckCircle className="text-lg" />
                        ) : (
                          <FaTimesCircle className="text-lg" />
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-4">
                      <a href={`/owner/products/${product.id}`}>
                        <button
                          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded transition"
                          title="Xem thông tin"
                        >
                          <FaEye />
                        </button>
                      </a>

                      <button
                        onClick={() => {
                          setSelectedShop(product);
                          setShowEditModal(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      {!product.deleted ? (
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
                              await deleteProduct(product.id);
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
                              await restoreProduct(product.id);
                              fetchProducts();
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
                      Không có sản phẩm nào.
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
            <AddProduct
              onClose={() => {
                setShowAddModal(false);
                fetchProducts();
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Sửa */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
          <div className="bg-black border border-yellow-400 p-6 rounded-lg w-full max-w-xl text-white shadow-xl">
            <EditProduct
              product={selectedProduct}
              onClose={() => {
                setShowEditModal(false);
                setSelectedProduct(null);
                fetchProducts();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
