import "./newsletter.css";

const newsletter = {
  render() {
    return `
      <div class="newsletter-section-container">
        <div class="newsletter-container">
          <div class="left-newsletter-container">
            <h2>Weekly newsletter</h2>
            <p>Subscribe to our weekly newsleter so as you never miss out our updates.</p>
            <ul class="newsletter-features">
              <li><ion-icon name="checkmark-circle"></ion-icon> Be notified of new arrivals</li>
              <li><ion-icon name="checkmark-circle"></ion-icon> Know when there is offers</li>
              <li><ion-icon name="checkmark-circle"></ion-icon> Be updated on Hot deals</li>
            </ul>
          </div>
          <div class="right-newsletter-container">
            <form id="newsletter-form">
              <input
                type="text"
                id="first-name-input"
                placeholder="Enter your first name"
                required
              />
              <input
                type="email"
                id="newsletter-input"
                placeholder="Enter your email"
                required
              />
              <button id="newsletter-btn" type="submit">Subscribe</button>
            </form>
            <p class="newsletter-note">No spam, ever. Unsubscribe at any time.</p>
            <div id="newsletter-error" class="newsletter-error"></div>
          </div>
        </div>
      </div>
    `;
  },

  afterRender() {
    const form = document.getElementById("newsletter-form");
    const errorBox = document.getElementById("newsletter-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      errorBox.textContent = "";

      // Simulate failed submission
      setTimeout(() => {
        errorBox.textContent =
          "Unable to submit your request. Please contact the website administrator.";
      }, 1000);
    });
  },
};

export default newsletter;
