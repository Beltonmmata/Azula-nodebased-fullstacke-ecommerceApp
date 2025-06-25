import { showMessage } from "../controllers/showMessage";
import api from "./api";

export const payWithMpesa = async (phoneNumber, orderId) => {
  try {
    if (!/^(2547\d{8})$/.test(phoneNumber)) {
      showMessage("Invalid Safaricom number format", "error");
      return;
    }
    if (!orderId || typeof orderId !== "string") {
      showMessage("Invalid order ID", "error");
      return;
    }
    const { data } = await api.post("/orderpayment/lipanampesa", {
      phone: phoneNumber,
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
