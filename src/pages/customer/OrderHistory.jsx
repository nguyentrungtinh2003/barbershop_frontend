import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaRegCalendarCheck,
} from "react-icons/fa";

import {
  addOrder,
  getOrderByCustomerId,
  getOrderByPage,
} from "../../services/orderServices";

export default function OrderHistory() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    const res = await getOrderByCustomerId(user.id, page, size);
    setOrders(res.data.data.content);
    setTotalPages(res.data.data.totalPages);
    setSize(res.data.data.size);
  };

  useEffect(() => {
    fetchOrders();
    setLoading(false);
  }, [page, size]);
  console.log("Orders state:", orders);
  const formatCustomDateTime = (value) => {
    // value kiểu [2025,6,25,12] hoặc tương tự
    const hour = value[3];
    return `${hour}:00`;
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold text-yellow-400">
            Lịch sử đơn hàng của bạn
          </h1>
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
                  <th className="px-6 py-3">Tổng tiền</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3">Ngày đặt</th>
                  <th className="px-6 py-3 text-center">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {orders?.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-700 hover:bg-yellow-500/10 transition"
                  >
                    {/* ID */}
                    <td className="px-6 py-4 font-semibold text-yellow-400">
                      #{order.id}
                    </td>

                    {/* Order Items */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.orderItems.map((item) => (
                          <div key={item.id} className="text-gray-300">
                            {item.product.name} x {item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 font-semibold text-yellow-400">
                      {order.totalAmount.toLocaleString()} đ
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        order.status === "CREATED"
                          ? "bg-blue-500/20 text-blue-400"
                          : order.status === "PAID"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* CreatedAt */}
                    <td className="px-6 py-4 text-gray-400">
                      {order.createdAt[2]}/{order.createdAt[1]}/
                      {order.createdAt[0]}{" "}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-center">
                      {order.status !== "PAID" && (
                        <a
                          href={`/payment-vnpay?amount=${order.totalAmount}&orderId=${order.id}`}
                        >
                          <button
                            className="bg-red-500 text-white px-4 py-1.5
                                         rounded-full text-sm
                                         hover:bg-red-600 transition shadow
                                         whitespace-nowrap"
                          >
                            Thanh toán Online
                          </button>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-400">
                      Chưa có đơn hàng nào
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
