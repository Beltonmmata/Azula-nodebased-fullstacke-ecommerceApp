import localStorageObj from "../../../models/localStorage";
const checkoutPayment = {
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
        <div class="navigator-item navigator-item-active delivery flex-center-container">
          <a href="/#/checkout/delivery"> Delivery</a>  
       
        </div>
        <div class="navigator-item navigator-item-active payment flex-center-container">
         <a href="/#/checkout/payment">Payment</a> 
        </div>
        <div class="navigator-item place-order flex-center-container">
          Order
        </div>
      </div>
    </div>

    <div class="main-content-container container flex-center-container">

      <!-- payment methods-->
      <div class="checkout-form-container flex-center-container ">
        <form id="payment-methods-form">
          <h2>Payment Methods</h2>

          <div class="form-radio-container">
            <input
              type="radio"
              checked
              class="radio-input"
              name="delivery-option-1"
            />
            <div class="radio-input-text">
              <div class="radio-input-label">Lipa na Mpesa</div>
              <div class="radio-input-text font-success">Available</div>
            </div>
          </div>
          <div class="form-radio-container">
            <input type="radio" class="radio-input" name="delivery-option-1" />
            <div>
              <div class="radio-input-label">Paypal</div>
              <div class="radio-input-text font-danger">Not availlable now</div>
            </div>
          </div>
          <div class="form-radio-container">
            <input type="radio" class="radio-input" name="delivery-option-1" />
            <div>
              <div class="radio-input-label">Stripe</div>
              <div class="radio-input-text font-danger">Not availlable now</div>
            </div>
          </div>

          <input
            type="number"
            name="phone-number"
            id="phone-number-shipping-address"
            placeholder="Enter your Mpesa phone number"
          />

          <button id="payment-btn" class="btn w-full primary-btn" >
            Pay Now
          </button>
          <div class="or flex-center-container">Or</div>
          <button id="pay-on-delivery-btn" class="btn w-full secondary-btn" >Pay on Delivery</button>
        </form>
      </div>
      
           
    </div>
    `;
  },
  afterRender() {
    document.getElementById("payment-btn").addEventListener("click", (e) => {
      e.preventDefault();
      console.log("pay btn clicked");

      document.location.hash = "/checkout/placeorder";
    });
    document
      .getElementById("pay-on-delivery-btn")
      .addEventListener("click", (e) => {
        e.preventDefault();

        console.log("pay on delivery clicked");
        localStorageObj.setItem("payment", {
          paymentMethod: "Pay on Delivery",
        });
        document.location.hash = "/checkout/placeorder";
      });
  },
};
export default checkoutPayment;
