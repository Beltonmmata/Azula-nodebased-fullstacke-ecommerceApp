//       DOMNode.SacrollInToView()

import cartSummary from "../../components/cart-summary/cartSummary";
import cartList from "../../components/cartList/cartList";
import footer from "../../components/footer/footer";
import mainHeader from "../../components/main-header/mainHeader";
import cart from "../../../models/cart";
import "./cartPage.css";
import { hideLoading } from "../../../controllers/loading";
const cartPage = {
  render: async () => {
    if (cart.userCart.length < 1) {
      return `
         <header>
         ${mainHeader.render()} 
       </header>
       <main>
         <li>
            <div class="empty-cart-container">
              <h3>Your cart is empty kindly add products to shop</h3>
              <a href="/#/shop">Go To Shop</a>
            </div>
            </li>
       </main>
      `;
    } else {
      return `
    <header>
       ${mainHeader.render()} 
    </header>
    <main>
      <section class="cart-container"id='cart-container '>
          <!-- cartPage main content -->
          
        
        <div class="container cart-page-main-container">
       
          <div class="left-container cart-items-list">

              <h2 class="cart-page-header">
              ${
                cart.userCart.length === 1
                  ? "Your Cart Item"
                  : "Your Cart Items"
              }
              </h2>
              <!-- render the cart list component -->
              <ul>
               ${await cartList.render()}
              </ul>
              <div class="continue-shopping">
                <a href="/#/shop">
                  <ion-icon name="arrow-back-outline"></ion-icon>
                  <span>Continue shopping</span>
                </a>
              </div>
          </div>
          <div class="right-container cart-summary-details shadow-lg">
          ${await cartSummary.render()}
          </div>
        </div>
      </section>
       
    </main>
    <footer>
       ${footer.render()}
    </footer>
   `;
    }
  },
  afterRender() {
    mainHeader.afterRender();
    cartList.afterRender();
    cartSummary.afterRender();
  },
};
export default cartPage;
