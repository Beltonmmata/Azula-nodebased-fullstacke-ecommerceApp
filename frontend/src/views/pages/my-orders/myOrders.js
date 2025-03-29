import { getAllOrders } from "../../../models/order";
//import {  getProduct } from "../../../models/product";
import { getProduct } from "../../../models/products";
import dayjs from "dayjs";
import "./myOrders.css";

const ordersPage = {
  render: async () => {
    const orders = await getAllOrders();
    if (!orders || orders.length === 0) {
      return `<div class="main"><div class="page-title">No Orders Found</div></div>`;
    }

    return `
      <div class="main">
        <div class="page-title">Your Orders</div>
        <div class="orders-grid">
          ${await Promise.all(
            orders.map(async (order) => {
              const { _id, createdAt, totalPrice, orderItems, orderStatus } =
                order;

              // Fetch product names
              const orderItemsHtml = await Promise.all(
                orderItems.map(async (item) => {
                  const { name } = await getProduct(item.productId); // Fetch product name
                  return `
                    <div class="product-item">
                      <div class="product-details">
                        <div class="product-name">Product: ${name}</div>
                        <div class="product-quantity">Quantity: ${item.quantity}</div>
                        <div class="product-price">KES ${item.priceAtOrder}</div>
                    </div>
                    </div>
                  `;
                })
              );

              return `
              <div class="order-container">
                <div class="order-header">
                  <div class="order-header-left-section">
                    <div class="order-date">
                      <div class="order-header-label">Order Placed:</div>
                      <div>${dayjs(createdAt).format("MMM DD, YYYY")}</div> 
                    </div>
                    <div class="order-total">
                      <div class="order-header-label">Total:</div>
                      <div>KES ${totalPrice}</div>
                    </div>
                  </div>
                  <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${_id}</div>
                    <div class="order-status">
                      <div class="order-header-label">Status:</div>
                      <div>${orderStatus}</div> 
                    </div>
                  </div>
                </div>

                <div class="order-details-grid">
                  ${orderItemsHtml.join("")} 
                </div>

                <div class="order-actions">
      
                   <a class="track-package-button btn secondary-btn" href="/#/trackorder?orderId=${_id}">Track package</a>  
                </div>
              </div>
            `;
            })
          ).then((html) => html.join(""))}
        </div>
      </div>
    `;
  },
};

export default ordersPage;
