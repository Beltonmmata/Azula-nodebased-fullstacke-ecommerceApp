import productsCards from "../productsCards/productsCards";

import "./relatedProducts.css";
import reRender from "../../../controllers/reRender";
import productPage from "../../pages/product-page/productPage";
import cart from "../../../models/cart";
import { getProducts } from "../../../models/products";
const relatedProducts = {
  afterRender() {
    document.querySelectorAll(".buy-now-btn").forEach((button) => {
      let productId = button.dataset.productId;

      button.addEventListener("click", () => {
        cart.addToCart(productId);
        console.log("buy now clicked");

        document.location.hash = "/cart";
      });
    });
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      let productId = button.dataset.productId;

      button.addEventListener("click", () => {
        cart.addToCart(productId);

        reRender(productPage);
      });
    });

    console.log("render btn event");
  },
  render: async () => {
    const products = await getProducts();
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
