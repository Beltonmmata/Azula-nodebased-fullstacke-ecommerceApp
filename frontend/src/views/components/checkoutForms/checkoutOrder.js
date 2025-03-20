import placeOrderOverview from "../place-order/placeOrderOverview";
import placeOrderSummary from "../place-order/placeOrderSummary";
import "./../place-order/placeOrder.css";

const checkoutOrder = {
  render: async () => {
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

     
        <!-- place order-->
       <div class="container placeorder-container w-full">
        <div class="placeorder-left w-full">
         ${await placeOrderOverview.render()}
        </div>
        <div class="placeorder-right w-full">
        ${placeOrderSummary.render()}
        </div>
       </div>
       
    `;
  },

  afterRender() {
    placeOrderSummary.afterRender();
  },
};

export default checkoutOrder;
