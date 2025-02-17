import cart from "../models/cart";
import localStorageObj from "../models/localstorage";

// const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  localStorageObj.setItem("cart", cart);
}
export function removeFromCart(productId) {
  let matchingItem = cart.find((productId) => item);
}
export function updateCartQuantity(cart) {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  // cart.forEach((item) => {
  //   cartQuantity += item.quantity;
  // });
  console.log(cartQuantity);

  return cartQuantity;
}
