import axios from "../utils/axiosInstance";

export const getUsers = () => axios.get("/users");
export const getUserById = (id) => axios.get(`/users/${id}`);
export const register = (formData) =>
  axios.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateUser = (id, updatedUser) =>
  axios.put(`/users/${id}`, updatedUser);
export const deleteUser = (id) => axios.delete(`/users/${id}`);
