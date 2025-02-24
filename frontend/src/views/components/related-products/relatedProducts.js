import productsCards from "../productsCards/productsCards";

import "./relatedProducts.css";
import reRender from "../../../utils/reRender";
import productPage from "../../pages/product-page/productPage";
import cart from "../../../models/cart";
const relatedProducts = {
  afterRender() {
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      let productId = button.dataset.productId;

      button.addEventListener("click", () => {
        cart.addToCart(productId);

        reRender(productPage);
      });
    });

    console.log("render btn event");
  },
  render(products) {
    console.log("its loading related products");
    return `
          <!-- featured products -->
          <div class="featured-products-container">
          <div class="featured-products-header">
            <h2 class="section-subtitle">See Also Related Products</h2>
            
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

export default relatedProducts;
