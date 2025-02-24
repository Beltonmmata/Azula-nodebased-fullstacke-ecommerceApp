import localStorageObj from "./localstorage";

const cart = {
  userCart: localStorageObj.getItem("cart") || [],

  addToCart(productId) {
    const matchingItem = this.userCart.find(
      (item) => item.productId === productId
    );

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.userCart.push({ productId, quantity: 1 });
    }

    localStorageObj.setItem("cart", this.userCart);
  },

  removeFromCart(productId) {
    this.userCart = this.userCart.filter(
      (item) => item.productId !== productId
    );
    localStorageObj.setItem("cart", this.userCart);
  },

  getCartQuantity() {
    return this.userCart.reduce((total, item) => total + item.quantity, 0);
  },
  updateCartQuontity(productId, newCartQuontity) {
    const item = this.userCart.find((item) => item.productId === productId);
    if (item) {
      item.quantity = newCartQuontity;
      localStorageObj.setItem("cart", this.userCart);
    }
  },
};

export default cart;
