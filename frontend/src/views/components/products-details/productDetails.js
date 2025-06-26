// import dependencies
import ratingComponent from "../ratingComponent/ratingComponent";
import "./productsDetails.css";
import cart from "../../../models/cart";
import reRender from "../../../controllers/reRender";
import productPage from "../../pages/product-page/productPage";
import { getProduct } from "../../../models/products";
import { showMessage } from "../../../controllers/showMessage";

const productsDetails = {
  render: async (id) => {
    const productID = id;
    const itemObj = await getProduct(productID);

    const {
      imageUrl,
      rating,
      name,
      description,
      reviews,
      likes,
      priceWas,
      priceIs,
      countInStock,
    } = itemObj;

    const { avarageRating, count } = rating;
    const noOfReviews = reviews.length;

    const currentQuantity =
      cart.userCart.find((item) => item.productId === productID)?.quantity || 1;

    return `
      <div class="single-product-container">
        <div class="image-container">
          <img src="${imageUrl}" alt="${name}" />
        </div>

        <div class="details-container">
          <h2 class="single-product-name details-container-child">${name}</h2>
          <p class="single-product-description details-container-child">${description}</p>

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
                ${likes || 0} likes
              </div>
            </div>
          </div>

          <div class="add-to-cart-products-container details-container-child">
            <div class="increment-decrement-quontity flex-center-container">
              <div class="minus flex-center-container" data-action="minus">
                <ion-icon name="remove-circle-outline"></ion-icon>
              </div>
              <div class="quantity flex-center-container">
                <p id="product-quantity">${currentQuantity}</p>
              </div>
              <div class="plus flex-center-container" data-action="plus">
                <ion-icon name="add-circle-outline"></ion-icon>
              </div>
            </div>

            <div class="buy-product-action flex-center-container">
              <button class="product-add-to-cart-btn flex-center-container" data-product-id="${productID}" data-max="${countInStock}">
                Add To Cart
              </button>
              <button class="product-buy-now-btn flex-center-container" data-product-id="${productID}" data-max="${countInStock}">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  afterRender() {
    const qtyElement = document.getElementById("product-quantity");
    let quantity = parseInt(qtyElement.textContent);
    const maxQty = parseInt(
      document.querySelector(".product-add-to-cart-btn").dataset.max
    );

    // Quantity buttons
    document.querySelector(".minus").addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        qtyElement.textContent = quantity;
      }
    });

    document.querySelector(".plus").addEventListener("click", () => {
      if (quantity < maxQty) {
        quantity++;
        qtyElement.textContent = quantity;
      } else {
        showMessage("Reached max stock", "warning");
      }
    });

    // ADD TO CART
    document
      .querySelector(".product-add-to-cart-btn")
      .addEventListener("click", () => {
        const productId = document.querySelector(".product-add-to-cart-btn")
          .dataset.productId;
        cart.addToCart(productId, quantity);
        showMessage("Added to cart", "success");
        reRender(productPage);
      });

    // BUY NOW
    document
      .querySelector(".product-buy-now-btn")
      .addEventListener("click", () => {
        const productId = document.querySelector(".product-buy-now-btn").dataset
          .productId;
        cart.addToCart(productId, quantity);
        showMessage("Redirecting to cart...", "success");
        location.hash = "#/cart";
      });

    console.log("Product details interactive buttons ready.");
  },
};

export default productsDetails;
