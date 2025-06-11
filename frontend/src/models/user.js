import axios from "axios";
import backendUrl from "./backendUrl";
import localStorageObj from "../models/localStorage";
import { showMessage } from "../controllers/showMessage";

// ✅ SIGNUP
export const signup = async (name, email, password) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/authentication/signup`,
      { name, email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const user = data.data;
    localStorageObj.setItem("user", user);
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
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    const user = data.data;
    localStorageObj.setItem("user", user);
    showMessage("Login successful", "success");
    return user;
  } catch (err) {
    const msg = err?.response?.data?.message || "Login failed";
    showMessage(msg, "error");
  }
};

export const logout = async () => {
  try {
    await axios.post(
      `${backendUrl}/authentication/logout`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    localStorageObj.removeItem("user");
    localStorageObj.removeItem("promoCode");
    localStorageObj.removeItem("cart");
    return true;
  } catch (err) {
    showMessage("Logout failed", "error");
    return false;
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

    const user = data.data;
    localStorageObj.setItem("user", user);
    showMessage("Password reset successful", "success");
    return user;
  } catch (err) {
    const msg = err?.response?.data?.message || "Reset failed";
    showMessage(msg, "error");
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axios.get(
      `${backendUrl}/authentication/current-user`
    );
    const user = data.data;
    localStorageObj.setItem("user", user);
    return user;
  } catch (err) {
    return null; // not logged in
  }
};
