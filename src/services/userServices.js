import axiosInstance from '../utils/axiosInstance';

export const getUsers = () => axiosInstance.get('/users');
export const deleteUser = (id) => axiosInstance.delete(`/users/${id}`);
