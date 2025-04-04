import shopProducts from "../../components/shop-products/shopProducts";
import footer from "../../components/footer/footer";

import newsletter from "../../components/newsletter/newsletter";

import "./shopPage.css";
import shopPageHeader from "../../components/main-header/shopPageHeader";
import searchBar from "../../components/search-bar/searchbar";

const shopPage = {
  render: async (query) => {
    return `
    <header>
       ${shopPageHeader.render()} 
    </header>
    <main>
       <div class="sarch-box-form-container">${searchBar.render()}</div>
      <section id='products-section'>
          ${await shopProducts.render(query)}
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
    shopPageHeader.afterRender();
    searchBar.afterRender();
    shopProducts.afterRender();
  },
};

export default shopPage;
