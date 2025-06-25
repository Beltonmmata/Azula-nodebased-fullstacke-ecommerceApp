//import products from "../../../data/products";
import featuredProducts from "../../components/featured-products/featuredProducts";
import footer from "../../components/footer/footer";
import mainHeader from "../../components/main-header/mainHeader";
import newsletter from "../../components/newsletter/newsletter";
import promiseComponent from "../../components/promise/promise";
import slider from "../../components/slider/slider";

import "./homePage.css";

const homePage = {
  render: async function () {
    return `
    <header>
       ${mainHeader.render()} 
    </header>
    <main>
      <section id='slider-section'>
          ${slider.render()}
      </section>
      <section id='products-section'>
          ${await featuredProducts.render()}
      </section>
      <section class="promise-section" >
      ${promiseComponent.render()}
      </section>
    
    </main>
    <footer>
       ${footer.render()}
    </footer>
   `;
  },
  afterRender() {
    mainHeader.afterRender();
    featuredProducts.afterRender();
    // mainHeader.afteRender()
    slider.afterRender();
  },
};

export default homePage;
