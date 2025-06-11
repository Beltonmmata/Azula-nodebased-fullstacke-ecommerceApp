import localStorageObj from "../../../models/localStorage";
import checkoutNav from "../../pages/checkout/checkoutNav";
const checkoutPayment = {
  render() {
    const paymentMethods = [
      {
        id: "1",
        option: "payment-method",
        label: "Pay On Delivery",
        text: "Once your order is marked as delivered you will receive an email to be able to make payments",
      },
      {
        id: "2",
        option: "pay-on-order",
        label: "Pay On Order",
        text: "Once your order is placed  you will be able to make online payment in the order summary screen",
      },
    ];
    return `
     <!-- navigator -->
    <div class="container flex-center-container">
        ${checkoutNav(["signin", "shipping", "delivery", "payment"])}
    </div>

    <div class="main-content-container container flex-center-container">

      <!-- payment methods-->
      <div class="checkout-form-container flex-center-container ">
        <form id="payment-methods-form">
          <h2>Payment Methods</h2>

        ${paymentMethods
          .map((paymentMethod) => {
            const { id, option, text, label } = paymentMethod;
            return `
            <div class="form-radio-container">
              <input 
                type="radio"
                ${id === "1" ? "checked" : ""}
                class="radio-input"
                name = "payment-method"
                value=${option}
                />
              <div>
                <div class="radio-input-label font-success">${label}</div>
                <div class="radio-input-text">${text}</div>
              </div>
            </div>
            `;
          })
          .join(" ")}       
        
          <button id="pay-on-delivery-btn" class="btn w-full w-full primary-btn" >Save and Continue</button>
        </form>
      </div>
      
           
    </div>
    `;
  },
  afterRender() {
    document
      .getElementById("payment-methods-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedPaymentMethod = document.querySelector(
          'input[name="payment-method"]:checked'
        ).value;
        // const selectedOption = deliveryOptions.find(
        //   (option) => option.id == selectedOptionId
        // );
        localStorageObj.setItem("paymentMethod", selectedPaymentMethod);
        document.location.hash = "/checkout/placeorder";
      });
  },
};
export default checkoutPayment;
