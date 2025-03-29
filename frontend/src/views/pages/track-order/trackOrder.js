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
    
            <div class="container">
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
                    <div class="progress-label">Preparing</div>
                    <div class="progress-label current-status">Shipped</div>
                    <div class="progress-label">Delivered</div>
                </div>
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
                </div>
            </div>
            <div class="bottom-details-section">
                <div class="items-list">
                ${await Promise.all(
                  orderItems.map(async (item) => {
                    const { imageUrl, name } = await getProduct(item.productId);

                    return `
                        <div class="item">
                            <img
                                class="image"
                                src="${imageUrl}"
                                alt="${name}"
                            />
                            <div class="details">
                            <p><strong>${name}</strong></p>
                            <p>Item ID: ${item.productId}</p>
                            <p>Price: ksh.${item.priceAtOrder} </p>
                            <p>Qty: ${item.quantity}</p>
                            </div>
                        </div>                
                        <hr />
                        `;
                  })
                )}
               
                </div>

                <div class="order-summary">
                <h3>Order Total</h3>
                <p><strong>Subtotal:</strong> $228</p>
                <p><strong>Shipping:</strong> Free</p>
                <p><strong>Sales Tax:</strong> Free</p>
                <hr />
                <p><strong>Total:</strong> $228</p>
                </div>
            </div>
            </div>

    `;
  },
};
export default trackOrder;
