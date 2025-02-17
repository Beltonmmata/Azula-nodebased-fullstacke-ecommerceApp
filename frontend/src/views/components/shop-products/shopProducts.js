import productsCards from "../productsCards/productsCards";
import { addToCart } from "../../../controllers/handleCart";
import "./shopProducts.css";
import cart from "../../../models/cart";
import reRender from "../../../utils/reRender";
import shopPage from "../../pages/shop-page/shopPage";
const shopProducts = {
  afterRender() {
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      let productId = button.dataset.productId;

      button.addEventListener("click", () => {
        addToCart(productId);

        reRender(shopPage);
        console.log(cart);
      });
    });

    console.log("render btn event");
  },
  render(products) {
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
