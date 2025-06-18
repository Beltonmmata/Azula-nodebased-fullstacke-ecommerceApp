import localStorageObj from "../../../models/local-storage";
import { getProducts } from "../../../models/products";
import { createOrder } from "../../../models/order";
import "./placeOrder.css";
import dayjs from "dayjs";
import { hideLoading, showLoading } from "../../../controllers/loading";
import { showMessage } from "../../../controllers/showMessage";

const checkoutOrder = {
  render: async () => {
    const products = await getProducts();
    const userDetails = localStorageObj.getItem("user");
    const shippingDetails = localStorageObj.getItem("shipping");
    const deliveryDetails = localStorageObj.getItem("delivery");
    const paymentMethod = localStorageObj.getItem("paymentMethod");
    const userCart = localStorageObj.getItem("cart");
    const promoCode = localStorageObj.getItem("promoCode");

    //debbag
    console.log(userDetails);
    console.log(deliveryDetails);
    console.log(shippingDetails);
    console.log(deliveryDetails);
    console.log(paymentMethod);
    console.log(userCart);

    const numberOfDays = deliveryDetails?.durationInDays || 0;
    const deliveryDate = dayjs()
      .add(numberOfDays, "day")
      .format("dddd, MMM D, YYYY");
    const duration =
      numberOfDays < 6
        ? `${numberOfDays} days`
        : `${Math.round(numberOfDays / 7)} week`;
    const shippingPrice = deliveryDetails?.Price || 0;

    const cartListUi = userCart
      .map((item) => {
        const { productId, quantity } = item;
        const matchingProduct = products.find(
          (product) => product._id === productId
        );

        if (!matchingProduct) return "";
        const { priceIs, name, imageUrl } = matchingProduct;

        return `
        <div class="cart-item">
          <img src="${imageUrl}" alt="${name}" class="cart-image" />
          <div class="cart-details">
            <p class="cart-name">${name}</p>
            <p class="cart-quantity">Quantity: ${quantity}</p>
            <p class="cart-price">Ksh ${priceIs * quantity}</p>
          </div>
        </div>
      `;
      })
      .join("");

    const totalPrice =
      userCart.reduce((sum, item) => {
        const matchingProduct = products.find(
          (product) => product._id === item.productId
        );
        return (
          sum + (matchingProduct ? matchingProduct.priceIs * item.quantity : 0)
        );
      }, 0) + shippingPrice;
    if (
      !userDetails ||
      !shippingDetails ||
      !deliveryDetails ||
      !paymentMethod
    ) {
      return `
      <div><h3>Whops! you are missing some order information,</h3> we can't process your order overview</div>
      `;
    } else {
      return `
      <div class="checkout-container">
        <div class="checkout-header">
          <h2>Checkout Order</h2>
        </div>
        <div class="content-section">
        <div class="checkout-section">
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> ${userDetails.name}</p>
          <p><strong>Email:</strong> ${userDetails.email}</p>
        </div>
       
        <div class="checkout-section">
          <h3>Payment Method</h3>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        </div>
        <div class="checkout-section">
          <h3 >Shipping Details</h3>
            <p ><strong >Address:</strong> ${shippingDetails.houseAddress}, ${shippingDetails.city},
             ${shippingDetails.state},
              ${shippingDetails.country} (${shippingDetails.zipCode})
            </p>
            <p ><strong >Phone:</strong> ${shippingDetails.phoneNumber}</p>
        </div>
        <div class="checkout-section">
          <h3>Cart Summary</h3>
          <div class="cart-list">${cartListUi}</div>
          
        </div>
        <div class="checkout-section">
          <p class="total-amount"><strong>Total Amount:</strong> Ksh ${totalPrice}</p>
          <p class="delivery-date">Estimated Delivery: ${deliveryDate} (${duration})</p>
        </div>
        <button id="place-order-btn" class="confirm-btn">Place Order</button>
      </div>
      </div>
    `;
    }
  },
  afterRender: async () => {
    document
      .getElementById("place-order-btn")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        showLoading();

        const products = await getProducts();
        const orderItems = localStorageObj.getItem("cart");
        const deliveryOption = localStorageObj.getItem("delivery");
        const shipping = localStorageObj.getItem("shipping");
        const paymentMethod = localStorageObj.getItem("paymentMethod");
        const promoCode = localStorageObj.getItem("promoCode") || null;

        //console.log("Delivery Option:", deliveryOption); //debuggers
        //console.log("OrderItems:", deliveryOption); //debuggers
        //console.log("Shipping:", shipping);
        // console.log("Payment Method:", paymentMethod);

        if (!orderItems || orderItems.length === 0) {
          showMessage("No items to order", "error");
          return;
        }
        if (!deliveryOption) {
          showMessage(
            "Missing delivery option. Please select a delivery method.",
            "error"
          );
          document.location.hash = "/checkout/delivery";
          return;
        }

        if (!shipping) {
          showMessage(
            "Missing shipping details. Please fill in your shipping info.",
            "error"
          );
          document.location.hash = "/checkout/shipping";
          return;
        }

        if (!paymentMethod) {
          showMessage(
            "Missing payment method. Please choose a payment method.",
            "error"
          );
          document.location.hash = "/checkout/payment";
          return;
        }

        //console.log(orderItems); //debugger

        let totalCartPrice = 0;
        orderItems.forEach((orderItem) => {
          let { productId, quantity } = orderItem;
          let matchingItem = products.find(
            (product) => product._id === productId
          );

          const { priceIs } = matchingItem;
          const totalPrice = priceIs * quantity;

          totalCartPrice += totalPrice;
        });
        const taxPercentage = 10;
        const taxedPrice = (taxPercentage / 100) * totalCartPrice;
        const promotianalDiscount = 0;
        const orderItemsTotal =
          totalCartPrice - (taxedPrice + promotianalDiscount);

        const shippingPrice = deliveryOption.price;
        const totalPrice = orderItemsTotal + shippingPrice;
        console.log("pre place the order executed");

        await createOrder(
          orderItems,
          deliveryOption._id,
          shipping,
          paymentMethod,
          promoCode
        );
        console.log("post place order executed");

        console.log("Order placed successfully!");
        document.location.hash = "/orders";

        hideLoading();
      });
  },
};

export default checkoutOrder;
