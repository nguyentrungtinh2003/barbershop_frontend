import instance from "../utils/axiosInstance";

export const createProduct = (data) =>
  instance.post("/owner/products/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getProducts = (page, size) =>
  instance.get(`/customer/products/page?page=${page}&size=${size}`);

export const getProductsByShopId = (shopId) =>
  instance.get(`/customer/products/shopId/${shopId}`);

export const getAllProducts = () =>
  instance.get(`/customer/products/page?page=${page}&size=${size}`);
export const updateProduct = (id, data) =>
  instance.put(`/owner/products/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteProduct = (id) =>
  instance.delete(`/owner/products/delete/${id}`);
export const restoreProduct = (id) =>
  instance.put(`/owner/products/restore/${id}`);
export const getProductById = (id) => instance.get(`/customer/products/${id}`);
