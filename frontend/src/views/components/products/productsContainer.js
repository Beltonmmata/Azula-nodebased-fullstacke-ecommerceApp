import productsCards from "../productsCards/productsCards";
import { addToCart } from "../../../controllers/handleCart";
import "./productsContainer.css";
import mainHeader from "../main-header/mainHeader";
import cart from "../../../models/cart";
const productsContainer = {
  afterRender() {
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      let productId = button.dataset.productId;

      button.addEventListener("click", () => {
        addToCart(productId);

        mainHeader.render();

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
            <h2 class="section-subtitle">Our Featured Products</h2>
            <p class="section-title">
              We have prepared for you a selection of hot deals
            </p>
          </div>

          <div class="products-container">
            ${productsCards.render(products)}
          </div>
          </div>
          <div class="explore-more-container">
            <a class="Explore-more-link" href="/#/shop">
              Explore More Products</a
            >
          </div>
        </div>
      `;
  },
};

export default productsContainer;
