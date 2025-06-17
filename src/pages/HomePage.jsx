import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import barbershop1 from "../assets/barbershop-1.jpg";
import barbershop2 from "../assets/barbershop-2.jpg";
import barbershop3 from "../assets/barbershop-3.jpg";
import barbershopbg from "../assets/barbershop-background.jpg";

const shopImages = [barbershop1, barbershop2, barbershop3];

export default function HomePage() {
  return (
    <div className="text-white bg-gradient-to-br from-black via-gray-900 to-gray-800 font-vietnam">
      {/* Banner */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4 md:px-8">
        <img
          src={barbershopbg}
          alt="Barbershop"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 drop-shadow-lg mb-4">
            Đặt lịch hớt tóc tại Long An
          </h1>
          <p className="text-base sm:text-lg text-white/80 mb-6">
            Tìm và đặt lịch nhanh chóng tại các tiệm hớt tóc uy tín khu vực Long
            An – chỉ với vài cú nhấp.
          </p>
          <Link
            to="/login"
            className="inline-block bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition"
          >
            Bắt đầu ngay
          </Link>
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
              title: "Phủ sóng Long An",
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

      {/* Featured Shops */}
      <section className="py-20 bg-gray-900 px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-12">
          Tiệm nổi bật tại Long An
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {shopImages.map((img, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center backdrop-blur-sm shadow-lg hover:scale-105 transition"
            >
              <img
                src={img}
                alt={`Barbershop ${index + 1}`}
                className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
              />
              <h3 className="text-xl font-semibold text-yellow-300 mb-1">
                Barbershop {index + 1} - Long An
              </h3>
              <p className="text-sm text-white/80">
                Số 123, Huyện {index + 1}, Tỉnh Long An
              </p>
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
          Đăng ký ngay để đặt lịch với các tiệm tóc hàng đầu tại Long An!
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
          {[
            {
              title: "Cắt Fade",
              desc: "Kiểu cắt hiện đại, gọn gàng, tôn lên đường nét gương mặt.",
            },
            {
              title: "Nhuộm tóc",
              desc: "Đa dạng màu sắc, kỹ thuật an toàn, không hư tổn.",
            },
            {
              title: "Cạo mặt & massage",
              desc: "Thư giãn sau ngày dài với dịch vụ cạo, xông mặt chuyên nghiệp.",
            },
          ].map((s, idx) => (
            <div
              key={idx}
              className="bg-white/5 rounded-xl p-6 hover:scale-105 transition shadow-lg"
            >
              <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                {s.title}
              </h3>
              <p>{s.desc}</p>
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
      <section className="py-20 px-4 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold text-yellow-400 mb-10">
          Chuyên gia Barber
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            "https://cdn.pixabay.com/photo/2023/09/09/16/17/ai-generated-8243438_960_720.png",
            "https://i.ytimg.com/vi/E_qH0HEM4kY/maxresdefault.jpg",
            "https://c.pxhere.com/photos/96/dd/barber_barbershop_facial_hair_haircut_indoors_men_people-1511057.jpg!d",
          ].map((src, idx) => (
            <img
              key={idx}
              src={src}
              className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition"
            />
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
  );
}
