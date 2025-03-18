// src/Core/utils/services/logoutUser.js
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export const logoutUser = async (navigate) => {
  try {
    await signOut(auth);
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    navigate("/auth/login");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
