import instance from "../utils/axiosInstance";

export const createFeedback = (data) =>
  instance.post("/feedbacks/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getFeedbackByCustomerId = (customerId) =>
  instance.get(`/feedbacks/customer/${customerId}`);
