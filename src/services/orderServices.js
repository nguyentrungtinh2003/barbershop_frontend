import instance from "../utils/axiosInstance";

export const getOrderByPage = (page, size) =>
  instance.get(`/customer/orders?page=${page}&size=${size}`);

export const getOrderByCustomerId = (customerId, page, size) =>
  instance.get(
    `/customer/orders/customerId/${customerId}?page=${page}&size=${size}`,
  );

export const getOrderByShopId = (shopId, page, size) =>
  instance.get(`/owner/orders/shopId/${shopId}?page=${page}&size=${size}`);

export const addOrder = (data) => instance.post(`/customer/orders/add`, data);

export const searchOrder = (keyword, page, size) =>
  instance.get(
    `/customer/orders/search?keyword=${keyword}&page=${page}&size=${size}`,
  );
