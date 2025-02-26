import cart from "../../../models/cart";
import localStorageObj from "../../../models/localstorage";

import "./cartSummary.css";
import { getProducts } from "../../../models/products";

const cartSummary = {
  render: async () => {
    const products = await getProducts();
    const updatedCart = localStorageObj.getItem("cart");
    let totalCartPrice = 0;
    updatedCart.forEach((cartItem) => {
      let { productId, quantity } = cartItem;
      let matchingItem = products.find((product) => product._id === productId);

      const { priceIs } = matchingItem;
      const totalPrice = priceIs * quantity;

      totalCartPrice += totalPrice;
    });
    const taxPercentage = 10;
    const taxedPrice = (taxPercentage / 100) * totalCartPrice;
    const promotianalDiscount = 0;
    const subtotal = totalCartPrice - (taxedPrice + promotianalDiscount);

    return `
        <h2>Your Cart Summary</h2>
        <ul>
            <li class="total-items">
            <div class="label">Total items</div>
            <div class="figure">${cart.getCartQuantity()} items</div>
            </li>
            <li class="total-price">
            <div class="label">Total Items Price</div>
            <div class="figure">ksh. ${totalCartPrice}</div>
            </li>
            <li class="promotion-discount">
            <div class="label">Promotion discount</div>
            <div class="figure">${promotianalDiscount}</div>
            </li>
            <li class="tax-parcentage">
            <div class="label">Tax parcentage</div>
            <div class="figure">${taxPercentage}%</div>
            </li>
            <li class="taxed-price">
            <div class="label">Taxed price</div>
            <div class="figure">ksh.${taxedPrice}</div>
            </li>
            <li class="cart-subtotal">
            <div class="label">Subtotal</div>
            <div class="figure">ksh.${subtotal}</div>
            </li>
        </ul>
        <div class="procede-to-checkout-btn">
            <a href="/#/checkout">Procede To Checkout</a>
        </div>
        `;
  },
};
export default cartSummary;
