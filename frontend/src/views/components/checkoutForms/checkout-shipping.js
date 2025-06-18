import localStorageObj from "../../../models/local-storage";
import checkoutNav from "../../pages/checkout/checkoutNav";

const checkoutShipping = {
  render() {
    return `
     <!-- navigator -->
    <div class="container flex-center-container">
    ${checkoutNav(["signin", "shipping"])}
    </div>

    <div class="main-content-container container flex-center-container">

      <!-- shoipping Address-->
      <div class="checkout-form-container flex-center-container">
        <form id="shipping-address-form">
          <h2>Fill Your Shipping Address</h2>
           <!-- City -->
          <label for="city-shipping-address">City</label>
          <input type="text" id="city-shipping-address" placeholder="e.g. Nairobi" required />

          <!-- State -->
          <label for="state-shipping-address">State/Region</label>
          <input type="text" id="state-shipping-address" placeholder="e.g. Nairobi County" required />

          <!-- Country -->
          <label for="country-shipping-address">Country</label>
          <input type="text" id="country-shipping-address" placeholder="e.g. Kenya" required />

          <!-- Postal Address -->
          <label for="postal-address-shipping-address">Postal Address</label>
          <input type="text" id="postal-address-shipping-address" placeholder="e.g. P.O. Box 12345-00100" required />

           <!-- Zip Code -->
          <label for="zip-code-shipping-address">Zip Code</label>
          <input type="text" id="zip-code-shipping-address" placeholder="e.g. 00100" pattern="\\d{5}" title="Enter a 5-digit zip code" required />

          <!-- House Address -->
          <label for="house-address-shipping-address">House Address</label>
          <input type="text" id="house-address-shipping-address" placeholder="e.g. Apartment 4B, Westlands" required />

          <!-- Phone Number -->
          <label for="phone-number-shipping-address">Phone Number</label>
          <input type="tel" id="phone-number-shipping-address" placeholder="e.g. 0712334587" pattern="\\d{10}" title="Enter a valid 10-digit phone number" required />
         

          <button id="shipping-btn" class="btn w-full primary-btn" >
            Save Details
          </button>
        </form>
      </div>
    </div>
    `;
  },
  afterRender() {
    const shippingData = localStorageObj.getItem("shipping");
    if (shippingData) {
      document.getElementById("city-shipping-address").value =
        shippingData.city || "";
      document.getElementById("state-shipping-address").value =
        shippingData.state || "";
      document.getElementById("country-shipping-address").value =
        shippingData.country || "";
      document.getElementById("postal-address-shipping-address").value =
        shippingData.postalAddress || "";
      document.getElementById("zip-code-shipping-address").value =
        shippingData.zipCode || "";
      document.getElementById("house-address-shipping-address").value =
        shippingData.houseAddress || "";
      document.getElementById("phone-number-shipping-address").value =
        shippingData.phoneNumber || "";
    }

    document
      .getElementById("shipping-address-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const city = document
          .getElementById("city-shipping-address")
          .value.trim();
        const state = document
          .getElementById("state-shipping-address")
          .value.trim();
        const country = document
          .getElementById("country-shipping-address")
          .value.trim();
        const postalAddress = document
          .getElementById("postal-address-shipping-address")
          .value.trim();
        const zipCode = document
          .getElementById("zip-code-shipping-address")
          .value.trim();
        const houseAddress = document
          .getElementById("house-address-shipping-address")
          .value.trim();
        const phoneNumber = document
          .getElementById("phone-number-shipping-address")
          .value.trim();
        localStorageObj.setItem("shipping", {
          city,
          state,
          country,
          postalAddress,
          zipCode,
          houseAddress,
          phoneNumber,
        });
        if (localStorageObj.getItem("shipping")) {
          const deliveryDetails = localStorageObj.getItem("delivery");

          if (deliveryDetails) {
            document.location.hash = "/checkout/payment";
          } else {
            document.location.hash = "/checkout/delivery";
          }
        } else {
          alert("Error saving shipping details. Please try again.");
        }
      });
  },
};
export default checkoutShipping;
