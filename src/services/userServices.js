import axiosInstance from "../utils/axiosInstance";

export const register = (formData) =>
  axiosInstance.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
export const getUsers = () => axiosInstance.get("/users");
export const deleteUser = (id) => axiosInstance.delete(`/users/${id}`);
