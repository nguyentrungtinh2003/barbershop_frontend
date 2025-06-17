import axios from "../utils/axiosInstance";

export const createService = (data) => axios.post("/api/services", data);
export const getServices = () => axios.get("/api/services");
export const updateService = (id, data) =>
  axios.put(`/api/services/${id}`, data);
export const deleteService = (id) => axios.delete(`/api/services/${id}`);
