import instance from "../utils/axiosInstance";

export const createFeedback = (data) =>
  instance.post("/feedbacks/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getFeedbackByCustomerId = (customerId) =>
  instance.get(`/feedbacks/customer/${customerId}`);

export const getFeedbackByBarberId = (barberId) =>
  instance.get(`/feedbacks/barber/${barberId}`);

export const getFeedbackByShopId = (shopId) =>
  instance.get(`/feedbacks/shop/${shopId}`);
