import { showMessage } from "../controllers/showMessage";
import api from "./api";

export const payWithMpesa = async (phoneNumber, orderId) => {
  try {
    const { data } = await api.post("/orderpayment/lipanampesa", {
      phoneNumber,
      orderId,
    });
    showMessage("Payment succeded", "success");
    return data;
  } catch (err) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.msg ||
      "Unexpected error occurred.";
    showMessage(msg, "error");
    console.error(msg);
  }
};
