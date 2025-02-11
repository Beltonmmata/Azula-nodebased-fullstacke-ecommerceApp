import "./newsletter.css";

const newsletter = {
  render() {
    return `
  <!-- newsletter -->
  <div class="section-container">
  <div class="newsletter-container">
    <div class="left-newsletter-container">
      <h2>Weekly Newsletter</h2>
      <p>
        Subscribe to our weekly newsletter to be the first one to be
        notified when new stock arrives
      </p>
    </div>
    <div class="right-newsletter-container">
      <form>
        <input
          type="email"
          id="newsletter-input"
          placeholder="Enter your Email"
        />
        <button id="newsletter-btn">Subscribe</button>
      </form>
    </div>
  </div>
</div>
  `;
  },
};

export default newsletter;
