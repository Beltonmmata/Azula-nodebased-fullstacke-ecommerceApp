import axios from "axios";
import backendUrl from "./backendUrl";
import { showMessage } from "../controllers/showMessage";

export const createOrder = async (
  orderItems,
  deliveryOption,
  shipping,
  paymentMethod,
  totalPrice,
  shippingPrice
) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/orders`,
      {
        orderItems,
        deliveryOption,
        shipping,
        paymentMethod,
        totalPrice,
        shippingPrice,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
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
    const { data } = await axios.get(`${backendUrl}/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
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
    const { data } = await axios.get(`${backendUrl}/orders/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
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
