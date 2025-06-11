import { showMessage } from "../controllers/showMessage";
import backendUrl from "./backendUrl";
import axios from "axios";

export const validatePromocode = async (value) => {
  try {
    const url = `${backendUrl}/validate-promocode/${value}`;

    const { data } = await axios.get(url);
    console.log(data);

    return true;
  } catch (err) {
    const msg =
      err?.response?.data?.msg ||
      err?.response?.data?.message ||
      "Invalid Promocode";
    showMessage(msg, "error");
    console.error("Error fetching products:", err);
    return false; // ✅ Ensure consistent return structure
  }
};
