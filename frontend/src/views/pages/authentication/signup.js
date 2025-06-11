import "./authenticator.css";
import localStorageObj from "../../../models/localStorage";
import { signup } from "../../../models/user";
import { showMessage } from "../../../controllers/showMessage";
const register = {
  render() {
    return `

    <div class="auth-container flex-center-container">
    <div class="w-full flex-center-container">
        <form id="sign-up-form">
          <h2>Sign up</h2>
           <label for="username-sign-up">Username</label>
          <input
            type="text"
            name="username"
            id="username-sign-up"
            placeholder="eg.example"
          />
          <label for="email-sign-up">Email</label>
          <input
            type="email"
            name="email"
            id="email-sign-up"
            placeholder="eg.example@gmail.com"
          />
           <label for="password-sign-up">Password</label>
          <input
            type="password"
            name="password"
            id="password-sign-up"
            placeholder="eg.20hashan"
          />
          <label for="confirm-password-sign-up">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password-sign-up"
            placeholder="eg.20Rashan"
          />
          <button id="signin-btn" class=" btn w-full primary-btn" type="submit">
            Create Account
          </button>
          <div class="or flex-center-container">Or already have an accont?</div>
          <a href="/signin" id="sign-in-redirect" class="button-link btn w-full secondary-btn">Login<a>
        </form>
        </div>
        </div>
        `;
  },
  afterRender() {
    document
      .getElementById("sign-up-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("username-sign-up").value;
        const email = document.getElementById("email-sign-up").value;
        const password = document.getElementById("password-sign-up").value;
        const confirmPassword = document.getElementById(
          "confirm-password-sign-up"
        ).value;

        if (!name || !email || !password || !confirmPassword) {
          showMessage("all fields should filled", "error");
          return;
        }

        if (password !== confirmPassword) {
          showMessage("Password and confirm password does not match", "error");
          return;
        }

        await signup(name, email, password);
        if (localStorageObj.getItem("user")) {
          document.location.hash = "/";
        }
      });
  },
};
export default register;
