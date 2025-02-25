//import axios from "axios";
import productsCards from "../productsCards/productsCards";
import "./featuredProducts.css";
import cart from "../../../models/cart";
import reRender from "../../../utils/reRender";
import homePage from "../../pages/home-page/homePage";
import { getProducts } from "../../../models/products";
const featuredProducts = {
  afterRender() {
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      let productId = button.dataset.productId;

      button.addEventListener("click", () => {
        cart.addToCart(productId);

        reRender(homePage);
        console.log(cart.userCart);
      });
    });

    console.log("render btn event");
  },
  render: async () => {
    const products = await getProducts();
    console.log(products);
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

export default featuredProducts;
