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
      <section className="py-16 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-10">
          Vì sao bạn nên chọn chúng tôi?
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 text-white/90">
          <div className="flex flex-col items-center">
            <FaStar className="text-yellow-400 text-4xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Dịch vụ chất lượng</h3>
            <p>Barber được đánh giá cao và kiểm duyệt kỹ lưỡng.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCalendarCheck className="text-yellow-400 text-4xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Đặt lịch nhanh chóng</h3>
            <p>Không cần chờ đợi – đặt chỗ chỉ trong vài giây.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-yellow-400 text-4xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Phủ sóng Long An</h3>
            <p>
              Kết nối các tiệm tóc hàng đầu tại các huyện, thị xã trong tỉnh.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Shops */}
      <section className="py-16 bg-gray-900 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-12">
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
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4">
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
    </div>
  );
}
