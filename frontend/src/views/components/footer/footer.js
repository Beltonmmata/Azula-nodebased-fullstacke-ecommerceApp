import "./footer.css";
const footer = {
  render() {
    return `    
    <footer class="footer">
    <div class="footer-top">
      <div class="container footer-grid">
        <!-- Footer Brand -->
        <div class="footer-brand">
          <a href="#" class="logo"><span>A</span>zula</a>
          <p class="footer-brand-text">
            Azula delivers top-notch commerce solutions. Fast, secure, and trusted by Kenyan businesses.
          </p>
  
          <div class="wrapper"><span class="span">Location:</span> <address>Westlands, Nairobi</address></div>
          <div class="wrapper"><span class="span">Call-us:</span> <a href="tel:+254712345678" class="footer-link">+254 708152289</a></div>
          <div class="wrapper"><span class="span">Email-us:</span> <a href="mailto:info@azula.com" class="footer-link">info@azula.com</a></div>
        </div>
  
        <!-- Links Group 1 -->
        <ul class="footer-list">
          <li><p class="footer-list-title">Top Pages</p></li>
          <li><a href="#" class="footer-link">About</a></li>
          <li><a href="#" class="footer-link">Pricing</a></li>
          <li><a href="#" class="footer-link">Documentation</a></li>
          <li><a href="#" class="footer-link">API</a></li>
        </ul>
  
        <!-- Links Group 2 -->
        <ul class="footer-list">
          <li><p class="footer-list-title">Resources</p></li>
          <li><a href="#" class="footer-link">Contact</a></li>
          <li><a href="#" class="footer-link">Support</a></li>
          <li><a href="#" class="footer-link">Careers</a></li>
          <li><a href="#" class="footer-link">Blog</a></li>
        </ul>
  
        <!-- Newsletter -->
        <div class="footer-list">
          <p class="footer-list-title">Newsletter</p>
          <p class="footer-list-text">Subscribe to get updates, offers & new features.</p>
          <form class="newsletter-form">
            <input type="text" class="input-field" placeholder="Your name" required />
            <input type="email" class="input-field" placeholder="Your email" required />
            <button type="submit" class="newsletter-form-btn ">
              <span class="span">Subscribe</span>
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
          </form>
  
          <ul class="social-list">
            <li><a href="#" class="social-link"><ion-icon name="logo-facebook"></ion-icon></a></li>
            <li><a href="#" class="social-link"><ion-icon name="logo-twitter"></ion-icon></a></li>
            <li><a href="#" class="social-link"><ion-icon name="logo-instagram"></ion-icon></a></li>
            <li><a href="#" class="social-link"><ion-icon name="logo-linkedin"></ion-icon></a></li>
          </ul>
        </div>
      </div>
    </div>
  
    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="container">
        <p class="copyright">
          &copy; 2025 All Rights Reserved by
          <a href="#" class="copyright-link">codewithbelton</a>
        </p>
      </div>
    </div>
  
    <!-- Back to Top -->
    <a href="#top" class="back-top-btn" aria-label="Back to top">
      <ion-icon name="chevron-up"></ion-icon>
    </a>
  </footer>
    `;
  },
};

export default footer;
