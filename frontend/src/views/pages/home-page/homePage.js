import renderMainHeader from "../../components/main-header/mainHeader";
import "./homePage.css";

const renderHomePage = () => {
  return `
    <div>
    ${renderMainHeader()}
    </div>
   `;
};

export default renderHomePage;
