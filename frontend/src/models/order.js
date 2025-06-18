import { showMessage } from "../controllers/showMessage";
import api from "./api";

export const createOrder = async (
  orderItems,
  deliveryOption,
  shipping,
  paymentMethod,
  promoCode
) => {
  try {
    const { data } = await api.post("/orders", {
      orderItems,
      deliveryOption,
      shipping,
      paymentMethod,
      promoCode,
    });
    showMessage("Order created successfully", "success");
    return data;
  } catch (err) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.msg ||
      "Unexpected error occurred.";
    showMessage(msg, "error");
  }
};

export const getAllOrders = async () => {
  try {
    const { data } = await api.get("/orders");
    return data.data;
  } catch (err) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.msg ||
      "Unexpected error occurred.";
    showMessage(msg, "error");
    console.error("Error fetching orders:", err);
    return [];
  }
};

export const getOrders = async (id) => {
  try {
    const { data } = await api.get(`/orders/${id}`);
    return data.data;
  } catch (err) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.msg ||
      "Unexpected error occurred.";
    showMessage(msg, "error");
    console.error("Error fetching order:", err);
    return null;
  }
};
