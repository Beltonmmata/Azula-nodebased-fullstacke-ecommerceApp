import "./mainHeader.css";

const renderMainHeader = () => {
  return `
    
    <div class="header-container">
    <div class="header-container-top">
      <div>
        <p>Wish to talk to us?</p>
        <a href="#contact-us">Contact Us</a>
        <a href="#about-us">About Us</a>
      </div>
    </div>
    <div class="header-container-bottom">
      <div class="logo">
        <span>A</span>
        zula
      </div>
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
        <div class="cart">
          <ion-icon name="cart-outline"></ion-icon>
         
          <span class="cart-qty flex-center-container">10</span>
        </div>
      </div>
    </div>
  </div>`;
};

export default renderMainHeader;
