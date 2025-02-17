import products from "../../../data/products";
import featuredProducts from "../../components/featured-products/featuredProducts";
import footer from "../../components/footer/footer";
import mainHeader from "../../components/main-header/mainHeader";
import newsletter from "../../components/newsletter/newsletter";
import slider from "../../components/slider/slider";

import "./homePage.css";

const homePage = {
  render() {
    return `
    <header>
       ${mainHeader.render()} 
    </header>
    <main>
      <section id='slider-section'>
          ${slider.render()}
      </section>
      <section id='products-section'>
          ${featuredProducts.render(products)}
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
    featuredProducts.afterRender();
    // mainHeader.afteRender()
    slider.afterRender();
  },
};

export default homePage;
