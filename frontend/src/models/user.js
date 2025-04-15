import axios from "axios";
import backendUrl from "./backendUrl";
import createUserModel from "../models/userModel";
import { showMessage } from "../controllers/showMessage";

// Setup global axios config for cookie usage
axios.defaults.withCredentials = true;

// ✅ SIGNUP
export const signup = async (name, email, password) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/authentication/signup`,
      { name, email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const user = createUserModel(data.data);
    localStorage.setItem("user", JSON.stringify(user));
    showMessage("Signup successful", "success");
    return user;
  } catch (err) {
    const msg = err?.response?.data?.message || "Signup failed";
    showMessage(msg, "error");
  }
};

// ✅ LOGIN
export const login = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/authentication/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const user = createUserModel(data.data);
    localStorage.setItem("user", JSON.stringify(user));
    showMessage("Login successful", "success");
    return user;
  } catch (err) {
    const msg = err?.response?.data?.message || "Login failed";
    showMessage(msg, "error");
  }
};

// ✅ LOGOUT
export const logout = async () => {
  try {
    await axios.post(`${backendUrl}/authentication/logout`);
    localStorage.removeItem("user");
    showMessage("Logged out", "success");
  } catch (err) {
    showMessage("Logout failed", "error");
  }
};

// ✅ FORGOT PASSWORD
export const forgotPassword = async (email) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/authentication/forgot-password`,
      { email },
      { headers: { "Content-Type": "application/json" } }
    );

    showMessage("OTP sent to email", "success");
    return data;
  } catch (err) {
    const msg = err?.response?.data?.message || "Failed to send OTP";
    showMessage(msg, "error");
  }
};

// ✅ RESET PASSWORD
export const resetPassword = async (otp, password) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/authentication/reset-password`,
      { otp, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const user = createUserModel(data.data);
    localStorage.setItem("user", JSON.stringify(user));
    showMessage("Password reset successful", "success");
    return user;
  } catch (err) {
    const msg = err?.response?.data?.message || "Reset failed";
    showMessage(msg, "error");
  }
};

// ✅ Get current user (optional but smart on page reload)
export const getCurrentUser = async () => {
  try {
    const { data } = await axios.get(
      `${backendUrl}/authentication/current-user`
    );
    const user = createUserModel(data.data);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    return null; // not logged in
  }
};
