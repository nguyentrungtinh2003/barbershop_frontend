import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserInfo } from "../../services/userServices";
import { addOrder } from "../../services/orderServices";
import { getCart, deleteCart } from "../../services/cartServices";
import { toast } from "react-toastify";

export default function Order() {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [selectedItems, setSelectedItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getUserInfo();
      console.log("User info:", res.data.data);

      setCartId(res.data.data.cartId);

      setLoading(false);
    } catch (error) {
      console.error("Lỗi load cart:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cartId) {
      fetchCartItems(cartId);
    }
  }, [cartId]);
  const fetchCartItems = async (cartId) => {
    try {
      const res = await getCart(cartId);
      setCartItems(res.data.data);
      console.log("Cart items:", res.data.data);
    } catch (error) {
      console.error("Lỗi load cart items:", error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const orderData = {
        customerId: user.id,
        shopId:
          cartItems.find((item) => item.id === selectedItems[0])?.product.shop
            .id || 0,
        cartId: cartId,
        cartItemId: selectedItems,
        paymentMethod: paymentMethod,
      };
      const res = await addOrder(orderData).then((res) => {
        return res;
      });

      fetchCartItems(cartId);
      const createdOrder = res.data.data;
      console.log("Created order:", createdOrder);
      toast.success("Đặt hàng thành công!");
      window.location.href = "/customer/order-history";

      //   if (paymentMethod === "ONLINE") {
      //     window.location.href = `/payment-vnpay?orderId=${createdOrder.id}`;
      //   } else {
      //     alert("Đặt hàng thành công!");
      //     window.location.href = "/order-history";
      //   }
    } catch (error) {
      console.error("Tạo đơn thất bại:", error);
      toast.error("Có lỗi xảy ra!");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white mt-10">Đang tải đơn hàng...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8">
          Xác nhận đơn hàng
        </h1>

        {/* CART ITEMS */}
        <div className="bg-black/40 rounded-2xl p-6 border border-yellow-500/30 shadow-xl">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            Sản phẩm đã chọn
          </h2>
          <span className="text-sm text-red-300">
            Vui lòng thanh toán theo từng shop !
          </span>

          {cartItems?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 border-b border-gray-700 py-4 hover:bg-black/30 px-3 rounded-lg transition"
            >
              {/* Left */}
              <div className="flex items-center gap-4 flex-1">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  className="w-5 h-5 accent-yellow-500 cursor-pointer"
                />

                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                  />

                  {/* Product Info */}
                  <div>
                    <p className="font-semibold text-white">
                      {item.product.name}
                    </p>
                    <p className="text-white-400 text-sm">
                      Shop: {item.product.shop.name}
                    </p>
                    <p className="text-white-400 text-sm">
                      {item.quantity} × {item.product.price.toLocaleString()} đ
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-yellow-400 font-semibold text-lg">
                {(item.product.price * item.quantity).toLocaleString()} đ
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
            <span className="text-lg text-gray-300">Tổng cộng</span>
            <span className="text-2xl font-bold text-yellow-400">
              {cartItems
                ?.filter((item) => selectedItems.includes(item.id))
                .reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0,
                )
                .toLocaleString()}{" "}
              đ
            </span>
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div className="mt-8 bg-black/40 rounded-2xl p-6 border border-yellow-500/30 shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-yellow-400">
            Phương thức thanh toán
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Thanh toán khi nhận hàng (COD)
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={() => setPaymentMethod("ONLINE")}
              />
              Thanh toán Online (VNPay)
            </label>
          </div>
        </div>

        {/* CONFIRM BUTTON */}
        <div className="mt-8 text-center">
          <button
            onClick={handleCreateOrder}
            className="bg-yellow-400 text-black px-8 py-3 rounded-full
                       font-bold hover:bg-yellow-500 transition shadow-lg"
          >
            Xác nhận đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}
