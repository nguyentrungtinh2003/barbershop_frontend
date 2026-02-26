import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../services/userServices";
import {
  getCart,
  updateCartItem,
  deleteCartItem,
} from "../../services/cartServices";
import { toast } from "react-toastify";

export default function Cart() {
  useEffect(() => {
    fetchUserCart();
  }, []);

  const [cartId, setCartId] = useState(null);

  const fetchUserCart = async () => {
    await getUserInfo().then((res) => {
      setCartId(res.data.data.cartId);
    });
  };

  useEffect(() => {
    if (cartId) {
      fetchCartDetails();
    }
  }, [cartId]);

  const [cart, setCart] = useState([]);
  const fetchCartDetails = async () => {
    // You can implement fetching cart details using cartId here
    await getCart(cartId).then((res) => {
      setCart(res.data.data);
    });
  };

  const handleQuantityChange = (id, value) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(value) } : item,
      ),
    );
  };

  const updateQuantity = async (id, quantity) => {
    await updateCartItem(id, quantity);
    toast.success("Cập nhật số lượng thành công!");
    fetchCartDetails();
  };

  const deleteItem = async (id) => {
    await deleteCartItem(id);
    fetchCartDetails();
  };

  const handleCheckout = () => {
    window.location.href = "/customer/orders";
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center uppercase tracking-widest">
          Giỏ hàng
        </h1>

        {cart && cart.length > 0 ? (
          <div className="max-w-5xl mx-auto space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-xl shadow-lg p-4 flex items-center justify-between gap-4"
              >
                {/* Product info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-yellow-400">
                    {item.product.name}
                  </h3>
                  <p className="text-white-400 text-sm">
                    Giá: {item.product.price.toLocaleString()} VND
                  </p>
                  <h3 className="text-white-400 text-sm">
                    Shop: {item.product.shop.name}
                  </h3>
                </div>

                <div className="flex-1">
                  <h3 className="text-gray-400 text-lg">Mô tả</h3>
                  <p className="text-gray-400 text-sm">
                    {item.product.description}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
                  >
                    −
                  </button>

                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    className="w-14 text-center rounded text-ưhite"
                  />

                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="w-32 text-right font-semibold">
                  {(item.product.price * item.quantity).toLocaleString()} VND
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Cập nhật
                  </button>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}

            {/* Checkout */}
            <div className="bg-gray-900 rounded-xl p-4 flex justify-between items-center mt-6">
              <p className="text-xl font-semibold">
                Tổng tiền:{" "}
                <span className="text-yellow-400">
                  {cart
                    .reduce(
                      (sum, item) => sum + item.product.price * item.quantity,
                      0,
                    )
                    .toLocaleString()}{" "}
                  VND
                </span>
              </p>

              <button
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl shadow-lg"
              >
                Tạo đơn hàng
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-12 text-lg">
            🛒 Giỏ hàng trống
          </p>
        )}
      </div>
    </>
  );
}
