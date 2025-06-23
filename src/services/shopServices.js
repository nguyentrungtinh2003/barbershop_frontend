import instance from "../utils/axiosInstance";

export const getShops = (page, size) =>
  instance.get(`/admin/shops/page?page=${page}&size=${size}`);

export const getShopsByOwnerId = (ownerId) =>
  instance.get(`/owner/shops/owner/${ownerId}`);

export const createShop = (formData) =>
  instance.post("/admin/shops/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateShop = (id, formData) =>
  instance.put(`/owner/shops/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteShop = (id) => instance.delete(`/admin/shops/delete/${id}`);

export const restoreShop = (id) => instance.put(`/admin/shops/restore/${id}`);
