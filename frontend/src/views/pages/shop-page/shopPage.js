import products from "../../../data/products";
import shopProducts from "../../components/shop-products/shopProducts";
import footer from "../../components/footer/footer";
import mainHeader from "../../components/main-header/mainHeader";
import newsletter from "../../components/newsletter/newsletter";

import "./shopPage.css";

const shopPage = {
  render() {
    return `
    <header>
       ${mainHeader.render()} 
    </header>
    <main>
      <section id='products-section'>
          ${shopProducts.render(products)}
      </section>
      <section id='newsletter-section'>
          ${newsletter.render()}
      </section>
    </main>
    <footer>
       ${footer.render()}
    </footer>
   `;
  },
  afterRender() {
    shopProducts.afterRender();
  },
};

export default shopPage;
