import localStorageObj from "./local-storage";
import { showMessage } from "../controllers/showMessage";
import api from "./api";

// ✅ SIGNUP
export const signup = async (name, email, password) => {
  try {
    const { data } = await api.post("/authentication/signup", {
      name,
      email,
      password,
    });
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
    const { data } = await api.post("/authentication/login", {
      email,
      password,
    });
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
    await api.post("/authentication/logout", {});
    localStorageObj.removeItem("user");
    localStorageObj.removeItem("promoCode");
    localStorageObj.removeItem("cart");
    return true;
  } catch (err) {
    showMessage("Logout failed", "error");
    return false;
  }
};

export const forgotPassword = async (email) => {
  try {
    const { data } = await api.post("/authentication/forgot-password", {
      email,
    });
    showMessage("OTP sent to email", "success");
    return data;
  } catch (err) {
    const msg = err?.response?.data?.message || "Failed to send OTP";
    showMessage(msg, "error");
  }
};

export const resetPassword = async (otp, password) => {
  try {
    const { data } = await api.post("/authentication/reset-password", {
      otp,
      password,
    });
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
    const { data } = await api.get("/authentication/current-user");
    const user = data.data;
    localStorageObj.setItem("user", user);
    return user;
  } catch (err) {
    return null; // not logged in
  }
};
