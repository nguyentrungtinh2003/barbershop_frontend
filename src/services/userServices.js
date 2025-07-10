import instance from "../utils/axiosInstance";

export const getAllUsers = () => instance.get(`/owner/users/all`);
export const getUsers = (page, size) =>
  instance.get(`/admin/users/page?page=${page}&size=${size}`);

export const getUserById = (id) => instance.get(`/users/${id}`);

export const searchUser = (keyword, page, size) =>
  instance.get(
    `/owner/users/search?keyword=${keyword}&page=${page}&size=${size}`
  );

export const register = (formData) =>
  instance.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateUser = (id, updatedUser) =>
  instance.put(`/owner/users/update/${id}`, updatedUser, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteUser = (id) => instance.delete(`/owner/users/delete/${id}`);

export const restoreUser = (id) =>
  instance.put(`/owner/users/restore/${id}`, {});
