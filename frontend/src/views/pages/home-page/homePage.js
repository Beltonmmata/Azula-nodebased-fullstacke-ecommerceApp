import renderMainHeader from "../../components/main-header/mainHeader";
import renderSlider from "../../components/slider/slider";
import "./homePage.css";

// const renderHomePage = () => {
//   // document.querySelector("#slider-section").innerHTML = renderSlider();
//   document.querySelector("#app").innerHTML = `
//   <div>
//     <div>
//     ${renderMainHeader()}
//     </div>
//    `;
// };
const renderHomePage = () => {
  //document.querySelector("#slider-section").innerHTML = renderSlider();

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
