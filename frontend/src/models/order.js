import axios from "axios";
import localStorageObj from "./localstorage";
import backendUrl from "./backendUrl";
import { showMessage } from "../controllers/showMessage";

export const createOrder = async (
  token,
  userId,
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
      `${backendUrl}/order`,
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
    showMessage(err.message, "error");
  }
};
