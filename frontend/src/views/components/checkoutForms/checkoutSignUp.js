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

          <input
            type="text"
            name="username"
            id="username-sign-up"
            placeholder="Enter your Username"
          />
          <input
            type="email"
            name="email"
            id="email-sign-in"
            placeholder="Enter your Email"
          />
          <input
            type="password"
            name="password"
            id="password-sign-in"
            placeholder="Input Password"
          />
          <input
            type="password"
            name="confirm-password"
            id="confirm-password-sign-up"
            placeholder="Confirm  Password"
          />
          <button id="signin-btn" class=" btn w-full primary-btn" type="submit">
            Create Account
          </button>
          <div class="or flex-center-container">Or already have an accont?</div>
          <button id="sign-in-redirect" class="btn w-full secondary-btn">Login</button>
        </form>
      </div>
      </div>

    `;
  },
  afterRender() {
    document.getElementById("signup-btn").addEventListener("click", (e) => {
      e.preventDefault();
      document.location.hash = "/checkout/shipping";
    });
    document
      .getElementById("sign-in-redirect")
      .addEventListener("click", (e) => {
        e.preventDefault();
        document.location.hash = "/checkout/signin";
      });
  },
};
export default checkoutSignUp;
