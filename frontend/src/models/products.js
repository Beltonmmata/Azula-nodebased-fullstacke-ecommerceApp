import { showMessage } from "../controllers/showMessage";
import backendUrl from "./backendUrl";
import axios from "axios";

export const getProducts = async (queryParams = {}) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = queryString
      ? `${backendUrl}/products?${queryString}`
      : `${backendUrl}/products`;

    const { data } = await axios.get(url);

    return data.data;
  } catch (err) {
    const msg =
      err?.response?.data?.msg ||
      err?.response?.data?.message ||
      "Unexpected error occurred loading Products";
    showMessage(msg, "error");
    console.error("Error fetching products:", err);
    return { products: [] }; // ✅ Ensure consistent return structure
  }
};

export const getProduct = async (id) => {
  try {
    const { data } = await axios.get(`${backendUrl}/products/${id}`);
    return data.data;
  } catch (err) {
    const msg =
      err?.response?.data?.msg ||
      err?.response?.data?.message ||
      "Unexpected error occurred.";
    showMessage(msg, "error");
    console.error("Error fetching products:", err);
    return [];
  }
};
