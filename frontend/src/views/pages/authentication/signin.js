import "./authenticator.css";
import localStorageObj from "../../../models/local-storage";
import { login } from "../../../models/user";
import { showMessage } from "../../../controllers/showMessage";
import { hideLoading, showLoading } from "../../../controllers/loading";

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
            id="email-sign-in"
            placeholder="eg.example"
          />
           <label for="password-sign-in">Password</label>
          <input
            type="password"
            name="password"
            id="password-sign-in"
            placeholder="eg.20vjjh79y7"
          />
          <div class="or flex-center-container">
          <a href="/#/reset-password" id="sign-up-redirect"> forgot password?<a>
          </div>
          <button id="login-btn" class="btn w-full primary-btn">Login</button>
         
          <div class="or flex-center-container">Or don't have an accont?</div>
          
          <a href="/#/register" id="sign-up-redirect" class="button-link btn w-full secondary-btn"> Create Account<a>
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
        showLoading();

        const email = document.getElementById("email-sign-in").value;
        const password = document.getElementById("password-sign-in").value;

        if (!email || !password) {
          showMessage("all fields should be filled", "error");
          return;
        }

        await login(email, password);
        if (localStorageObj.getItem("user")) {
          showMessage("Login successfully", "success");
          document.location.hash = "/";
        }
        hideLoading();
      });
  },
};
export default signin;
