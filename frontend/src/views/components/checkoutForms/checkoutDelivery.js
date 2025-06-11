import dayjs from "dayjs";
import { getAllDeliveryOptions } from "../../../models/deliveryOptions";
import localStorageObj from "../../../models/localstorage";
import checkoutNav from "../../pages/checkout/checkoutNav";

// Shared variable for delivery options
let deliveryOptions = [];

const checkoutDelivery = {
  render: async () => {
    deliveryOptions = await getAllDeliveryOptions();
    console.log(deliveryOptions); // Debugging output

    return `
      <!-- Navigator -->
      <div class="container flex-center-container">
      ${checkoutNav(["signin", "shipping", "delivery"])}
      </div>

      <!-- Main Content -->
      <div class="main-content-container container flex-center-container">
        <div class="checkout-form-container flex-center-container">
          <form id="delivery-option-form">
            <h2>Choose your delivery options:</h2>
            ${deliveryOptions
              .map((option) => {
                const deliveryDate = dayjs()
                  .add(option.deliveryDays, "day")
                  .format("dddd, MMM D, YYYY");

                const durationLabel =
                  option.deliveryDays < 6
                    ? `${option.deliveryDays} days`
                    : `${Math.round(option.deliveryDays / 7)} week(s)`;

                return `
                  <div class="form-radio-container">
                    <input
                      type="radio"
                      class="radio-input"
                      name="delivery-option"
                      value="${option._id}"
                      ${option.deliveryName === "FREE" ? "checked" : ""}
                    />
                    <div class="radio-input-text">
                      <div class="radio-input-label">${deliveryDate} (${durationLabel})</div>
                      <div class="radio-input-text font-success">
                        ${option.deliveryName} 
                        <span class="font-danger">ksh ${
                          option.deliveryPrice
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
          (option) => option._id === selectedOptionId
        );

        if (!selectedOption) {
          alert("Invalid delivery option selected.");
          return;
        }

        localStorageObj.setItem("delivery", selectedOption);
        document.location.hash = "/checkout/payment";
      });
  },
};

export default checkoutDelivery;
