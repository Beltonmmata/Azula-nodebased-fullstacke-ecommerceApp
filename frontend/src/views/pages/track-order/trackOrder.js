import { getOrders } from "../../../models/order";
import { getProduct } from "../../../models/products";
import "./trackOrder.css";
import dayjs from "dayjs";
const trackOrder = {
  render: async (query) => {
    const id = query?.orderid;
    const orderDetails = await getOrders(id);
    console.log(orderDetails);

    const { createdAt, orderStatus, orderItems } = orderDetails;

    const orderDate = dayjs(createdAt).format("MMM DD, YYYY");

    return `
    <!-- header -->
      <div class="top-header-section">
        <div class="order-details">
          <h2>Order Details</h2>
          <p><strong>Date Ordered:</strong> ${orderDate}</p>
          <p><strong>Order Id:</strong> ${id}</p>
          <button class="cancel-order">Cancel Order</button>
        </div>

        <div class="delivery-details">
          <h3>Delivery Details</h3>
          <p><strong>Arriving on:</strong> Monday 25th 2055</p>
          <p class="order-status">Order Status: <span>${orderStatus}</span></p>
          <div class="progress-labels-container">
            <div class="progress-label">Pending</div>
            <div class="progress-label current-status">created</div>
            <div class="progress-label">Processing</div>
            <div class="progress-label">Shipped</div>
            <div class="progress-label current-status">Completed</div>
            <div class="progress-label">Cancelled</div>
          </div>
          <div class="progress-bar">
            <div class="progress"></div>
          </div>
        </div>
      </div>
      <!-- main page -->
      <div class="main">
        <div class="container bottom-details-section">
          <div class="items-list">
            <!-- order Items starts -->
            ${await Promise.all(
              orderItems.map(async (item) => {
                const { imageUrl, name } = await getProduct(item.productId);
                return `
            <div class="item">
              <img class="image" src="${imageUrl}" alt="${name}" />
              <div class="details">
                <p><strong>${name}</strong></p>
                <p>Item ID:${item.productId}</p>
                <p>Price: ksh${item.priceAtOrder}</p>
                <p>Qty: ${item.quantity}</p>
              </div>
              <div class="review-button">
                <button class="btn w-full primary-btn">Review</button>
              </div>
            </div>
            `;
              })
            )}

            <!-- order Items starts -->
          </div>

          <div class="order-summary">
            <h3>Order Summary</h3>
            <p><strong> Items Subtotal:</strong> ksh.228</p>
            <p><strong>Coupon Bonus:</strong> ksh.28</p>
            <p><strong>VAT:</strong> ksh28 <span>(10%)</span></p>
            <p><strong>Shipping Free:</strong> Ksh200</p>

            <hr />
            <p><strong>Total:</strong> Ksh.228</p>
            <button class="btn">Lipa na Mpesa</button>
          </div>
        </div>
      </div>
    `;
  },
};
export default trackOrder;
