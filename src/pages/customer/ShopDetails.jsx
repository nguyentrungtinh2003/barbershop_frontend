import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopsById } from "../../services/shopServices";
import { getProductsByShopId } from "../../services/productServices";

const fallbackImg =
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70";

const ShopDetails = () => {
  const { id } = useParams();
  const [shopDetails, setShopDetails] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const res = await getShopsById(parseInt(id));
        setShopDetails(res.data.data);
        const productsRes = await getProductsByShopId(parseInt(id));
        setProducts(productsRes.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShopDetails();
  }, [id]);

  if (!shopDetails) {
    return (
      <div className="text-center mt-20 text-yellow-400 text-lg">
        Đang tải thông tin shop...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white px-4 py-10">
        <div className="max-w-7xl mx-auto">
          {/* ================= SHOP HERO ================= */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-3xl p-8 shadow-2xl">
            {/* Shop Image */}
            <div>
              <img
                src={shopDetails.img || fallbackImg}
                alt={shopDetails.name}
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>

            {/* Shop Info */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-yellow-400 mb-4 uppercase tracking-wide">
                  {shopDetails.name}
                </h1>

                <div className="space-y-2 text-gray-300">
                  <p>📍 {shopDetails.address}</p>
                  <p>📞 {shopDetails.phoneNumber}</p>
                  <p>📧 {shopDetails.email}</p>
                </div>

                <p className="mt-4 text-gray-400 leading-relaxed">
                  {shopDetails.description}
                </p>
              </div>

              <div className="mt-6">
                <a href={`/customer/dashboard?shopId=${shopDetails.id}`}>
                  <button className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 hover:scale-105 transition">
                    Đặt lịch ngay
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* ================= MAP ================= */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              📍 Vị trí cửa hàng
            </h2>

            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <iframe
                src={shopDetails.addressMap}
                className="w-full h-64"
                loading="lazy"
                title={`map-${shopDetails.id}`}
              />
            </div>
          </div>

          {/* ================= BARBERS ================= */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-yellow-400 mb-8">
              💈 Barbers
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {shopDetails.barbers.map((barber) => (
                <div
                  key={barber.id}
                  className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition"
                >
                  <img
                    src={barber.img || "/user.jpg"}
                    alt={barber.name}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">
                      {barber.username}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {barber.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 font-bold text-lg">
                        {barber.email}
                      </span>

                      <span className="text-yellow-400 font-bold text-lg">
                        {barber.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= SERVICES ================= */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-yellow-400 mb-8">
              💈 Dịch vụ
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {shopDetails.services.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition"
                >
                  <img
                    src={service.img || fallbackImg}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">
                      {service.name}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 font-bold text-lg">
                        {service.price.toLocaleString()} ₫
                      </span>

                      <span className="text-xs px-3 py-1 rounded-full border border-yellow-400/40 text-yellow-400">
                        Barber
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= PRODUCTS ================= */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-yellow-400 mb-8">
              🧴 Sản phẩm
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 rounded-2xl border border-gray-700 shadow-xl hover:border-yellow-400 transition flex flex-col"
                >
                  <img
                    src={product.img || fallbackImg}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />

                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-semibold mb-1">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <p className="text-yellow-400 font-bold text-lg mb-2">
                      {product.price.toLocaleString()} ₫
                    </p>

                    <p className="text-xs text-gray-500">
                      Tồn kho: {product.stock}
                    </p>
                  </div>

                  <div className="p-4 pt-0 flex gap-2">
                    <a
                      href={`/customer/shopping/product/${product.id}`}
                      className="flex-1"
                    >
                      <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold border border-gray-600 rounded-xl py-2 text-sm font-semibold transition">
                        Xem Chi Tiết
                      </button>
                    </a>

                    {/* <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl py-2 text-sm font-bold transition">
                    Mua ngay
                  </button> */}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* ===== FLOATING BOOKING BUTTON ===== */}
        <a
          href={`/customer/dashboard?shopId=${shopDetails.id}`}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            className="
    bg-yellow-400 text-black
    font-bold text-lg
    px-6 py-4
    rounded-full
    shadow-2xl
    hover:bg-yellow-300
    hover:scale-105
    transition
  "
          >
            Đặt lịch ngay
          </button>
        </a>
      </div>
    </>
  );
};

export default ShopDetails;
