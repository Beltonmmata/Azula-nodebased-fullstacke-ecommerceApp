import "./style.css";
import homePage from "./src/views/pages/home-page/homePage";
import shopPage from "./src/views/pages/shop-page/shopPage";
import { parseRequestUrl } from "./src/utils/browserRouter";
import errorPage from "./src/views/pages/404-Error-page/404-Error";
import cartPage from "./src/views/pages/cart-page/cartPage";
import productPage from "./src/views/pages/product-page/productPage";
// import "./src/controllers/handleHomepageEvents";
const routes = {
  "/": homePage,
  "/shop": shopPage,
  "/cart": cartPage,
  "/product/:id": productPage,
};
const router = () => {
  const { resource, id, action } = parseRequestUrl(); // Get the request data
  const parseUrl =
    (resource ? `/${resource}` : "/") +
    (id ? `/${id}` : "") +
    (action ? `/${action}` : "");

  let page = routes[parseUrl];

  // If no exact match is found, check for dynamic routes
  if (!page) {
    Object.keys(routes).forEach((route) => {
      if (route.includes(":")) {
        const baseRoute = route.split("/:")[0]; // Extract "/product" from "/product/:id"
        if (parseUrl.startsWith(baseRoute)) {
          page = routes[route]; // Assign the correct page
        }
      }
    });
  }

  // If no match is found, use errorPage
  page = page ? page : errorPage;

  const pageHtml = page.render ? page.render() : page;
  document.querySelector("#app").innerHTML = pageHtml;

  // document.querySelector("#app").innerHTML = page.render();
  // document.querySelector("#app").innerHTML = page.render ? page.render() : page;
  if (page.afterRender) {
    page.afterRender();
  }
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
