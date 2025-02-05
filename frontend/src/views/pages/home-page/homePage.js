import renderMainHeader from "../../components/main-header/mainHeader";
import renderSlider from "../../components/slider/slider";
import "./homePage.css";

const renderHomePage = () => {
  innerHTML = renderSlider();

  document.querySelector("#app").innerHTML = `
    <div>
    ${renderMainHeader()} 
    </div>
    <div id='slider-section'>
    ${renderSlider()}
    </div>
   `;
};

export default renderHomePage;
