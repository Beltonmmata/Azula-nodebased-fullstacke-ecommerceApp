import localStorageObj from "../../../models/localstorage";
import { createOrder } from "../../../models/order";
import { getProducts } from "../../../models/products";

const placeOrderSummary = {
  render() {
    return `
    <div class="container-order-summary">
          <h2>Your Cart Summary</h2>
          <ul>
            <li class="total-items">
              <div class="label">Total items</div>
              <div class="figure">5 items</div>
            </li>
            <li class="total-price">
              <div class="label">Total price</div>
              <div class="figure">ksh. 300</div>
            </li>
            <li class="promotion-discount">
              <div class="label">Promotion discount</div>
              <div class="figure">50</div>
            </li>
            <li class="tax-parcentage">
              <div class="label">Tax parcentage</div>
              <div class="figure">10%</div>
            </li>
            <li class="taxed-price">
              <div class="label">Taxed price</div>
              <div class="figure">ksh.30</div>
            </li>
            <li class="cart-subtotal">
              <div class="label">Subtotal</div>
              <div class="figure">ksh.300</div>
            </li>
          </ul>
          <div class="place-order-btn">
             <button id="place-order-btn" class="btn w-full primary-btn">
              Place Order
            </button>
          </div>
          
        </div>
    `;
  },
  afterRender: async () => {
    document
      .getElementById("place-order-btn")
      .addEventListener("click", async (e) => {
        e.preventDefault();
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
      });
  },
};
export default placeOrderSummary;
