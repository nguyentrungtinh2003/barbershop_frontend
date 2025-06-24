import instance from "../utils/axiosInstance";

export const createService = (data) =>
  instance.post("/owner/services/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getServices = (page, size) =>
  instance.get(`/owner/services/page?page=${page}&size=${size}`);
export const updateService = (id, data) =>
  instance.put(`/owner/services/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteService = (id) =>
  instance.delete(`/owner/services/delete/${id}`);
export const restoreService = (id) =>
  instance.put(`/owner/services/restore/${id}`);
