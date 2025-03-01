const checkoutOrder = {
  render() {
    return `
      <!-- navigator -->
      <div class="container flex-center-container">
        <div class="navigator-container flex-center-container">
          <div class="navigator-item navigator-item-active sign-in flex-center-container">
            <a href="/#/checkout/signin">Sign in</a>
          </div>
          <div class="navigator-item navigator-item-active shipping flex-center-container">
            <a href="/#/checkout/shipping">Shipping</a>
          </div>
          <div class="navigator-item navigator-item-active delivery flex-center-container">
            <a href="/#/checkout/delivery"> Delivery</a>  
          </div>
          <div class="navigator-item navigator-item-active payment flex-center-container">
            <a href="/#/checkout/payment"> Payment</a> 
          </div>
          <div class="navigator-item navigator-item-active place-order flex-center-container">
            <a href="/#/checkout/placeorder"> Order</a> 
          </div>
        </div>
      </div>

      <div class="main-content-container container flex-center-container">
        <!-- place order-->
        <div class="checkout-form-container flex-center-container">
          <form id="place-order-form">
            <h2>Place Order</h2>
            <button id="place-order-btn" class="btn w-full primary-btn">
              Place Order
            </button>
          </form>  
        </div>
      </div>  
    `;
  },

  afterRender() {
    const placeOrderBtn = document.getElementById("place-order-btn");

    if (placeOrderBtn) {
      placeOrderBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Order placed successfully!");
        document.location.hash = "/orders";
      });
    } else {
      console.warn("place-order-btn not found in checkoutOrder afterRender()");
    }
  },
};

export default checkoutOrder;
