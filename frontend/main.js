import "./style.css";
import homePage from "./src/views/pages/home-page/homePage";
import shopPage from "./src/views/pages/shop-page/shopPage";
import { parseRequestUrl } from "./src/utils/browserRouter";
import errorPage from "./src/views/pages/404-Error-page/404-Error";
import cartPage from "./src/views/pages/cart-page/cartPage";
// import "./src/controllers/handleHomepageEvents";
const routes = {
  "/shop": shopPage,
  "/": homePage,
  
  "/cart": cartPage,
};
const router = () => {
  const { resource, id, action } = parseRequestUrl(); // Get the request data
  const parseUrl = 
    (resource ? `/${resource}` : "/") +
    (id ? `/${id}` : "") +
    (action ? `/${action}` : "");

  const page = routes[parseUrl] ? routes[parseUrl] : errorPage;

  const pageHtml = page.render ? page.render() : page;
  document.querySelector("#app").innerHTML = pageHtml;

  // document.querySelector("#app").innerHTML = page.render();
  // document.querySelector("#app").innerHTML = page.render ? page.render() : page;
  if(page.afterRender){
    page.afterRender()
  }
    
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);



