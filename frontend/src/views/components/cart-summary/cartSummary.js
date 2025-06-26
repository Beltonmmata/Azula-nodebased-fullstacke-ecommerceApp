import { hideLoading, showLoading } from "../../../controllers/loading";
import reRender from "../../../controllers/reRender";
import { showMessage } from "../../../controllers/showMessage";
import cart from "../../../models/cart";
import localStorageObj from "../../../models/local-storage";

import { getProducts } from "../../../models/products";
import { validatePromocode } from "../../../models/promocode";
import cartPage from "../../pages/cart-page/cartPage";

const cartSummary = {
  render: async () => {
    const products = await getProducts();
    const updatedCart = localStorageObj.getItem("cart") || [];
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
    let promotianalDiscount = 0;
    const promoCode = localStorageObj.getItem("promoCode");
    if (promoCode) {
      promotianalDiscount = 0.1 * totalCartPrice;
    }

    const subtotal = totalCartPrice - (taxedPrice + promotianalDiscount);

    return `
    <div class="apply-copun-container">
              <!-- render the apply coupon component -->
                <h3>Promotional code</h3>
                <p>Get 10% off in products price with promotion. Apply coupon below </p>
                <form id="apply-coupon-form">
                <div class="apply-coupon-form-input-wrapper">
                    <label class="apply-coupon-form-label" for="apply-coupon-value">Enter code</label>
                    <input class="apply-coupon-form-input" type="text"id="apply-coupon-value"  placeholder="Eg. user_5" />
                    </div>
                    <button class="apply-coupon-form-btn" type="submit">Apply coupon
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                </form>
            </div>
            <div class="container-cart-summary">
              <!-- render the cart summary -->
              <h2 class="container-cart-summary-header">Cart Summary</h2>
              <ul class="container-cart-summary-ul">
                  <li class="container-cart-summary-li total-items">
                  <div class="label">Total items</div>
                  <div class="figure">${cart.getCartQuantity()} items</div>
                  </li>
                  <li class=" container-cart-summary-li total-price">
                  <div class="label">Items Price</div>
                  <div class="figure">ksh. ${totalCartPrice.toFixed(2)}</div>
                  </li>
                  <li class=" container-cart-summary-li promotion-discount">
                  <div class="label">Discount</div>
                  <div class="figure">${promotianalDiscount.toFixed(2)}</div>
                  </li>
                  
                  <li class=" container-cart-summary-li taxed-price">
                  <div class="label">Taxed price</div>
                  <div class="figure">ksh.${taxedPrice.toFixed(
                    2
                  )} (${taxPercentage}%)
                  
                  </div>
                  </li>
                  <li class=" container-cart-summary-li cart-subtotal">
                  <div class="label">Subtotal</div>
                  <div class="figure">ksh.${subtotal.toFixed(2)}</div>
                  </li>
              </ul>
              <div class="procede-to-checkout-btn">
                <button id="procede-to-checkout-btn">
                <ion-icon name="bag-check-outline"></ion-icon>
                Procede To Checkout
                </button>      
                
              </div>
            </div>
    
    `;
  },
  afterRender() {
    document
      .getElementById("apply-coupon-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          showLoading();
          const promoValue =
            document.getElementById("apply-coupon-value").value;
          const results = await validatePromocode(promoValue);
          if (results) {
            localStorageObj.setItem("promoCode", promoValue);
            showMessage("Valid Promocode", "success");
            reRender(cartPage);
          }
        } catch (error) {
          console.log(error);
        } finally {
          hideLoading();
        }
      });
    document
      .getElementById("procede-to-checkout-btn")
      .addEventListener("click", () => {
        const userDetails = localStorageObj.getItem("user");
        const shippingDetails = localStorageObj.getItem("shipping");
        const deliveryDetails = localStorageObj.getItem("delivery");

        if (userDetails) {
          document.location.hash = "/checkout/shipping";
        } else if (shippingDetails) {
          document.location.hash = "/checkout/delivery";
        } else if (deliveryDetails) {
          document.location.hash = "/checkout/payment";
        } else {
          document.location.hash = "/checkout/signin";
        }
      });
  },
};
export default cartSummary;
