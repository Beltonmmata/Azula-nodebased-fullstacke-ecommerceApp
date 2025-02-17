import localStorageObj from "./localstorage";

const cart = localStorageObj.getItem("cart") || [];
export default cart;

// import {addToCart} from "./../controllers/handleCart.js"
//   { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c3", quantity: 5 },

//   { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c2", quantity: 1 },

//   { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c5", quantity: 1 },

//   { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c4", quantity: 1 },
