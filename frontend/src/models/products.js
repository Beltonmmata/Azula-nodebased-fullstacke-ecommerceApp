import backendUrl from "./backendUrl";
import axios from "axios";

export const getProducts = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/products/getAllProducts`, {
      headers: { "Content-Type": "application/json" },
    });
    return data.product;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const { data } = await axios.get(`${backendUrl}/products/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    return data.product;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};
