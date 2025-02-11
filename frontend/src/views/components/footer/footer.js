import "./footer.css";
const footer = {
  render() {
    return `
     <!-- footer -->
     
     <div class="footer-container">
       <div class="links">
         <div class="col-1">
           <a href="#" class="logo"><span>A</span>zula</a>
         </div>
         <div class="col-2">
           <h3>Important links</h3>
           <ul>
             <a href="#">Contact us</a>
             <a href="#">About us</a>
             <a href="#">Licence </a>
             <a href="#">FAQs</a>
             <a href="#">Policy</a>
             <a href="#">Our T&C</a>
           </ul>
         </div>
         <div class="col-3">
           <h3>Visit</h3>
           <ul>
             <a href="#">Shop</a>
             <a href="#">Product</a>
             <a href="#">Promotions</a>
             <a href="#">Affiliate</a>
             <a href="#">Regist/login account</a>
             <a href="#">Cart</a>
           </ul>
         </div>
         <div class="col-4">
           <h3>Social Media</h3>
           <ul>
             <a href="#">
               <!-- <img src="assets/icons/facebook-app-symbol.png" alt="" /> -->
               <ion-icon name="logo-facebook"></ion-icon>
             </a>
             <a href="#">
               <!-- <img src="assets/icons/instagram.png" alt="" /> -->
               <ion-icon name="logo-instagram"></ion-icon>
             </a>
             <a href="#">
               <!-- <img src="assets/icons/twitter.png" alt="" /> -->
               <ion-icon name="logo-twitter"></ion-icon>
             </a>
             <a href="#">
               <!-- <img src="assets/icons/twitter.png" alt="" /> -->
               <ion-icon name="logo-linkedin"></ion-icon>
             </a>
           </ul>
         </div>
       </div>
       <div class="copyright">
         All Rights Reserved By Developer Belton &copy;2025
       </div>
     </div>
   
  `;
  },
};

export default footer;
