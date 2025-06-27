import instance from "../utils/axiosInstance";

export const createAppointment = (data) =>
  instance.post("/appointments/add", data);

export const getAppointmentByCustomerId = (customerId) =>
  instance.get(`/appointments/customer/${customerId}`);

export const getAppointmentByShopId = (shopId) =>
  instance.get(`/appointments/shop/${shopId}`);
export const getTimeSlot = (shopId, barberId, date) =>
  instance.get("/appointments/time-slot", {
    params: {
      shopId: shopId,
      barberId: barberId,
      date: date, // format yyyy-mm-dd
    },
  });
