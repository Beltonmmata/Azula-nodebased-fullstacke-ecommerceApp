import axios from "axios";
import localStorageObj from "./localstorage";
import backendUrl from "./backendUrl";
import { showMessage } from "../controllers/showMessage";

export const createOrder = async (
  orderItems,
  deliveryOption,
  shipping,
  payment,
  totalPrice,
  shippingPrice
) => {
  const token = localStorageObj.getItem("token");
  const { id } = localStorageObj.getItem("user");
  const userId = id;
  try {
    const { data } = await axios.post(
      `${backendUrl}/orders`,
      {
        userId,
        orderItems,
        deliveryOption,
        shipping,
        payment,
        totalPrice,
        shippingPrice,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    localStorageObj.removeItem("cart");
    showMessage("order created Successfully", "success");

    return data;
  } catch (err) {
    showMessage(err.response?.data?.message || err.message, "error");
  }
};

export const getAllOrders = async () => {
  try {
    const token = localStorageObj.getItem("token");
    const { data } = await axios.get(`${backendUrl}/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return data.orders;
  } catch (err) {
    console.error("Error fetching orders:", err);
    return [];
  }
};
export const getOrders = async (id) => {
  try {
    const token = localStorageObj.getItem("token");
    const { data } = await axios.get(`${backendUrl}/orders/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return data.orders;
  } catch (err) {
    console.error("Error fetching orders:", err);
    return [];
  }
};
