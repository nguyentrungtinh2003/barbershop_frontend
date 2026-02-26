import instance from "../utils/axiosInstance";

export const executePayment = (responseCode, userId, amount) => {
  return instance.get(
    `/payments/execute/vnpay?vnp_ResponseCode=${responseCode}&userId=${userId}&vnp_Amount=${amount}`
  );
};

export const createPayment = (data) => {
  return instance.post("/payments/create", data);
};
