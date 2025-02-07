import cart from "../models/cart";
import { addToCart } from "./handleCart";

export const eventHandler = (Event) => {
  Event.preventDefault;
  const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");

  let productId = addToCartBtn.dataset.productId;
  let quontity = 1;
  addToCartBtn.forEach(
    addEventListener("click", addToCart(productId, quontity))
  );
  renderHomePage();
};
