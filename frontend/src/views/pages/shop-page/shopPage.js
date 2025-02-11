import products from "../../../data/products";
import productsContainer from "../../components/products/productsContainer";
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
          ${productsContainer.render(products)}
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

export default shopPage;
