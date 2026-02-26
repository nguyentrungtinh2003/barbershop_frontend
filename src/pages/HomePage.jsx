import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import barbershop1 from "../assets/barbershop-1.jpg";
import barbershop2 from "../assets/barbershop-2.jpg";
import barbershop3 from "../assets/barbershop-3.jpg";
import barbershopbg from "../assets/barbershop-background.jpg";
import { getAllShops, searchShop } from "../services/shopServices";
import { toast } from "react-toastify";

const shopImages = [barbershop1, barbershop2, barbershop3];

const barberAddress = "Tây Ninh";

export default function HomePage() {
  const [shops, setShops] = useState([]);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [findShop, setFindShop] = useState([]);

  useEffect(() => {
    fetchShops();
  }, []);

  const handleSearchShop = async () => {
    try {
      const response = await searchShop(searchTerm, 0, 4);
      setFindShop(response.data.data.content);
      if (response.data.data.content.length === 0) {
        toast.info("Không tìm thấy tiệm nào phù hợp với từ khóa của bạn.");
      }
      console.log("Search results:", response.data.data.content);
    } catch (error) {
      console.error("Error searching shops:", error);
    }
  };

  const fetchShops = async () => {
    try {
      const response = await getAllShops();
      setShops(response.data.data);
      const serviceResponse = response.data.data.flatMap(
        (shop) => shop.services,
      );
      const uniqueServices = Array.from(
        new Map(serviceResponse.map((s) => [s.name, s])).values(),
      );
      setServices(uniqueServices);

      setBarbers(response.data.data.flatMap((shop) => shop.barbers));
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  return (
    <>
      <div className="text-white bg-gradient-to-br from-black via-gray-900 to-gray-800 font-vietnam">
        {/* Banner */}
        <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4 md:px-8">
          <img
            src={barbershopbg}
            alt="Barbershop"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 drop-shadow-lg mb-6">
              🔍 Tìm tiệm gần khu vực bạn
            </h1>

            {/* Search box */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <input
                type="text"
                placeholder="Nhập địa điểm bạn muốn tìm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
        w-full sm:w-[420px]
        bg-white/10 backdrop-blur-md
        border border-white/20
        rounded-2xl
        py-3 px-5
        text-white placeholder-white/50
        focus:outline-none focus:ring-2 focus:ring-yellow-400
        transition
      "
              />

              <button
                onClick={handleSearchShop}
                className="
        bg-yellow-400 text-black font-semibold
        py-3 px-8 rounded-2xl
        shadow-lg
        hover:bg-yellow-300 hover:scale-105
        active:scale-95
        transition
      "
              >
                Tìm
              </button>
            </div>

            {/* Result */}
            {findShop.length > 0 && (
              <div className="mt-8 bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-lg text-left">
                <h2 className="text-lg font-semibold mb-4 text-yellow-300">
                  📍 Kết quả tìm kiếm
                </h2>

                <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {findShop.map((shop) => (
                    <a href={`/customer/shop/${shop.id}`}>
                      <li
                        key={shop.id}
                        className="
        flex items-center gap-4
        p-3 rounded-2xl
        bg-white/5 hover:bg-white/10
        transition
      "
                      >
                        {/* Image */}
                        <img
                          src={shop.img || "/no-image.png"}
                          alt={shop.name}
                          className="
          w-16 h-16
          rounded-xl
          object-cover
          border border-white/20
          flex-shrink-0
        "
                        />

                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="text-yellow-300 font-semibold hover:underline block">
                            {shop.name}
                          </h3>
                          <p className="text-sm text-white/70 line-clamp-2">
                            {shop.address}
                          </p>
                        </div>
                      </li>
                    </a>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Featured Shops */}
        <section className="py-20 bg-gray-900 px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-12">
            Tiệm nổi bật tại {barberAddress}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {shops.map((shop) => (
              <div
                key={shop.id}
                className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center backdrop-blur-sm shadow-lg hover:scale-105 transition duration-300"
              >
                {/* Image */}
                <img
                  src={shop.img}
                  alt={shop.name}
                  className="w-full h-44 object-cover rounded-xl mb-4 shadow-md"
                />

                {/* Info */}
                <h3 className="text-xl font-semibold text-yellow-300 mb-1">
                  {shop.name}
                </h3>
                <p className="text-sm text-white/70 mb-2">{shop.address}</p>

                <p className="text-sm text-white/80 line-clamp-2">
                  {shop.description ||
                    "Dịch vụ hớt tóc chuyên nghiệp và tận tâm."}
                </p>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                  <iframe
                    src={shop.addressMap}
                    className="w-full h-64"
                    loading="lazy"
                    title={`map-${shop.id}`}
                  />
                </div>

                {/* Button */}
                <a
                  href={`/customer/shop/${shop.id}`}
                  className="inline-block mt-5"
                >
                  <button className="bg-yellow-400 text-black font-semibold py-2 px-5 rounded-xl shadow hover:bg-yellow-300 hover:scale-105 transition">
                    Xem thông tin
                  </button>
                </a>
              </div>
            ))}
          </div>
        </section>
        {/* Why Us */}
        <section className="py-20 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-12">
            Vì sao bạn nên chọn chúng tôi?
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 text-white/90">
            {[
              {
                icon: <FaStar className="text-yellow-400 text-4xl mb-3" />,
                title: "Dịch vụ chất lượng",
                desc: "Barber được đánh giá cao và kiểm duyệt kỹ lưỡng.",
              },
              {
                icon: (
                  <FaCalendarCheck className="text-yellow-400 text-4xl mb-3" />
                ),
                title: "Đặt lịch nhanh chóng",
                desc: "Không cần chờ đợi – đặt chỗ chỉ trong vài giây.",
              },
              {
                icon: (
                  <FaMapMarkerAlt className="text-yellow-400 text-4xl mb-3" />
                ),
                title: `Phủ sóng ${barberAddress}`,
                desc: "Kết nối các tiệm tóc hàng đầu tại các huyện, thị xã trong tỉnh.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {item.icon}
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center bg-gray-800">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Sẵn sàng thay đổi kiểu tóc?
          </h2>
          <p className="text-white/80 mb-6">
            Đăng ký ngay để đặt lịch với các tiệm tóc hàng đầu tại{" "}
            {barberAddress}!
          </p>
          <Link
            to="/register"
            className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition"
          >
            Đăng ký ngay
          </Link>
        </section>

        {/* Services */}
        <section className="py-20 px-4 sm:px-6 bg-gray-900 text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-12">
            Dịch vụ nổi bật
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-white/90">
            {services.map((s, idx) => (
              <div
                key={idx}
                className="bg-white/5 rounded-xl p-6 hover:scale-105 transition shadow-lg"
              >
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                  {s.name}
                </h3>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-20 px-4 bg-gray-800 text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-12">
            Khách hàng nói gì về chúng tôi
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                review: "Dịch vụ nhanh chóng, barber cực kỳ chuyên nghiệp!",
                author: "Hùng, TP Tân An",
              },
              {
                review:
                  "Tôi đặt lịch trước 1 tiếng, đến là có thợ liền – quá tiện lợi.",
                author: "Linh, Bến Lức",
              },
              {
                review: "Ứng dụng dễ dùng, đặt tiệm gần nhà rất nhanh!",
                author: "Trí, Đức Hòa",
              },
            ].map((r, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-6 rounded-xl text-white/80 shadow-md"
              >
                <p>"{r.review}"</p>
                <span className="block mt-4 text-yellow-300 font-semibold">
                  - {r.author}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 px-4 bg-gray-900 text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-10">
            Câu hỏi thường gặp
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-left text-white/80">
            {[
              {
                question: "1. Làm sao để đặt lịch?",
                answer:
                  "Chỉ cần đăng nhập, chọn tiệm và giờ, sau đó xác nhận là xong.",
              },
              {
                question: "2. Tôi có thể hủy lịch không?",
                answer:
                  "Có. Vào trang cá nhân và bấm “Hủy lịch” ít nhất 1 giờ trước giờ hẹn.",
              },
              {
                question: "3. Có phí đặt lịch không?",
                answer:
                  "Hoàn toàn miễn phí. Bạn chỉ thanh toán dịch vụ tại tiệm.",
              },
            ].map((f, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-yellow-300">{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experts */}
        <section className="py-20 px-4 bg-gray-900">
          <h2 className="text-3xl font-bold text-yellow-400 mb-12 text-center">
            💈 Chuyên gia Barber
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className="bg-black rounded-2xl overflow-hidden shadow-xl border border-gray-800 hover:border-yellow-400 transition"
              >
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={barber.img || "/user.jpg"}
                    alt={barber.username}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Info */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-white">
                    {barber.username}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    {barber.description ||
                      "Barber chuyên nghiệp với nhiều năm kinh nghiệm."}
                  </p>

                  {/* <button className="mt-4 px-5 py-2 border border-yellow-400 text-yellow-400 rounded-xl hover:bg-yellow-400 hover:text-black transition">
                    Xem lịch
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog */}
        <section className="py-20 px-4 bg-gray-900 text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-10">
            Bài viết & Mẹo chăm sóc tóc
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-white/90">
            {[
              {
                title: "5 Kiểu tóc nam hot năm 2025",
                desc: "Khám phá các xu hướng kiểu tóc giúp bạn trông hiện đại & lịch lãm hơn.",
              },
              {
                title: "Cách giữ tóc khỏe khi nhuộm",
                desc: "Hướng dẫn chăm sóc tóc đúng cách sau khi nhuộm màu tại tiệm.",
              },
              {
                title: "Khi nào nên đổi kiểu tóc?",
                desc: "Dấu hiệu cho thấy bạn cần thay đổi phong cách để tươi mới hơn.",
              },
            ].map((blog, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-5 rounded-xl hover:scale-105 transition shadow"
              >
                <h3 className="text-yellow-300 font-semibold mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm">{blog.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
