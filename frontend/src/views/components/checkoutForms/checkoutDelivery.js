const checkoutDelivery = {
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
        <div class="navigator-item payment flex-center-container">Payment</div>
        <div class="navigator-item place-order flex-center-container">
          Order
        </div>
      </div>
    </div>

    <div class="main-content-container container flex-center-container">

      <!-- delivery options -->
      <div class="checkout-form-container flex-center-container">
        <form id="delivery-option-form">
          <h2>Choose your delivery options:</h2>

          <div class="form-radio-container">
            <input
              type="radio"
              checked
              class="radio-input"
              name="delivery-option-1"
            />
            <div class="radio-input-text">
              <div class="radio-input-label">
                Tuesday,13th 0ctober 2025(1week)
              </div>
              <div class="radio-input-text font-success">
                FREE delivery <span class="font-danger">ksh 0</span>
              </div>
            </div>
          </div>
          <div class="form-radio-container">
            <input type="radio" class="radio-input" name="delivery-option-1" />
            <div>
              <div class="radio-input-label">
                Friday,9th 0ctober 2025(3days)
              </div>
              <div class="radio-input-text font-success">
                Common delivery <span class="font-danger">ksh200</span>
              </div>
            </div>
          </div>
          <div class="form-radio-container">
            <input type="radio" class="radio-input" name="delivery-option-1" />
            <div>
              <div class="radio-input-label">
                Wednesday,6th 0ctober 2025(1day)
              </div>
              <div class="radio-input-text font-success">
                Express delivery <span class="font-danger">ksh 500</span>
              </div>
            </div>
          </div>

          <button id="delivery-btn" class="btn w-full primary-btn"  >
            Save and continue
          </button>
        </form>
      </div>
      
           
    </div>
    `;
  },
  afterRender() {
    document.getElementById("delivery-btn").addEventListener("click", (e) => {
      e.preventDefault();
      document.location.hash = "/checkout/payment";
    });
  },
};
export default checkoutDelivery;
