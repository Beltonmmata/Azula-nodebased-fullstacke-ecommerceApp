import axios from "axios";
import localStorageObj from "./localstorage";
import backendUrl from "./backendUrl";
import { showMessage } from "../controllers/showMessage";

export const signup = async (name, email, password) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/authentication/signup`,
      { name, email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    localStorageObj.setItem("token", data.token);
    localStorageObj.setItem("user", data.user);
    console.log("signup successfully");

    return data;
  } catch (err) {
    alert(err.message);
  }
};
export const login = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/authentication/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    localStorageObj.setItem("token", data.token);
    localStorageObj.setItem("user", data.user);

    return data;
  } catch (err) {
    showMessage("Loggin failed", "error");
  }
};
export const logout = () => {
  localStorageObj.removeItem("token");
  localStorageObj.removeItem("user");
};
