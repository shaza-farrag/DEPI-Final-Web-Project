import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("admin");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("adminToken");
  });

  const isLoggedIn = !!token;

  const login = (user, token) => {
    localStorage.setItem("admin", JSON.stringify(user));
    localStorage.setItem("adminToken", token);

    setAdmin(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");

    setAdmin(null);
    setToken(null);

    window.location.href = "/sys";
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);