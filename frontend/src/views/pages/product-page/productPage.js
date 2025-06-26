import "./productPage.css";
import { parseRequestUrl } from "../../../controllers/browserRouter";
import mainHeader from "../../components/main-header/mainHeader";
import relatedProducts from "../../components/related-products/relatedProducts";
import productsDetails from "../../components/products-details/productDetails";
import footer from "../../components/footer/footer";

const productPage = {
  afterRender() {
    // relatedProducts.afterRender();
    mainHeader.afterRender();
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
      <div class="product-page-navigation">
      <a href="/">home</a>/
      <a href="#/shop">shop</a>
      / product name
    </div>
      </section>
     
      <section class="container" id='container products-details-section'>
          ${await productsDetails.render(id)}
      </section>
      <section class="container review-section" id='container products-details-section'>
          
      </section>
      <section class="container" id='products-details-section'>
          ${await relatedProducts.render()}
      </section>

      

     
    </main>
    <footer>
       ${footer.render()}
    </footer>
    `;
  },
};

export default productPage;
