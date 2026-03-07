import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaSearch,
  FaTimesCircle,
  FaRegCalendarCheck,
} from "react-icons/fa";

import { getOrderByShopId, searchOrder } from "../../services/orderServices";
import { useParams } from "react-router-dom";
import { addPayment } from "../../services/paymentServices";

export default function Payments() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [income, setIncome] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    const trimmedKeyword = keyword.trim();

    const result = await searchOrder(trimmedKeyword.toString(), page, size);
    setOrders(result.data.data.content);
    setTotalPages(result.data.data.totalPages);
    setPage(0); // Reset về trang đầu khi tìm kiếm
    if (searchKeyword === "") {
      fetchOrders();
    }
  };

  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const fetchIncome = () => {
    let total = 0;
    orders.forEach((order) => {
      if (order.status === "PAID") {
        total += order.totalAmount;
      }
    });
    setIncome(total);
  };

  useEffect(() => {
    fetchIncome();
  }, [orders]);

  console.log("Shop ID from params:", id);

  const fetchOrders = async () => {
    const res = await getOrderByShopId(parseInt(id), page, size);
    setOrders(res.data.data.content);
    setPage(res.data.data.pageable.pageNumber);
    setSize(res.data.data.pageable.pageSize);
    setTotalPages(res.data.data.totalPages);
    console.log("Orders:", res.data.data);
  };

  useEffect(() => {
    fetchOrders();
    setLoading(false);
  }, [id, page]);

  const formatCustomDateTime = (value) => {
    // value kiểu [2025,6,25,12] hoặc tương tự
    const hour = value[3];
    return `${hour}:00`;
  };

  const addPaymentCash = async (order) => {
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn thanh toán đơn hàng #${order.id} bằng tiền mặt?`,
    );

    if (confirmed) {
      const data = {
        userId: order.customer.id,
        orderId: order.id,
        amount: order.totalAmount,
        method: "CASH",
        paymentType: "PRODUCT",
      };
      await addPayment(data)
        .then((res) => {
          console.log("Thanh toán thành công:", res.data);
          fetchOrders(); // Cập nhật lại danh sách đơn hàng sau khi thanh toán
        })
        .catch((err) => {
          console.error("Lỗi khi thanh toán:", err);
        });
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold text-yellow-400">
            Lịch sử đơn hàng của shop
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Tổng thu nhập */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl 
               bg-yellow-500/20 text-yellow-400 text-sm font-semibold shadow w-fit"
          >
            <FaRegCalendarCheck />
            <span>Tổng thu nhập:</span>
            <span className="text-yellow-300 font-bold">
              {income.toLocaleString()} đ
            </span>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm order..."
              className="px-4 py-2 w-full md:w-72 rounded-xl 
                 bg-gray-800 text-white border border-gray-600
                 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow"
            />

            <button
              onClick={handleSearch}
              className="flex items-center gap-2 
                 bg-yellow-400 hover:bg-yellow-500 
                 text-black font-semibold 
                 px-4 py-2 rounded-xl shadow whitespace-nowrap"
            >
              <FaSearch />
              Tìm
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Đang tải...</div>
        ) : (
          <div
            className="relative max-h-[600px] overflow-auto rounded-2xl 
                      border border-yellow-500 bg-black/30 backdrop-blur-md shadow-2xl"
          >
            <table className="min-w-[1000px] w-full text-sm">
              <thead
                className="sticky top-0 bg-gradient-to-r 
                            from-yellow-400 to-yellow-500 text-black uppercase text-xs"
              >
                <tr>
                  <th className="px-6 py-3">Mã đơn</th>
                  <th className="px-6 py-3">Sản phẩm</th>
                  <th className="px-6 py-3">Khách hàng</th>
                  <th className="px-6 py-3">SDT</th>
                  <th className="px-6 py-3">Địa chỉ</th>
                  <th className="px-6 py-3">Tổng tiền</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3">Ngày đặt</th>
                  <th className="px-6 py-3">Thanh toán</th>
                  <th className="px-6 py-3 text-center">Hành động</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {orders?.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-800/60 transition duration-200"
                  >
                    {/* ID */}
                    <td className="px-6 py-4 font-semibold text-yellow-400">
                      #{order.id}
                    </td>

                    {/* Products */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {order.orderItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between bg-gray-800 px-3 py-1 rounded-lg"
                          >
                            <span className="text-gray-200 text-sm">
                              {item.product.name}
                            </span>
                            <span className="text-yellow-400 text-xs font-semibold">
                              x{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4 text-gray-200 font-medium">
                      {order.customer.username}
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 text-gray-400">
                      {order.customer.phoneNumber}
                    </td>

                    {/* Address */}
                    <td className="px-6 py-4 text-gray-400 max-w-[200px] truncate">
                      {order.customer.address}
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 font-bold text-yellow-400">
                      {order.totalAmount.toLocaleString()} đ
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide
          ${
            order.status === "CREATED"
              ? "bg-blue-500/20 text-blue-400"
              : order.status === "PENDING"
                ? "bg-yellow-500/20 text-yellow-400"
                : order.status === "PAID"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
          }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {order.createdAt[2]}/{order.createdAt[1]}/
                      {order.createdAt[0]}
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-4">
                      {order.status === "PAID" ? (
                        <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                          <FaCheckCircle />
                          Đã thanh toán
                        </span>
                      ) : (
                        <span className="text-red-400 text-sm font-medium">
                          Chưa thanh toán
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      {order.status !== "PAID" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => addPaymentCash(order)}
                            className="bg-yellow-500 hover:bg-yellow-600
                        text-black font-semibold
                        px-4 py-1.5 rounded-lg text-sm
                        transition"
                          >
                            Cash
                          </button>

                          <a
                            href={`/payment-vnpay?amount=${order.totalAmount}&orderId=${order.id}`}
                          >
                            <button
                              className="bg-red-500 hover:bg-red-600
                          text-white font-semibold
                          px-4 py-1.5 rounded-lg text-sm
                          transition"
                            >
                              VNPay
                            </button>
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center py-8 text-gray-400">
                      Không có đơn hàng nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-end items-center gap-4 p-4">
              <button
                onClick={() => prevPage()}
                disabled={page === 0}
                className="px-3 py-1 bg-gray-700 rounded-lg text-sm disabled:opacity-50"
              >
                Trước
              </button>
              <button
                onClick={() => nextPage()}
                disabled={page >= totalPages - 1}
                className="px-3 py-1 bg-gray-700 rounded-lg text-sm disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
