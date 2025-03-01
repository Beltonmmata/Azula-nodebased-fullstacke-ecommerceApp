const checkoutShipping = {
  render() {
    return `
     <!-- navigator -->
    <div class="container flex-center-container">
      <div class="navigator-container flex-center-container">
        <div
          class="navigator-item navigator-item-active sign-in flex-center-container"
        >
          <a href="/#/checkout/signin">Sign in</a>
        </div>
        <div class="navigator-item navigator-item-active shipping flex-center-container">
         <a href="/#/checkout/shipping">Shipping</a>
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

      <!-- shoipping Address-->
      <div class="checkout-form-container flex-center-container">
        <form id="shipping-address-form">
          <h2>Shipping Address</h2>

          <input
            type="text"
            name="city"
            id="city-shipping-address"
            placeholder="Enter city name"
          />
          <input
            type="text"
            name="postal-address"
            id="postal-address-shipping-address"
            placeholder="Enter postal address"
          />
          <input
            type="text"
            name="house-address"
            id="house-address-shipping-address"
            placeholder="Enter your house address"
          />
          <input
            type="number"
            name="phone-number"
            id="phone-number-shipping-address"
            placeholder="Enter your phone number"
            max="10"
          />

          <button id="shipping-btn" class="btn w-full primary-btn" >
            Save Details
          </button>
        </form>
      </div>
    </div>
    `;
  },
  afterRender() {
    document.getElementById("shipping-btn").addEventListener("click", (e) => {
      e.preventDefault();
      document.location.hash = "/checkout/delivery";
    });
  },
};
export default checkoutShipping;
