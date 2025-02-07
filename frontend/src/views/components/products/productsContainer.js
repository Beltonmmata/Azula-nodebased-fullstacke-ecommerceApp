import products from "./../../../data/products";
import renderProductsCards from "../productsCards/productsCards";
import "./productsContainer.css";
const renderProductsContainer = (products) => {
  //   const productsContainer = document.querySelector(".products-container");
  //   productsContainer.innerHTML = renderProductsCards(products);
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
         ${renderProductsCards(products)}
       </div>
       </div>
       <div class="explore-more-container">
         <a class="Explore-more-link" href="shop.html ">
           Explore More Products</a
         >
       </div>
     </div>
  `;
};

export default renderProductsContainer;
