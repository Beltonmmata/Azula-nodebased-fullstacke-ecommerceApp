import { updateCartQuantity } from "../../../controllers/handleCart";
import cart from "../../../models/cart";
import "./mainHeader.css";

const mainHeader = {
  // afteRender(){
  //   document.getElementsByClassName("cart-qty").innerHTML = updateCartQuantity()
  // },
  render() {
    return `
    
    <div class="header-container">
    <div class="header-container-top">
      <div>
        <p>Wish to talk to us?</p>
        <a href="/contact-us">Contact Us</a>
        <a href="/about-us">About Us</a>
      </div>
    </div>
    <div class="header-container-bottom">
      <a href="/">
        <div class="logo">
          <span>A</span>
          zula
        </div>
      </a> 
      <form action="" id="sarch-box-form-container">
        <input
          type="text"
          placeholder="search here"
          id="search-bar-input"
        />
        <button id="searchbar-btn">
         
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </form>
      <div class="header-end-container">
        <div class="profile">
          <ion-icon name="person-outline"></ion-icon>
        </div>
        <div class="mode-setting">        
          <ion-icon name="moon-outline"></ion-icon>
        </div>
        <a href="/#/cart">
          <div class="cart">
            <ion-icon name="cart-outline"></ion-icon>          
            <span class="cart-qty flex-center-container">${updateCartQuantity(
              cart
            )}</span>
          </div>
        </a>
      </div>
    </div>
  </div>`;
  },
};

export default mainHeader;
