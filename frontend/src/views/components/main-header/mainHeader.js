import {
  hideUserMenu,
  showUserMenu,
} from "../../../controllers/userMenuOverlay";
import cart from "../../../models/cart";
import localStorageObj from "../../../models/local-storage";

import userProfilePreview from "../user-profile-preview/userProfilePreview";
import "./mainHeader.css";

const mainHeader = {
  render() {
    const cartQty = cart.getCartQuantity();
    return `
    
    <div class="header-container">
    <div class="header-container-top">
      <div>
        <p>Wish to talk to us?</p>
        <a href="/#/contact-us">Contact Us</a>
        <a href="/#/about-us">About Us</a>
      </div>
    </div>
    <div class="header-container-bottom shadow-lg">
      <a href="/">
        <div class="logo">
          <span>A</span>
          zula
        </div>
      </a> 
       
      <div class="header-end-container">
       
        <div class="profile" id="profile-icon">
        <ion-icon name="person-outline"></ion-icon>  
        </div>
        <div class="mode-setting">        
          <ion-icon name="moon-outline"></ion-icon>
        </div>
        <a href="/#/cart">
          <div class="cart">
            <ion-icon name="cart-outline"></ion-icon>          
            <span class="cart-qty flex-center-container">${cartQty}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
  
  <div class="overlay " id="user-menu-overlayer">
    <div class="user-menu">
      <div class="close-user-menu" id="close-user-menu">
        <ion-icon name="close-outline"></ion-icon>
      </div>
      <div class="user-profile-preview">       
    
       ${userProfilePreview.render()}
      </div>
    </div>
  </div>`;
  },
  afterRender() {
    const isLoggedIn = localStorageObj.getItem("user");

    // Profile toggle
    document.getElementById("profile-icon").addEventListener("click", () => {
      isLoggedIn ? showUserMenu() : (document.location.hash = "/signin");
    });

    document.getElementById("close-user-menu").addEventListener("click", () => {
      hideUserMenu();
    });

    // 💡 Dark mode toggle logic
    const modeToggleBtn = document.querySelector(".mode-setting");
    const body = document.body;

    // Optional: persist theme using localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }

    modeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      // Save preference
      const isDark = body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    userProfilePreview.afterRender();
  },
};

export default mainHeader;
