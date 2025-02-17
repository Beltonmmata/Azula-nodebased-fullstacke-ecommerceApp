import "./cartSummary.css";

const cartSummary = {
  render() {
    return `
        <h2>Your Cart Summary</h2>
        <ul>
            <li class="total-items">
            <div class="label">Total items</div>
            <div class="figure">5 items</div>
            </li>
            <li class="total-price">
            <div class="label">Total price</div>
            <div class="figure">ksh. 300</div>
            </li>
            <li class="promotion-discount">
            <div class="label">Promotion discount</div>
            <div class="figure">50</div>
            </li>
            <li class="tax-parcentage">
            <div class="label">Tax parcentage</div>
            <div class="figure">10%</div>
            </li>
            <li class="taxed-price">
            <div class="label">Taxed price</div>
            <div class="figure">ksh.30</div>
            </li>
            <li class="cart-subtotal">
            <div class="label">Subtotal</div>
            <div class="figure">ksh.300</div>
            </li>
        </ul>
        <div class="procede-to-checkout-btn">
            <a href="/#/checkout">Procede To Checkout</a>
        </div>
        `;
  },
};
export default cartSummary;
