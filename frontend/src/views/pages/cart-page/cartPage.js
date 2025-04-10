import applyCoupon from "../../components/apply-coupon/applyCoupon";
import cartSummary from "../../components/cart-summary/cartSummary";
import cartList from "../../components/cartList/cartList";
import footer from "../../components/footer/footer";
import mainHeader from "../../components/main-header/mainHeader";
import newsletter from "../../components/newsletter/newsletter";
import cart from "../../../models/cart";
import "./cartPage.css";
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
      <section id='cart-container '>
          <!-- cartPage main content -->
          
        <h2 class="container cart-page-header cart-page-content">
        ${cart.userCart.length === 1 ? "Your Cart Item" : "Your Cart Items"}
        
        </h2>
        <div class="cart-page-main-container">
          <div class="left-container cart-items-list">
            
              <!-- render the cart list component -->
               ${await cartList.render()}
           
          </div>
          <div class="right-container cart-summary-details">
            <div class="apply-copun-container">
              <!-- render the apply coupon component -->
              ${applyCoupon.render()}
            </div>
            <div class="container-cart-summary">
              <!-- render the cart summary -->
              ${await cartSummary.render()}
            </div>
          </div>
        </div>
      </section>
       <section id='newsletter-section'>
          ${newsletter.render()}
      </section>
    </main>
    <footer>
       ${footer.render()}
    </footer>
   `;
    }
  },
  afterRender() {
    cartList.afterRender();
    cartSummary.afterRender();
  },
};
export default cartPage;
