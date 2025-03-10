import reRender from "../../../controllers/reRender";
import homePage from "../../pages/home-page/homePage";
import { hideUserMenu } from "../../../controllers/userMenuOverlay";
import localStorageObj from "../../../models/localstorage";
import { logout } from "../../../models/user";

const userProfilePreview = {
  render() {
    const user = localStorageObj.getItem("user");
    const userName = user ? user.name : "User";

    return `
         <div class="profile-icon">
          <ion-icon name="person-outline"></ion-icon>
        </div>
        <p class="greet-user">Welcome,${userName}</p>
        <button class="btn secondary-btn w-full">Check Your Profile</button>
        <button class="btn primary-btn w-full" id="logout-btn">Logout</button>

        `;
  },
  afterRender() {
    document.getElementById("logout-btn").addEventListener("click", () => {
      logout();
      hideUserMenu();
      this.render();
    });
  },
};
export default userProfilePreview;
