import instance from "../utils/axiosInstance";

export const createAppointment = (data) =>
  instance.post("/appointments/add", data);

export const getTimeSlot = (shopId, barberId, date) =>
  instance.get("/appointments/time-slot", {
    params: {
      shopId: shopId,
      barberId: barberId,
      date: date, // format yyyy-mm-dd
    },
  });
