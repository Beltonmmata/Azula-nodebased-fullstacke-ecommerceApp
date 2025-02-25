import ratingComponent from "../ratingComponent/ratingComponent";
import "./productsCards.css";

const productsCards = {
  render(products) {
    if (!Array.isArray(products) || products.length === 0) {
      console.error("Invalid products data:", products);
      return `<p>No products available.</p>`;
    }

    return products
      .map((product) => {
        let { priceIs, priceWas, rating, _id, imageUrl, reviews } = product;
        let id = _id;
        let { avarageRating, count } = rating;
        let noOfReviews = reviews.length;
        let priceOff = Math.trunc(((priceWas - priceIs) / priceWas) * 100);

        return `
          <div class="product-card">
            <div class="product-image">
              <img src="${imageUrl}" alt="Product image" />
            </div>
            <div class="products-details">
              <div class="products-name">
                <a href="/#/product/${id}">${product.name}</a>             
              </div>
              <div class="product-price">
                <div class="price-is">ksh<span>${priceIs}</span></div>
                <div class="price-was">ksh<span>${priceWas}</span></div>
                <div class="price-off">(-<span>${priceOff}</span>%)</div>
              </div>
              <div class="ratting-component l-font">
                ${ratingComponent.render(avarageRating, count)}
              </div>
              <div class="products-review">
                <div class="reviews">
                  <ion-icon name="chatbubbles-outline"></ion-icon>
                  ${noOfReviews} reviews
                </div>
                <div class="likes">
                  <ion-icon name="heart-outline"></ion-icon>                    
                  0 likes
                </div>
              </div>
              <div class="buy-action flex-center-container">
                <button class="add-to-cart-btn flex-center-container" data-product-id="${id}">
                  Add To Cart
                </button>
                <button class="buy-now-btn">Buy Now</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  },
};

export default productsCards;
