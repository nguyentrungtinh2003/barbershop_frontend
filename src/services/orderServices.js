import instance from "../utils/axiosInstance";

export const getOrderByPage = (page, size) =>
  instance.get(`/customer/orders?page=${page}&size=${size}`);

export const getOrderByCustomerId = (customerId) =>
  instance.get(`/customer/orders/customerId/${customerId}`);

export const addOrder = (data) => instance.post(`/customer/orders/add`, data);
