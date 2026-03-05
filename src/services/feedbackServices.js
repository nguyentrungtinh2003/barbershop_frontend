import instance from "../utils/axiosInstance";

export const createFeedback = (data) =>
  instance.post("/feedbacks/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getFeedbackByCustomerId = (customerId, page, size) =>
  instance.get(`/feedbacks/customer/${customerId}?page=${page}&size=${size}`);

export const getFeedbackByBarberId = (barberId, page, size) =>
  instance.get(`/feedbacks/barber/${barberId}?page=${page}&size=${size}`);

export const getFeedbackByShopId = (shopId, page, size) =>
  instance.get(`/feedbacks/shop/${shopId}?page=${page}&size=${size}`);
