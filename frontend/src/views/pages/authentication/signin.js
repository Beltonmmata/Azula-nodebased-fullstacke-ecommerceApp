import "./authenticator.css";
import { hideUserMenu } from "../../../controllers/userMenuOverlay";
import localStorageObj from "../../../models/localStorage";
import { login } from "../../../models/user";

const signin = {
  render() {
    return `
      <div class="auth-container flex-center-container">
    <div class="w-full flex-center-container">
      <form id="sign-in-form">
          <h2>Sign In</h2>
           <label for="email-sign-in">Email</label>
          <input
            type="email"
            name="email"
            id="email-sign-in"
            placeholder="eg.Rashan"
          />
           <label for="password-sign-in">Password</label>
          <input
            type="password"
            name="password"
            id="password-sign-in"
            placeholder="eg. G%20Rashan"
          />
          <button id="login-btn" class="btn w-full primary-btn">Login</button>
          <div class="or flex-center-container">Or dont have an accont?</div>
          
          <a href="/register" id="sign-up-redirect" class="button-link btn w-full secondary-btn"> Create Account<a>
        </form>
        </div>
        </div>
      `;
  },
  afterRender() {
    document
      .getElementById("login-btn")
      .addEventListener("click", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email-sign-in").value;
        const password = document.getElementById("password-sign-in").value;

        if (!email || !password) {
          alert("all fields should e filled");
          return;
        }
        try {
          await login(email, password);
        } catch (error) {
          console.log("Login failed:" + error);
        }
        if (localStorageObj.getItem("user")) {
          hideUserMenu();
          this.render();
        } else {
          alert("Registration failed. please try again later");
        }
      });
  },
};
export default signin;
