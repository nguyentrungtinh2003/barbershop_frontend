import instance from "../utils/axiosInstance";

export const createAppointment = (data) =>
  instance.post("/appointments/add", data);
