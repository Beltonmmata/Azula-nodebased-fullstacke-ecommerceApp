import productsCards from "../productsCards/productsCards";

import "./shopProducts.css";
import cart from "../../../models/cart";
import reRender from "../../../controllers/reRender";
import shopPage from "../../pages/shop-page/shopPage";
import { getProducts } from "../../../models/products";
import { likeProduct, unlikeProduct } from "../../../models/likes";
const shopProducts = {
  afterRender() {
    document.querySelectorAll(".buy-now-btn").forEach((button) => {
      let productId = button.dataset.productId;

      button.addEventListener("click", () => {
        cart.addToCart(productId);
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
    //like a products

    document.querySelectorAll("#like-product-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const id = button.getAttribute("data-product-id");
        likeProduct(id);
        reRender(shopPage);
      });

      button.addEventListener("dblclick", (e) => {
        e.preventDefault();
        const id = button.getAttribute("data-product-id");
        unlikeProduct(id);
        reRender(shopPage);
      });
    });
    // Pagination event listeners
    document.querySelector(".previous-page").addEventListener("click", () => {
      let urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
      let currentPage = parseInt(urlParams.get("page")) || 1;
      if (currentPage > 1) {
        urlParams.set("page", currentPage - 1);
        document.location.hash = `/shop?${urlParams.toString()}`;
      }
    });

    document.querySelector(".next-page").addEventListener("click", () => {
      let urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
      let currentPage = parseInt(urlParams.get("page")) || 1;
      urlParams.set("page", currentPage + 1);
      document.location.hash = `/shop?${urlParams.toString()}`;
    });
  },
  render: async (query) => {
    const products = await getProducts(query);
    const currentPage = query.page || "1";
    console.log(currentPage);
    return `
          <!-- featured products -->
          <div class="featured-products-container">
          <div class="featured-products-header">
            <h2 class="section-subtitle">${
              query.category || "All"
            } category</h2>
           
          </div>

          <div class="products-container">
            ${productsCards.render(products)}
          </div>
          </div>
          <!-- pagination -->
              <div class="pagination-container container flex-center-container">
                <div class="pagination flex-center-container">
                  <div class="previous-page flex-center-container">
                   <ion-icon name="chevron-back-outline"></ion-icon>
                  </div>
                  <div class="page flex-center-container">
                    <p>${currentPage}</p>
                  </div>
                  <div class="next-page flex-center-container">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                  </div>
                </div>
              </div>
        </div>
      `;
  },
};

export default shopProducts;
