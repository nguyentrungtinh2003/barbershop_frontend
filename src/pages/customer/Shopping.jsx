import React, { useEffect } from "react";
import { getAllShops } from "../../services/shopServices";
import { addCartItem } from "../../services/cartServices";
import { toast } from "react-toastify";
export default function Shopping() {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    // Fetch products from API
    const response = await getAllShops();
    setProducts(response.data.data.flatMap((shop) => shop.products));
  };

  const addToCart = (product) => {
    const data = {
      productId: product.id,
    };
    addCartItem(data)
      .then((res) => {
        toast.success("Thêm vào giỏ hàng thành công!");
      })
      .catch((err) => {
        toast.error("Thêm vào giỏ hàng thất bại!");
      });
  };

  const buyNow = (product) => {
    const data = {
      productId: product.id,
    };
    addCartItem(data)
      .then((res) => {
        toast.success("Mua ngay thành công!");
      })
      .catch((err) => {
        toast.error("Mua ngay thất bại!");
      });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center uppercase tracking-widest">
          Sản phẩm
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <>
              <a
                href={`/customer/shopping/product/${product.id}`}
                className="flex-1"
              >
                <div
                  key={product.id}
                  className="bg-gray-900 rounded-2xl shadow-xl border border-gray-700 hover:border-yellow-400 transition duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="p-4">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-44 object-cover rounded-xl"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 px-4">
                    <h2 className="text-lg font-semibold mb-1">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <p className="text-yellow-400 font-bold text-lg mb-4">
                      {product.price.toLocaleString()} ₫
                    </p>

                    <p className="text-gray-400 font-bold text-lg mb-4">
                      Số lượng: {product.stock}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="px-4 pb-4 flex gap-2">
                    <a
                      href={`/customer/shopping/product/${product.id}`}
                      className="flex-1"
                    >
                      <button className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white rounded-xl py-2 font-bold transition">
                        Xem chi tiết
                      </button>
                    </a>

                    <button
                      onClick={() => buyNow(product)}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl py-2 font-bold transition"
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </a>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
