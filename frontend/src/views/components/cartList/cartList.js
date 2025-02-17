import products from "../../../data/products";
import cart from "../../../models/cart";
import "./cartList.css";

const cartList = {
  render() {
    let cartUi = "";
    cart.forEach((cartItem) => {
      let { productId, quantity } = cartItem;
      let matchingItem = products.find((product) => product.id === productId);

      const { priceIs, image, name, id } = matchingItem;
      const totalPrice = priceIs * quantity;
      console.log({ priceIs, image, name });
      cartUi += `
            <!-- single cart product begins -->
            <li>
              <div class="cart-product-image-container">
                <img src="${image}" alt="${name} image" />
              </div>
              <div class="cart-product-details-container">
                <div class="top cart-product-name-container">
                  <p>${name}</p>
                </div>
                <div class="bottom">
                  <div class="quontity-container">
                    <p>Quontity</p>

                    <select name="cart-quontity" id="">
                      <option value="quontiy 1" selected>1</option>
                      <option value="quontiy 2">2</option>
                      <option value="quontiy 3">3</option>
                      <option value="quontiy 4">4</option>
                      <option value="quontiy 5">5</option>
                      <option value="quontiy 6">6</option>
                      <option value="quontiy 7">7</option>
                      <option value="quontiy 8">8</option>
                      <option value="quontiy 9">9</option>
                      <option value="quontiy 10">10</option>
                    </select>
                  </div>
                  <div class="price">
                    <span> @ksh.</span>
                    <span>${priceIs}</span>
                  </div>
                  <div class="item-total-price">ksh.${totalPrice}</div>
                </div>
              </div>
              <div class="remove-from-cart">
                <button dataset-product-id="${id}">
                  <ion-icon name="trash-outline"></ion-icon>
                  <!-- <img src="assets/icons/delete.png" alt=" delete-icon"> -->
                </button>
              </div>
            </li>
      `;
    });
    return cartUi;
  },
};
export default cartList;
