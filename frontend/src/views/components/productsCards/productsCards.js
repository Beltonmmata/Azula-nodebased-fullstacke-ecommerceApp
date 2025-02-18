import products from "../../../data/products";
import ratingComponent from "../ratingComponent/ratingComponent";
import "./productsCards.css";
//import "./../../../controllers/handleHomepageEvents";

const productsCards = {
  render(products) {
    let productUi = "";
    products.forEach((product) => {
      let { priceIs, priceWas, rating } = product;
      let { avarageRating, count } = rating;
      let priceOff = Math.trunc(((priceWas - priceIs) / priceWas) * 100);
      productUi += `
         <div class="product-card">
              <div class="product-image">
                <img src="${product.image}" alt=" product image" />
              </div>
              <div class="products-details">
                <div class="products-name">
                <a href="/#/product/:${product.id}">
                ${product.name}
               </a>             
                </div>
                <div class="product-price">
                  <div class="price-is">ksh<span>${product.priceIs}</span></div>
                  <div class="price-was">ksh<span>${
                    product.priceWas
                  }</span></div>
                  <div class="price-off">(-<span>${priceOff}</span>)</div>
                </div>
                <div class="ratting-component l-font">
                  <!--render ratting component-->
                  
                  ${ratingComponent.render(avarageRating, count)}
                </div>
                <div class="products-review">
                  <div class="reviews ">
                  
                   <ion-icon name="chatbubbles-outline"></ion-icon>
                    ${product.reviews} reviews
                  </div>
                  <div class="likes ">
                   <ion-icon name="heart-outline"></ion-icon>
                    
                    ${product.likes} likes
                  </div>
                
              </div>
              <div class="buy-action flex-center-container">
                <button class="add-to-cart-btn flex-center-container" data-product-id="${
                  product.id
                }" >
                  
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

    console.log("render cards ui");

    return productUi;
  },
};

export default productsCards;
