import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getProductById } from "../../services/productServices";
import { addCartItem } from "../../services/cartServices";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams(); // productId
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const token = localStorage.getItem("token");

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await addCartItem({ productId: product.id, quantity });
      toast("Đã thêm vào giỏ hàng");
      setTimeout(() => {
        window.history.back();
      }, 2000);
    } catch (err) {
      //   alert("Thêm giỏ hàng thất bại");
      console.log(err);
    }
  };

  const buyNow = async () => {
    await addToCart();
    navigate("/cart");
  };

  if (!product) {
    return <p className="text-yellow-400 text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center items-center">
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IMAGE */}
        <div>
          <img
            src={product.img}
            alt={product.name}
            className="rounded-xl w-full"
          />
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-4">
            {product.name}
          </h1>

          <p className="text-gray-400 mb-4">{product.description}</p>

          <p className="text-2xl font-semibold mb-6">💰 {product.price} VND</p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-6">
            <span>Số lượng:</span>
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="bg-gray-700 px-3 py-1 rounded"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-700 px-3 py-1 rounded"
            >
              +
            </button>
          </div>

          <p className="text-2xl font-semibold mb-6">
            💰 {product.price * quantity} VND
          </p>

          {/* BUTTON */}
          <div className="flex gap-4">
            <button
              onClick={addToCart}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl"
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={buyNow}
              className="flex-1 bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-xl"
            >
              ⚡ Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
