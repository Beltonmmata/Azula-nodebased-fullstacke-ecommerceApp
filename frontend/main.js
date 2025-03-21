import "./style.css";
import homePage from "./src/views/pages/home-page/homePage";
import shopPage from "./src/views/pages/shop-page/shopPage";
import { parseRequestUrl } from "./src/controllers/browserRouter";
import errorPage from "./src/views/pages/404-Error-page/404-Error";
import cartPage from "./src/views/pages/cart-page/cartPage";
import productPage from "./src/views/pages/product-page/productPage";
import { hideLoading, showLoading } from "./src/controllers/loading";
import checkoutPage from "./src/views/pages/checkout/checkout";
import ordersPage from "./src/views/pages/my-orders/myOrders";
import signin from "./src/views/pages/authentication/signin";
import register from "./src/views/pages/authentication/signup";
// import "./src/controllers/handleHomepageEvents";
const routes = {
  "/": homePage,
  "/shop": shopPage,
  "/cart": cartPage,
  "/product/:id": productPage,
  "/checkout/:step": checkoutPage,
  "/orders": ordersPage,
  "/signin": signin,
  "/register": register,
};
const router = async () => {
  showLoading();
  const { resource, id, action, query } = parseRequestUrl(); // ✅ Extract query parameters

  // ✅ Construct base path (ignoring query parameters)
  const parseUrl =
    (resource ? `/${resource}` : "/") +
    (id ? `/${id}` : "") +
    (action ? `/${action}` : "");

  let page = routes[parseUrl];

  // ✅ If no exact match, check for dynamic routes (e.g., `/shop/:id`)
  if (!page) {
    Object.keys(routes).forEach((route) => {
      if (route.includes(":")) {
        const baseRoute = route.split("/:")[0]; // Extract "/shop" from "/shop/:id"
        if (parseUrl.startsWith(baseRoute)) {
          page = routes[route]; // Assign the correct page
        }
      }
    });
  }

  // ✅ Ensure base path works even with query parameters
  if (!page && routes[`/${resource}`]) {
    page = routes[`/${resource}`]; // ✅ Fixes `/shop?category=all`
  }

  // ✅ Pass query parameters to the matched page
  if (page) {
    const pageHtml = page.render ? await page.render(query) : page;
    document.querySelector("#app").innerHTML = pageHtml;
    if (page.afterRender) {
      page.afterRender();
    }
  } else {
    document.querySelector("#app").innerHTML = errorPage.render();
  }

  hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
