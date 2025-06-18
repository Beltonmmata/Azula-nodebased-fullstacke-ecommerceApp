import reRender from "../../../controllers/reRender";
import { showMessage } from "../../../controllers/showMessage";
import localStorageObj from "../../../models/local-storage";
import { validatePromocode } from "../../../models/promocode";
import cartPage from "../../pages/cart-page/cartPage";
import "./applyCoupon.css";

const applyCoupon = {
  render() {
    return `
        <p>Get 10% off with promotion code</p>
        <form id="apply-coupon-form">
            <input type="text"id="apply-coupon-value"  placeholder="Enter code here" />
            <button type="submit">Apply coupon</button>
        </form>
        `;
  },
  afterRender: async () => {
    document
      .getElementById("apply-coupon-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        const promoValue = document.getElementById("apply-coupon-value").value;
        const results = await validatePromocode(promoValue);
        if (results) {
          localStorageObj.setItem("promoCode", promoValue);
          showMessage("Valid Promocode", "success");
          reRender(cartPage);
        }
      });
  },
};
export default applyCoupon;
