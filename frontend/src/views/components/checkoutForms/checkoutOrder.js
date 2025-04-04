import localStorageObj from "../../../models/localstorage";
import { getProducts } from "../../../models/products";
import { createOrder } from "../../../models/order";
import "./placeOrder.css";
import dayjs from "dayjs";
import { hideLoading, showLoading } from "../../../controllers/loading";

const checkoutOrder = {
  render: async () => {
    const products = await getProducts();
    const userDetails = localStorageObj.getItem("user");
    const shippingDetails = localStorageObj.getItem("shipping");
    const deliveryDetails = localStorageObj.getItem("delivery");
    const paymentDetails = localStorageObj.getItem("payment");
    const userCart = localStorageObj.getItem("cart");

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
        const { priceIs, name, image } = matchingProduct;

        return `
        <div class="cart-item">
          <img src="${image}" alt="${name}" class="cart-image" />
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
      !paymentDetails
    ) {
      return `
      <div><h3>Whops! you are missing some order information,</h3> we can't process your order overvie</div>
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
          <p><strong>Payment Method:</strong> ${paymentDetails.paymentMethod}</p>
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
        try {
          const products = await getProducts();
          const cartItems = localStorageObj.getItem("cart");
          const deliveryOption = localStorageObj.getItem("delivery");
          const shipping = localStorageObj.getItem("shipping");
          const payment = localStorageObj.getItem("payment");

          console.log("Delivery Option:", deliveryOption);
          console.log("Shipping:", shipping);
          console.log("Payment:", payment);

          if (!cartItems || cartItems.length === 0) {
            throw new Error("No items to order");
          }
          if (!deliveryOption || !shipping || !payment) {
            throw new Error("Missing delivery, shipping, or payment details.");
          }

          const orderItems = cartItems.map((cartItem) => {
            const product = products.find((p) => p._id === cartItem.productId);
            if (!product) {
              throw new Error(
                `Product with ID ${cartItem.productId} not found.`
              );
            }
            return {
              ...cartItem,
              priceAtOrder: product.priceIs, // Fix: Ensure price is included
            };
          });

          console.log(orderItems); //debugger

          let totalCartPrice = 0;
          cartItems.forEach((cartItem) => {
            let { productId, quantity } = cartItem;
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
          await createOrder(
            orderItems,
            deliveryOption,
            shipping,
            payment,
            totalPrice,
            shippingPrice
          );
          console.log("Order placed successfully!");
          document.location.hash = "/orders";
        } catch (error) {
          console.error(error);
        }
        hideLoading();
      });
  },
};

export default checkoutOrder;
