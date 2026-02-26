import { useState } from "react";
import axios from "axios";
import {
  createFeedback,
  getFeedbackByCustomerId,
} from "../../services/feedbackServices";
import { toast } from "react-toastify";

export default function FeedbackForm({ show, onHide, appointment }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [img, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = {
      id: null,
      customerId: appointment.customer.id,
      barberId: appointment.barber.id,
      shopId: appointment.shop.id,
      appointmentId: appointment.id,
      rating,
      comment,
    };

    const formData = new FormData();
    formData.append(
      "feedback",
      new Blob([JSON.stringify(feedback)], { type: "application/json" }),
    );
    if (img) {
      formData.append("img", img);
    }

    try {
      await createFeedback(formData);
      const res = await getFeedbackByCustomerId(formData.customerId);
      console.log("Feedback send", res.data.data);
      toast.success("Gửi phản hồi thành công");
      setTimeout(() => {
        onHide();
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  //   if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative border border-yellow-500">
        {/* Close */}
        <a href="/customer/history-booking">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-yellow-400 text-2xl"
            onClick={onHide}
          >
            x
          </button>
        </a>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">
          Gửi Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Đánh giá (1–5 ⭐)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              className="w-full bg-black text-yellow-400 border border-yellow-500 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Nhận xét
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              required
              className="w-full bg-black text-yellow-400 border border-yellow-500 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Ảnh (tuỳ chọn)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
              className="block w-full text-sm text-gray-400
                     file:mr-4 file:py-2 file:px-4 file:rounded-lg
                     file:border file:border-yellow-500
                     file:bg-black file:text-yellow-400
                     hover:file:bg-yellow-400 hover:file:text-black"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold
                   px-4 py-2 rounded-lg transition duration-200"
          >
            Gửi Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
