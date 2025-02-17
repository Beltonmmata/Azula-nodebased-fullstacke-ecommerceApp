import "./applyCoupon.css";

const applyCoupon = {
  render() {
    return `
        <p>Get 10% off with promotion code</p>
        <form method="post">
            <input type="text" placeholder="Enter code here" />
            <button type="submit">Apply copun</button>
        </form>
        `;
  },
};
export default applyCoupon;
