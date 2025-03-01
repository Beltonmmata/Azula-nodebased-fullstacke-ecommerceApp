import productsCards from "../productsCards/productsCards";

import "./shopProducts.css";
import cart from "../../../models/cart";
import reRender from "../../../controllers/reRender";
import shopPage from "../../pages/shop-page/shopPage";
import { getProducts } from "../../../models/products";
const shopProducts = {
  afterRender() {
    document.querySelectorAll(".buy-now-btn").forEach((button) => {
      let productId = button.dataset.productId;

      button.addEventListener("click", () => {
        cart.addToCart(productId);
        console.log("btuy now clicked");

        document.location.hash = "/cart";
      });
    });
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      let productId = button.dataset.productId;

      button.addEventListener("click", () => {
        cart.addToCart(productId);

        reRender(shopPage);
        console.log(cart.userCart);
      });
    });

    console.log("render btn event");
  },
  render: async () => {
    const products = await getProducts();
    return `
          <!-- featured products -->
          <div class="featured-products-container">
          <div class="featured-products-header">
            <h2 class="section-subtitle">All categories</h2>
           
          </div>

          <div class="products-container">
            ${productsCards.render(products)}
          </div>
          </div>
          <!-- pagination -->
              <div class="pagination-container container flex-center-container">
                <div class="pagination flex-center-container">
                  <div class="previous-page flex-center-container">
                    <ion-icon name="arrow-back-circle-outline"></ion-icon>
                  </div>
                  <div class="page flex-center-container">
                    <p>4</p>
                  </div>
                  <div class="next-page flex-center-container">
                    <ion-icon name="arrow-forward-circle-outline"></ion-icon>
                  </div>
                </div>
              </div>
        </div>
      `;
  },
};

export default shopProducts;
