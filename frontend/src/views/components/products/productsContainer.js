import products from "./../../../data/products";
import productsCards from "../productsCards/productsCards";
import { addToCart } from "../../../controllers/handleCart";
import "./productsContainer.css";
const productsContainer = {
  afterRender() {
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      let productId = button.dataset.productId;
      let quontity = 1;
      
      button.addEventListener("click", () => {
        addToCart(productId, quontity);
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
