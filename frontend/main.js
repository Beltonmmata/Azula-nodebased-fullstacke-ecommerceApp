import "./style.css";
import renderHomePage from "./src/views/pages/home-page/homePage";
import { eventHandler } from "./src/controllers/handleHomepageEvents";

renderHomePage();
eventHandler(Event);
