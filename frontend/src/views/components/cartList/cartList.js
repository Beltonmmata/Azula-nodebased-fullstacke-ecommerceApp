//import products from "../../../data/products";
import localStorageObj from "../../../models/localstorage";
import cart from "../../../models/cart";
import reRender from "../../../controllers/reRender";
import cartPage from "../../pages/cart-page/cartPage";
import "./cartList.css";
import { getProducts } from "../../../models/products";

const cartList = {
  render: async () => {
    const updatedCart = localStorageObj.getItem("cart") || [];
    const products = await getProducts();

    let cartUi = updatedCart
      .map((cartItem) => {
        const { productId, quantity } = cartItem;
        const matchingProduct = products.find(
          (product) => product._id === productId
        );

        if (!matchingProduct) return ""; // Prevent errors if product is missing

        const { priceIs, imageUrl, name, _id, countInStock } = matchingProduct;
        let id = _id;
        const totalPrice = priceIs * quantity;

        const quantityOptions = [...Array(countInStock).keys()]
          .map((stockIndex) => {
            const value = stockIndex + 1;
            const isSelected = quantity === value ? "selected" : "";
            return `<option value="${value}" ${isSelected}>${value}</option>`;
          })
          .join("");

        return `
          <li>
            <div class="cart-product-image-container">
              <img src="${imageUrl}" alt="${name} image" />
            </div>
            <div class="cart-product-details-container">
              <div class="top cart-product-name-container">
                <p>${name}</p>
              </div>
              <div class="bottom">
                <div class="quantity-container">
                  <p>Quantity</p>    
                  <select class="cart-quantity" data-product-id="${id}">
                    ${quantityOptions}
                  </select>
                </div>
                <div class="price">
                  <span>@ksh.</span>
                  <span>${priceIs}</span>
                </div>
                <div class="item-total-price">ksh.${totalPrice}</div>
              </div>
            </div>
            <div class="remove-from-cart">
              <button class="remove-from-cart-btn" data-product-id="${id}">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          </li>
        `;
      })
      .join("");

    return cartUi;
  },

  afterRender() {
    // handle updating cart quontity
    document.querySelectorAll(".cart-quantity").forEach((selectElement) => {
      selectElement.addEventListener("change", async (event) => {
        const productId = event.target.getAttribute("data-product-id");
        const newCartQuontity = parseInt(event.target.value, 10);
        cart.updateCartQuontity(productId, newCartQuontity);
        console.log(`quontity updated ${productId} , ${newCartQuontity}`);
        await reRender(cartPage);
      });
    });
    // handle remove from cart
    document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
      const productId = button.getAttribute("data-product-id");

      button.addEventListener("click", async () => {
        cart.removeFromCart(productId);
        console.log(`${productId} deleted from cart`);
        console.log(cart.userCart);
        await reRender(cartPage);
      });
    });
  },
};

export default cartList;
