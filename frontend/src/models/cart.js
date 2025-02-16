import localStorageObj from "./localstorage";

// import {addToCart} from "./../controllers/handleCart.js"
const cart = localStorageObj.getItem("cart") || [];
export default cart;
