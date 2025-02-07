import products from "../../../data/products";
import renderProductsContainer from "./../../components/products/productsContainer";
import renderFooter from "../../components/footer/footer";
import renderMainHeader from "../../components/main-header/mainHeader";
import renderNewsletter from "../../components/newsletter/newsletter";
import renderSlider from "../../components/slider/slider";
import "./homePage.css";

const renderHomePage = () => {
  document.querySelector("#app").innerHTML = `
    <header>
    ${renderMainHeader()} 
    </header>
    <main>
    <section id='slider-section'>
    ${renderSlider()}
    </section>
    <section id='products-section'>
    ${renderProductsContainer(products)}
    </section>
    <section id='newsletter-section'>
    ${renderNewsletter()}
    </section>
    
    </main>
    <footer>
    ${renderFooter()}
    </footer>
   `;
};

export default renderHomePage;
