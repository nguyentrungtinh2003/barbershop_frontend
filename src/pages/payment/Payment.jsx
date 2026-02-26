import { useEffect, useState } from "react";
import axios from "axios";
import { FaCoins } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { createPayment } from "../../services/paymentServices";
import { toast } from "react-toastify";
import { GiConsoleController } from "react-icons/gi";
import { useSearchParams } from "react-router-dom";

export default function Payment() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("VNPAY");
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState(1);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const amt = Number(searchParams.get("amount"));
    if (amt && amt >= 10000) {
      setAmount(amt);
    }
    const oid = searchParams.get("orderId");
    if (oid) {
      setOrderId(oid);
    }
  }, [searchParams]);

  const submitPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userId = parseInt(localStorage.getItem("userId"));

    const paymentData = {
      userId,
      amount,
      method,
      orderId,
    };

    try {
      const response = await createPayment(paymentData);

      const approvalUrl = response.data.data;
      console.log("Approval URL:", approvalUrl);
      if (approvalUrl) {
        window.location.href = approvalUrl;
      } else {
        setError("Không nhận được link thanh toán từ hệ thống.");
      }
    } catch (err) {
      setError("Lỗi khi thực hiện thanh toán: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="w-full max-w-3xl bg-black border border-yellow-500 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <FaCoins size={60} className="text-yellow-400 mb-3" />
          <h1 className="text-3xl font-bold text-yellow-400 uppercase tracking-widest">
            Thanh toán
          </h1>
          <p className="text-gray-400 mt-2">
            Thanh toán nhanh chóng – an toàn qua VNPay
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/40 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={submitPayment} className="space-y-6">
          {/* Số tiền */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-yellow-400">
              Số tiền thanh toán (VNĐ)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={10000}
              required
              placeholder="Nhập số tiền..."
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* Phương thức */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-yellow-400">
              Phương thức thanh toán
            </label>

            <div className="flex items-center gap-4 bg-gray-900 border border-gray-700 rounded-xl p-3">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
              >
                <option value="VNPAY">VNPay</option>
                {/* <option value="PayPal">PayPal</option> */}
              </select>

              <img
                src={method === "PayPal" ? "/paypal.webp" : "/vnpay.png"}
                alt="Thanh toán"
                className="w-20 h-20 object-contain bg-white rounded-lg p-2"
              />
            </div>
          </div>

          {/* Thông tin nhận
          <div className="flex justify-between items-center bg-gray-900 border border-gray-700 rounded-xl p-4">
            <div>
              <p className="text-sm text-gray-400">Số coin nhận được</p>
              <p className="text-xl font-bold text-yellow-400">
                {method === "PayPal"
                  ? Math.floor((amount * 25000) / 1000)
                  : amount / 1000}{" "}
                Coin
              </p>
            </div>

            <div className="text-right text-sm text-gray-400">
              <p>1.000 VNĐ = 1 Coin</p>
              <p>Tỷ giá có thể thay đổi</p>
            </div>
          </div> */}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin" />
                Đang xử lý thanh toán...
              </>
            ) : (
              <>Thanh toán bằng {method}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
