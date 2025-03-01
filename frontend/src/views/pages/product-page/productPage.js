import "./productPage.css";
import { parseRequestUrl } from "../../../controllers/browserRouter";
import mainHeader from "../../components/main-header/mainHeader";
import relatedProducts from "../../components/related-products/relatedProducts";
// import products from "../../../data/products";
import pageNav from "../../components/pageNav/pageNav";
import productsDetails from "../../components/products-details/productDetails";
import newsletter from "../../components/newsletter/newsletter";
import footer from "../../components/footer/footer";

import products from "../../../data/products";
const productPage = {
  afterRender() {
    // relatedProducts.afterRender();
    relatedProducts.afterRender();
    productsDetails.afterRender();
  },
  render: async () => {
    const { id } = parseRequestUrl();
    return `
    <header>
       ${mainHeader.render()} 
    </header>
    <main>
     
      <section class="container" id='navigator-section'>
          ${pageNav.render()}
      </section>
     
      <section class="container" id='container products-details-section'>
          ${await productsDetails.render(id)}
      </section>
      <section class="container" id='container products-details-section'>
          ${await relatedProducts.render(products)}
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
};

export default productPage;
