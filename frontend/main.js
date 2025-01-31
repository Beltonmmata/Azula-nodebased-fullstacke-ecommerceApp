import "./style.css";
import renderHomePage from "./src/views/pages/home-page/homePage";
// ${(<button id="counter" type="button"></button>)}

document.querySelector("#app").innerHTML = `
  <div>
    <div>${renderHomePage()}</div>    
  </div>
`;
