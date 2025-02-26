//import products from "../../../data/products";
import ratingComponent from "../ratingComponent/ratingComponent";
import "./productsDetails.css";
import cart from "../../../models/cart";
import reRender from "../../../utils/reRender";
import productPage from "../../pages/product-page/productPage";
import { getProduct } from "../../../models/products";
const productsDetails = {
  render: async (id) => {
    const productID = id;
    let itemObj = await getProduct(productID);
    //let itemObj = products.find((product) => productID === product.id);
    let {
      imageUrl,
      rating,
      name,
      description,
      reviews,
      likes,
      priceWas,
      priceIs,
    } = itemObj;
    let { avarageRating, count } = rating;
    let noOfReviews = reviews.length;

    const productQuontity = (productID) => {
      const item = cart.userCart.find(
        (cartItem) => cartItem.productId === productID
      );

      return item ? item.quantity : 0;
    };

    return `
        
      <div class="single-product-container">
        <div class="image-container">
          <img src="${imageUrl}" />
        </div>
        <!-- details starts -->
        <div class="details-container">
          <h2 class="product-name details-container-child">${name}</h2>
          <p class="product-description details-container-child">
           ${description}
          </p>
          <div class="product-price-container details-container-child">
            <div class="product-price">
              <div class="price-is">ksh<span>${priceIs}</span></div>
              <div class="price-was">ksh<span>${priceWas}</span></div>
              <div class="price-off">(-<span>10</span>)</div>
            </div>
          </div>
          <div class="ratting-component l-font details-container-child">
               ${ratingComponent.render(avarageRating, count)}
          </div>
          <div class="products-review-container details-container-child">
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
          </div>

          <div class="add-to-cart-products-container details-container-child">
            <div class="increment-decrement-quontity flex-center-container">
              <div class="minus flex-center-container">
                <ion-icon name="remove-circle-outline"></ion-icon>
              </div>
              <div class="quantity flex-center-container">
                <p>${productQuontity(productID)}</p>
              </div>
              <div class="plus flex-center-container">
                <ion-icon name="add-circle-outline"></ion-icon>
              </div>
            </div>
            <div class="buy-product-action flex-center-container">
              <button
                class="add-to-cart-btn flex-center-container"
                data-product-id="{id}"
              >
                Add To Cart
              </button>

              <button class="buy-now-btn">Buy Now</button>
            </div>
          </div>
        </div>
        <!-- details ends-->
      </div>
    
        
        `;
  },
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
};
export default productsDetails;
