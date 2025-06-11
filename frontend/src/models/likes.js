import axios from "axios";
import backendUrl from "../models/backendUrl";
import { showMessage } from "../controllers/showMessage";

export const likeProduct = async (productId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/likes/${productId}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (data.success) {
      showMessage("product added to wishlist", "success");
      //showMessage(data.message, "success");
      return data.data;
    } else {
      showMessage(data.message || "Something went wrong", "error");
      return null;
    }
  } catch (err) {
    const msg = err?.response?.data?.message || "Unexpected error occurred.";
    showMessage(msg, "error");
    console.error("❌ likeProduct error:", err);
    return null;
  }
};
export const unlikeProduct = async (productId) => {
  try {
    const { data } = await axios.delete(`${backendUrl}/likes/${productId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (data.success) {
      showMessage("Removed from wishlist", "success");
      return data.data;
    } else {
      showMessage(data.message || "Something went wrong", "error");
      return null;
    }
  } catch (err) {
    const msg = err?.response?.data?.message || "Unexpected error occurred.";
    showMessage(msg, "error");
    console.error("❌ unlikeProduct error:", err);
    return null;
  }
};
