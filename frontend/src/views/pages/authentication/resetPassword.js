import "./authenticator.css";
import localStorageObj from "../../../models/local-storage";
import {
  forgotPassword,
  resetPassword as resetPasswordModel,
} from "../../../models/user";
import { showMessage } from "../../../controllers/showMessage";
import {
  hideConversationOverlay,
  showConversationOverlay,
} from "../../components/conversation-overlay/conversationOverlay";

const resetPassword = {
  render() {
    return `
      <div class="auth-container flex-center-container">
    <div class="w-full flex-center-container">
      <form id="reset-password-form">
          <h2>Reset Password</h2>
           <label for="email-reset-password">Email</label>
          <input
            type="email"
            name="email"
            id="email-reset-password"
            placeholder="eg.example@gmail.com"
          />
           
           <label for="password-reset-password">New Password</label>
          <input
            type="password"
            name="password"
            id="password-reset-password"
             placeholder="........"            
          />
           <label for="confirm-password-reset-password">Confirm New Password</label>
          <input
            type="password"
            name="password"
            id="confirm-password-reset-password"
             placeholder="........"           
          />
          <button id="reset-password-btn" class="btn w-full primary-btn">Request Otp</button>
               
          
          </form>
        </div>
        </div>
      `;
  },
  afterRender() {
    document
      .getElementById("reset-password-btn")
      .addEventListener("click", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email-reset-password").value;
        const newPassword = document.getElementById(
          "password-reset-password"
        ).value;
        const confirmNewPassword = document.getElementById(
          "confirm-password-reset-password"
        ).value;

        if (!newPassword || !confirmNewPassword) {
          showMessage("all fields should be filled", "error");
          return;
        }
        if (newPassword !== confirmNewPassword) {
          showMessage("passwords must match");
          return;
        }

        // await forgotPassword(email);
        console.log(email, newPassword);

        showConversationOverlay(
          `
          <form id="reset-password-form"> 
                <h3 class="header-message">We have sent you a reset password otp to your email.The otp will expire in 6 minutes</h3>
                <!-- OTP -->
                <label for="reset-password-otp">Enter the OTP</label>
                <input
                  type="number"
                  id="reset-password-otp"
                  placeholder="enter the Otp"
                  pattern="\\d{6}"
                  title="Enter a valid 6-digit otp"
                  required
                />
                <div class="call-to-action">
                    <button class="call-to-action-btn cancel-btn" >Cancel</button>
                    <button type="submit" id="reset-password-otp-overlay-btn" class="call-to-action-btn ok-btn" >Send</button>
                </div>
              </form>
          `
        );
        document
          .getElementById("reset-password-otp-overlay-btn")
          .addEventListener("click", async (e) => {
            e.preventDefault();
            const password = newPassword;
            const otp = document.getElementById("reset-password-otp").value;
            console.log(otp, password);

            await resetPasswordModel(otp, password);
            hideConversationOverlay();
          });
      });
  },
};
export default resetPassword;
