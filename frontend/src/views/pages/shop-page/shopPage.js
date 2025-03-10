import shopProducts from "../../components/shop-products/shopProducts";
import footer from "../../components/footer/footer";
import mainHeader from "../../components/main-header/mainHeader";
import newsletter from "../../components/newsletter/newsletter";

import "./shopPage.css";

const shopPage = {
  render: async () => {
    return `
    <header>
       ${mainHeader.render()} 
    </header>
    <main>
      <section id='products-section'>
          ${await shopProducts.render()}
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
    mainHeader.afterRender();
    shopProducts.afterRender();
  },
};

export default shopPage;
