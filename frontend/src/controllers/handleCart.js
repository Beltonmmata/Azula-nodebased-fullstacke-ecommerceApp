import cart from "../models/cart";

const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");

export function addToCart(productId, quontity) {
  cart.push({
    cartItemId: productId,
    quontity,
  });
}
console.log(cart);
