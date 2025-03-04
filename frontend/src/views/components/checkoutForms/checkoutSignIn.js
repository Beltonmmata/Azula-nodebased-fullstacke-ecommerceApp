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
        <form id="sign-up-form">
          <h2>Sign In</h2>
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
          <button id="login-btn" class="btn w-full primary-btn">Login</button>
          <div class="or flex-center-container">Or dont have an accont?</div>
          <button id="sign-up-redirect" class="btn w-full secondary-btn">
          Create Account
          </button>
        </form>
      </div>
      </div>
    
    `;
  },
  afterRender() {
    document.getElementById("login-btn").addEventListener("click", (e) => {
      e.preventDefault();
      document.location.hash = "/checkout/shipping";
    });
    document
      .getElementById("sign-up-redirect")
      .addEventListener("click", (e) => {
        e.preventDefault();
        document.location.hash = "/checkout/signup";
      });
  },
};
export default checkoutSignIn;
