import localStorageObj from "../../../models/localstorage";
import { signup } from "../../../models/user";

const checkoutSignUp = {
  render() {
    return ` <!-- navigator -->
    <div class="container flex-center-container">
      <div class="navigator-container flex-center-container">
        <div
          class="navigator-item navigator-item-active sign-in flex-center-container"
        >
        <a href="/#/checkout/signup">Sign up</a>
          
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
     <!-- sign Up-->
      <div class="checkout-form-container flex-center-container">
        <form id="sign-up-form">
          <h2>Sign up</h2>
           <label for="username-sign-up">Username</label>
          <input
            type="text"
            name="username"
            id="username-sign-up"
            placeholder="eg. Rashan"
          />
          <label for="email-sign-up">Email</label>
          <input
            type="email"
            name="email"
            id="email-sign-up"
            placeholder="eg. example@gmail.com"
          />
           <label for="password-sign-up">Password</label>
          <input
            type="password"
            name="password"
            id="password-sign-up"
            placeholder="eg. G%20Rashan"
          />
          <label for="confirm-password-sign-up">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password-sign-up"
            placeholder="eg. G%20Rashan"
          />
          <button id="signin-btn" class=" btn w-full primary-btn" type="submit">
            Create Account
          </button>
          <div class="or flex-center-container">Or already have an accont?</div>
          <a href="/#/checkout/signin" id="sign-in-redirect" class="button-link btn w-full secondary-btn">Login<a>
        </form>
      </div>
      </div>

    `;
  },
  afterRender() {
    document
      .getElementById("sign-up-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("username-sign-up").value;
        const email = document.getElementById("email-sign-up").value;
        const password = document.getElementById("password-sign-up").value;
        const confirmPassword = document.getElementById(
          "confirm-password-sign-up"
        ).value;

        if (!name || !email || !password || !confirmPassword) {
          alert("all fields should e filled");
          return;
        }

        if (password !== confirmPassword) {
          alert("password and confirm password doesnot match");
          return;
        }
        console.log(name, email, password);
        try {
          await signup(name, email, password);
        } catch (error) {
          console.log("SignUp failed:" + error);
        }
        if (localStorageObj.getItem("user")) {
          document.location.hash = "/checkout/shipping";
        } else {
          alert("Registration failed. please try again later");
        }
      });
  },
};
export default checkoutSignUp;
