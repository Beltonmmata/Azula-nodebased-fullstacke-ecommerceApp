import products from "../../../data/products";
import "./productsCards.css";
import { eventHandler } from "../../../controllers/handleHomepageEvents";

const renderProductsCards = (products) => {
  let productUi = "";
  products.forEach((product) => {
    productUi += `
         <div class="product-card">
              <div class="product-image">
                <img src="${product.image}" alt=" product image" />
              </div>
              <div class="products-details">
                <div class="products-name">${product.name}</div>
                <div class="product-price">
                  <div class="price-is">ksh<span>${product.priceIs}</span></div>
                  <div class="price-was">ksh<span>${product.priceWas}</span></div>
                  <div class="price-off">(<span>-22%</span>)</div>
                </div>
                <div class="ratting-component l-font">
                  <div class="stars flex-center-container">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-half-outline"></ion-icon>
                  </div>
                  (
                  <div class="no-of-stars">${product.rating.stars}</div>
                  /
                  <div class="no-of-ratting">${product.rating.count} Ratting</div>
                  )
                </div>
                <div class="products-review">
                  <div class="reviews flex-center-container">
                    <!-- <img src="assets/icons/edit.png" alt="commennt icon" /> -->
                    <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                    (${product.reviews})reviews
                  </div>
                  <div class="likes flex-center-container">
                    <!-- <img src="assets/icons/heart.png" alt="like icon" /> -->
                    <ion-icon name="heart-outline"></ion-icon>
                    <!-- <ion-icon name="heart"></ion-icon> -->
                    (${product.likes})likes
                  </div>
                
              </div>
              <div class="buy-action flex-center-container">
                <button class="add-to-cart-btn flex-center-container" data-product-id="${product.id}" >
                  
                 Add To Cart
                </button>
  
                <button class="buy-now-btn">
                  Buy Now
                </button>
              </div>
            </div>
            </div>
         `;
  });
  eventHandler(Event);
  return productUi;
};

export default renderProductsCards;
