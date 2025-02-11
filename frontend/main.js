import "./style.css";
import homePage from "./src/views/pages/home-page/homePage";
import shopPage from "./src/views/pages/shop-page/shopPage";
import { parseRequestUrl } from "./src/utils/browserRouter";
import errorPage from "./src/views/pages/404-Error-page/404-Error";
import cartPage from "./src/views/pages/cart-page/cartPage";
// import "./src/controllers/handleHomepageEvents";
const routes = {
  "/": homePage,
  "/shop": shopPage,
  "/cart": cartPage,
};
const router = () => {
  const request = parseRequestUrl;
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? `/:id${request.id}` : "") +
    (request.action ? `/${request.action}` : "");

  const page = routes[parseUrl] ? routes[parseUrl] : errorPage;

  document.querySelector("#app").innerHTML = page.render();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
