import instance from "../utils/axiosInstance";

export const addCartItem = (data) =>
  instance.post("/customer/cart/item", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getCart = (cartId) =>
  instance.get(`/customer/cart/${cartId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateCartItem = (id, quantity) =>
  instance.put(
    `/customer/update/cart-item/${id}`,
    { quantity },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

export const deleteCartItem = (id) =>
  instance.delete(`/customer/delete/cart-item/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteCart = (id) =>
  instance.delete(`/customer/delete/cart/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
