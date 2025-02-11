import cart from "../models/cart";
import renderProductsCards from "../views/components/productsCards/productsCards";
import renderProductsCard from "../views/components/productsCards/productsCards";
import renderHomePage from "../views/pages/home-page/homePage";
import { addToCart } from "./handleCart";

document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  let productId = button.dataset.productId;
  let quontity = 1;
  button.addEventListener("click", (productId, quontity) => {
    addToCart(productId, quontity);
  });
});

console.log("render btn event");
