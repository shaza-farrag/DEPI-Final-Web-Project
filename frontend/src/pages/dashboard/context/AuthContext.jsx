import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// ✏️ غير الـ email والـ password هنا
const ADMIN_EMAIL = "admin@dashboard.com";
const ADMIN_PASSWORD = "admin123";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("auth_token") === "logged_in"
  );

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("auth_token", "logged_in");
      setIsLoggedIn(true);
      return { success: true };
    }
    return { success: false, error: "Username or Password is not correct !" };
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
    window.location.href = "/sys";
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);