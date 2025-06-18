// enhancedTrackOrder.js
import { getADeliveryOption } from "../../../models/deliveryOptions";
import { payWithMpesa } from "../../../models/lipanampesa";
import { getOrders } from "../../../models/order";
import { getProduct } from "../../../models/products";
import {
  hideConversationOverlay,
  showConversationOverlay,
} from "../../components/conversation-overlay/conversationOverlay";
import "./trackOrder.css";
import dayjs from "dayjs";

const trackOrder = {
  render: async (query) => {
    const orderId = query?.orderid;
    const order = await getOrders(orderId);

    const {
      createdAt,
      orderStatus,
      orderItems,
      paymentMethod,
      totalPrice,
      isPaid,
      isDelivered,
      shippingPrice,
      isCancelled,
      deliveryOption,
      shipping,
    } = order;

    const orderDate = dayjs(createdAt).format("MMM DD, YYYY");

    const orderStatuses = [
      { status: "Pending", label: "Pending" },
      { status: "Created", label: "Created" },
      { status: "Processing", label: "Processing" },
      { status: "Shipped", label: "Shipped" },
      { status: "Completed", label: "Completed" },
      { status: "Cancelled", label: "Cancelled" },
    ];

    const currentStatusIndex = orderStatuses.findIndex(
      (s) => s.status === orderStatus
    );

    return `
      <div class="track-order-wrapper">
        <div class="top-header-section">
          <div class="order-details">
            <h2><ion-icon name="document-text-outline"></ion-icon> Order Details</h2>
            <p><strong>Date Ordered:</strong> ${orderDate}</p>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            <p><strong>Delivery Method:</strong> ${deliveryOption}</p>
            <button class="btn cancel-order"><ion-icon name="close-circle-outline"></ion-icon> Cancel Order</button>
          </div>

          <div class="delivery-details">
            <h3><ion-icon name="car-outline"></ion-icon> Shipping Info</h3>
            <p><strong>Recipient:</strong> ${shipping?.phoneNumber}</p>
            <p><strong>Address:</strong> ${shipping?.houseAddress}, ${
      shipping?.city
    }, ${shipping?.state}</p>
            <p><strong>Postal:</strong> ${shipping?.postalAddress} - ${
      shipping?.zipCode
    }, ${shipping?.country}</p>
            <p class="order-status">Status: <span>${orderStatus}</span></p>

            <div class="progress-labels-container">
              ${orderStatuses
                .map((s, i) => {
                  return `<div class='progress-label ${
                    i === currentStatusIndex ? "current-status" : ""
                  }'>${s.label}</div>`;
                })
                .join("")}
            </div>
            <div class="progress-bar">
              <div class="progress" style="width: ${
                (currentStatusIndex / (orderStatuses.length - 1)) * 100
              }%"></div>
            </div>
          </div>
        </div>

        <div class="main container">
          <div class="bottom-details-section">
            <div class="items-list">
              <h3><ion-icon name="pricetag-outline"></ion-icon> Items Ordered</h3>
              ${await Promise.all(
                orderItems.map(async (item) => {
                  const { imageUrl, name } = await getProduct(item.productId);
                  return `
                    <div class="item">
                      <img class="image" src="${imageUrl}" alt="${name}" />
                      <div class="details">
                        <p><strong>${name}</strong></p>
                        <p>ID: ${item.productId}</p>
                        <p>Price: Ksh ${item.priceAtOrder}</p>
                        <p>Qty: ${item.quantity}</p>
                      </div>
                      <div class="review-button">
                        <a href="/#/product/${item.productId}" class="btn primary-btn">
                          <ion-icon name="star-outline"></ion-icon> Review
                        </a>
                      </div>
                    </div>
                  `;
                })
              ).then((html) => html.join(""))}
            </div>

            <div class="order-summary">
              <h3><ion-icon name="calculator-outline"></ion-icon> Order Summary</h3>
              <p><strong>Items Subtotal:</strong> Ksh.${totalPrice}</p>
              <p><strong>Payment Status:</strong> ${
                isPaid ? "Verified" : "Not Verified"
              }</p>
              <p><strong>Shipping Fee:</strong> Ksh.${shippingPrice}</p>
              <p><strong>Delivery:</strong> ${
                isDelivered ? "Delivered" : "Pending"
              }</p>
              <p><strong>Order Cancelled:</strong> ${
                isCancelled ? "Yes" : "No"
              }</p>
              <hr />
              <p><strong>Total:</strong> Ksh.${totalPrice + shippingPrice}</p>

              <button id="lipanampesa-btn" 
                class="btn secondary-btn w-full" 
                data-orderid="${orderId}">
                <img src="/utils/lipanampesa.png" alt="Lipa na Mpesa" style="width: 120px; height: 30px;" />
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  afterRender: async (query) => {
    const btn = document.getElementById("lipanampesa-btn");
    const orderId = btn?.dataset?.orderid;
    if (!btn || !orderId) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      showConversationOverlay(`
        <form id="lipanampesa-form">
          <h3 class="header-message">
            Enter your M-PESA number. We will send a payment request to your phone.
          </h3>
          <div style="display: flex; align-items: center; gap: 5px;">
            <span style="font-weight: bold; font-size: 1rem;">+254</span>
            <input
              type="text"
              id="mpesa-number-input"
              placeholder="7XXXXXXXX"
              maxlength="9"
              style="flex: 1; padding: 8px; font-size: 1.3rem;"
              required
            />
          </div>
          <p id="mpesa-error" style="color: red; font-size: 0.9rem; margin-top: 5px;"></p>

          <div class="call-to-action" style="margin-top: 15px;">
            <button class="call-to-action-btn cancel-btn" id="lipanampesa-overlay-cancel-btn">Cancel</button>
            <button type="submit" id="lipanampesa-overlay-btn" class="call-to-action-btn ok-btn">Pay</button>
          </div>
        </form>
      `);

      document
        .getElementById("lipanampesa-overlay-cancel-btn")
        .addEventListener("click", () => {
          hideConversationOverlay();
        });

      document
        .getElementById("lipanampesa-overlay-btn")
        .addEventListener("click", async (e) => {
          e.preventDefault();
          const raw = document
            .getElementById("mpesa-number-input")
            .value.trim();
          const errorEl = document.getElementById("mpesa-error");

          if (!/^[17]\d{8}$/.test(raw)) {
            errorEl.textContent =
              "Enter a valid Safaricom number (e.g. 712345678)";
            return;
          }

          const phoneNumber = `254${raw}`;
          errorEl.textContent = "";

          await payWithMpesa(phoneNumber, orderId);
          hideConversationOverlay();
        });
    });
  },
};

export default trackOrder;
