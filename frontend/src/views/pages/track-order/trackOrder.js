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

    const { createdAt, orderStatus, orderItems } = order;
    const orderDate = dayjs(createdAt).format("MMM DD, YYYY");

    return `
      <div class="track-order-wrapper">
        <div class="top-header-section">
          <div class="order-details">
            <h2><ion-icon name="document-text-outline"></ion-icon> Order Details</h2>
            <p><strong>Date Ordered:</strong> ${orderDate}</p>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <button class="btn cancel-order"><ion-icon name="close-circle-outline"></ion-icon> Cancel</button>
          </div>

          <div class="delivery-details">
            <h3><ion-icon name="car-outline"></ion-icon> Delivery Info</h3>
            <p><strong>Arriving on:</strong> Monday 25th 2055</p>
            <p class="order-status">Status: <span>${orderStatus}</span></p>
            <div class="progress-labels-container">
              <div class="progress-label">Pending</div>
              <div class="progress-label current-status">Created</div>
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

        <div class="main container">
          <div class="bottom-details-section">
            <div class="items-list">
              <h3><ion-icon name="pricetag-outline"></ion-icon> Items</h3>
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
                        <button class="btn primary-btn">
                          <ion-icon name="star-outline"></ion-icon> Review
                        </button>
                      </div>
                    </div>
                  `;
                })
              ).then((html) => html.join(""))}
            </div>

            <div class="order-summary">
              <h3><ion-icon name="calculator-outline"></ion-icon> Summary</h3>
              <p><strong>Items Subtotal:</strong> Ksh.228</p>
              <p><strong>Coupon Bonus:</strong> Ksh.28</p>
              <p><strong>VAT:</strong> Ksh.28 <span>(10%)</span></p>
              <p><strong>Shipping Fee:</strong> Ksh.200</p>
              <hr />
              <p><strong>Total:</strong> Ksh.228</p>

              <button id="lipanampesa-btn" 
              class="btn secondary-btn w-full" 
              data-orderid="${orderId}"
              style="                
                display:flex;
                align-item:center;
                justify-content:center;
              ">
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
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      showConversationOverlay(`
        <form id="lipanampesa-form">
          <h3 class="header-message">
            Kindly enter your MPESA number to make payments. We will receive an mpesa pin prompt on your phone once you click pay
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

      // Cancel overlay
      document
        .getElementById("lipanampesa-overlay-cancel-btn")
        .addEventListener("click", () => {
          hideConversationOverlay();
        });

      // Handle submission
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
              "Enter a valid number (e.g. 712345678 or 112345678)";
            return;
          }

          const phoneNumber = `254${raw}`;
          errorEl.textContent = ""; // Clear errors
          console.log(phoneNumber, orderId);

          await payWithMpesa(phoneNumber, orderId);
          hideConversationOverlay();
        });
    });
  },
};

export default trackOrder;
