import { showMessage } from "../../../controllers/showMessage";
import localStorageObj from "../../../models/local-storage";
import { login } from "../../../models/user";
import checkoutNav from "../../pages/checkout/checkoutNav";

const checkoutSignIn = {
  render() {
    return `
    <!-- navigator -->
    <div class="container flex-center-container">
      ${checkoutNav(["signin"])}
    </div>

    <div class="main-content-container container flex-center-container">
      <!-- sign In -->
      <div class="checkout-form-container flex-center-container">
        <form id="sign-in-form">
          <h2>Sign In</h2>
           <label for="email-sign-in">Email</label>
          <input
            type="email"
            name="email"
            id="email-sign-in"
            placeholder="eg.Rashan"
          />
           <label for="password-sign-in">Password</label>
          <input
            type="password"
            name="password"
            id="password-sign-in"
            placeholder="eg.20Rashan"
          />

          <div class="or flex-center-container">
          <a href="/#/reset-password" id="sign-up-redirect"> forgot password?<a>
          </div>
          <button id="login-btn" class="btn w-full primary-btn">Login</button>
          
          <div class="or flex-center-container">Or don't have an accont?</div>
          
          <a href="/#/checkout/signup" id="sign-up-redirect" class="button-link btn w-full secondary-btn"> Create Account</a>
        </form>
      </div>
      </div>
    
    `;
  },
  afterRender() {
    document
      .getElementById("sign-in-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email-sign-in").value;
        const password = document.getElementById("password-sign-in").value;

        if (!email || !password) {
          showMessage("all fields should be filled", "error");
          return;
        }
        await login(email, password);

        if (localStorageObj.getItem("user")) {
          const shippingDetails = localStorageObj.getItem("shipping");
          const deliveryDetails = localStorageObj.getItem("delivery");

          if (shippingDetails) {
            document.location.hash = "/checkout/delivery";
          } else if (deliveryDetails) {
            document.location.hash = "/checkout/payment";
          } else {
            document.location.hash = "/checkout/shipping";
          }
        }
      });
  },
};
export default checkoutSignIn;
