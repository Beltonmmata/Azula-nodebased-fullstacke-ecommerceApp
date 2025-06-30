import shopProducts from "../../components/shop-products/shopProducts";
import footer from "../../components/footer/footer";

import "./shopPage.css";

import searchBar from "../../components/search-bar/searchbar";
import mainHeader from "../../components/main-header/mainHeader";

const shopPage = {
  render: async (query) => {
    return `
    <header>
       ${mainHeader.render()} 
    </header>
    <main>
       <div class="sarch-box-form-container">${searchBar.render()}</div>
      <section id='products-section'>
          ${await shopProducts.render(query)}
      </section>
     
    </main>
    <footer>
       ${footer.render()}
    </footer>
   `;
  },
  afterRender() {
    mainHeader.afterRender();
    searchBar.afterRender();
    shopProducts.afterRender();
  },
};

export default shopPage;
