import instance from "../utils/axiosInstance";

export const createService = (data) => instance.post("/api/services/add", data);
export const getServices = () => instance.get("/api/services");
export const updateService = (id, data) =>
  instance.put(`/api/services/${id}`, data);
export const deleteService = (id) => instance.delete(`/api/services/${id}`);
