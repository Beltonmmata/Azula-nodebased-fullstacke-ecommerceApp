import localStorageObj from "../../../models/localstorage";
import { login } from "../../../models/user";

const checkoutSignIn = {
  render() {
    return `
    <!-- navigator -->
    <div class="container flex-center-container">
      <div class="navigator-container flex-center-container">
        <div
          class="navigator-item navigator-item-active sign-in flex-center-container"
        >
           <a href="/#/checkout/signup">Sign in</a>
        </div>
        <div class="navigator-item shipping flex-center-container">
          Shipping
        </div>
        <div class="navigator-item delivery flex-center-container">
          Delivery
        </div>
        <div class="navigator-item payment flex-center-container">Payment</div>
        <div class="navigator-item place-order flex-center-container">
          Order
        </div>
      </div>
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
            placeholder="eg. G%20Rashan"
          />
          <button id="login-btn" class="btn w-full primary-btn">Login</button>
          <div class="or flex-center-container">Or dont have an accont?</div>
          
          <a href="/#/checkout/signup" id="sign-up-redirect" class="button-link btn w-full secondary-btn"> Create Account<a>
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
          alert("all fields should e filled");
          return;
        }

        console.log(email, password);
        try {
          await login(email, password);
        } catch (error) {
          console.log("Login failed:" + error);
        }
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
        } else {
          alert("Registration failed. please try again later");
        }
      });
  },
};
export default checkoutSignIn;
