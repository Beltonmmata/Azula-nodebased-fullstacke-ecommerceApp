import localStorageObj from "../../../models/localstorage";
import cartList from "../cartList/cartList";
import dayjs from "dayjs";
import deliveryOptions from "../../../models/deliveryOptions";

const placeOrderOverview = {
  render: async () => {
    const userDetails = localStorageObj.getItem("user");
    const shippingDetails = localStorageObj.getItem("shipping");
    const deliveryDetails = localStorageObj.getItem("delivery");
    const numberOfDays = deliveryDetails.durationInDays;
    const deliveryDates = dayjs()
      .add(numberOfDays, "day")
      .format("dddd, MMM D, YYYY");
    const duration =
      numberOfDays < 6
        ? `${numberOfDays} days`
        : `${Math.round(numberOfDays / 7)} week`;
    return `
         <ul class="w-full">
          <!-- user infor -->
          <li class="w-full">
            <div class="list-left w-full">
              <h3>User Information</h3>
              <p>
                Username: 
                <strong>${userDetails.name}</strong> 
                , Email:                
                  <strong>${userDetails.email}</strong>       
              </p>
            </div>
            <div class="list-right w-full">
              <a href="/#/checkout/signin">
                <ion-icon name="create"></ion-icon>
              </a>
            </div>
          </li>
          <!-- shipping infor -->
          <li>
            <div class="list-left w-full">
              <h3>shipping Information</h3>
              <p>
                City:<strong>${shippingDetails.city}</strong>,
                State:<strong>${shippingDetails.state}</strong>,
                Country: <strong>${shippingDetails.country}</strong>, 
                PostalAddress:<strong>${shippingDetails.postalAddress}</strong>,
                ZipCode:<strong> ${shippingDetails.zipCode}</strong>, 
                HouseAddress:<strong>${shippingDetails.houseAddress}</strong>, 
                PhoneNumber:<strong> ${shippingDetails.phoneNumber}</strong>
              </p>
            </div>
            <div class="list-right w-full">
              <a href="/checkout/shipping">
                <ion-icon name="create"></ion-icon>
              </a>
            </div>
          </li>
          <!-- delivery infor -->
          <li>
            <div class="list-left w-full">
              <h3>Delivery Information</h3>
              <p>
                Delivery option: <strong>${
                  deliveryDetails.name
                } delivery</strong> ,
                Shipping Cost:<strong> ksh ${deliveryDetails.price}</strong>,
                Duration:<strong>${duration}</strong>, 
                Delivery time:<strong>${deliveryDates}</strong>
              </p>
            </div>
            <div class="list-right w-full">
              <a href="/checkout/delivery">
                <ion-icon name="create"></ion-icon>
              </a>
            </div>
          </li>
          <!-- payment infor -->
          <li>
            <div class="list-left w-full">
              <h3>Payment Details</h3>
              <p>
                Payment Metode: Lipa na Mpesa, Status: Vetified, Payment
                refarral: SHI79NI8769M
              </p>
            </div>
            <div class="list-right w-full">
              <a href="/checkout/payment">
                <ion-icon name="create"></ion-icon>
              </a>
            </div>
          </li>
          <!--cart list-->
          <li>
          ${await cartList.render()}
          </li>
        </ul>
        `;
  },
};
export default placeOrderOverview;
