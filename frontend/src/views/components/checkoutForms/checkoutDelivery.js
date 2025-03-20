import dayjs from "dayjs";
import deliveryOptions from "../../../models/deliveryOptions";
import localStorageObj from "../../../models/localstorage";
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
    <div
      class="navigator-item navigator-item-active shipping flex-center-container"
    >
      <a href="/#/checkout/shipping">Shipping</a>
    </div>
    <div
      class="navigator-item navigator-item-active delivery flex-center-container"
    >
      <a href="/#/checkout/delivery"> Delivery</a>
    </div>
    <div class="navigator-item payment flex-center-container">Payment</div>
    <div class="navigator-item place-order flex-center-container">Order</div>
  </div>
</div>

<div class="main-content-container container flex-center-container">
  <!-- delivery options -->
  <div class="checkout-form-container flex-center-container">
    <form id="delivery-option-form">
      <h2>Choose your delivery options:</h2>
     ${deliveryOptions
       .map((option) => {
         const deliveryDate = dayjs()
           .add(option.durationInDays, "day")
           .format("dddd, MMM D, YYYY");
         const durationLabel =
           option.durationInDays < 6
             ? `${option.durationInDays} days`
             : `${Math.round(option.durationInDays / 7)} week(s)`;
         return `
        <div class="form-radio-container">
          <input
            type="radio"
             ${option.id === "1" ? "checked" : ""}
            class="radio-input"
            name="delivery-option"
            value="${option.id}"
          />
          <div class="radio-input-text">
            <div class="radio-input-label">${deliveryDate}(${durationLabel})</div>
            <div class="radio-input-text font-success">
              ${option.name} <span class="font-danger">ksh ${
           option.price
         }</span>
            </div>
          </div>
        </div>
      `;
       })
       .join("")}
      

      <button id="delivery-btn" class="btn w-full primary-btn">
        Save and continue
      </button>
    </form>
  </div>
</div>

    `;
  },
  afterRender() {
    document
      .getElementById("delivery-option-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedOptionId = document.querySelector(
          'input[name="delivery-option"]:checked'
        ).value;
        const selectedOption = deliveryOptions.find(
          (option) => option.id == selectedOptionId
        );
        localStorageObj.setItem("delivery", selectedOption);
        document.location.hash = "/checkout/payment";
      });
  },
};
export default checkoutDelivery;
