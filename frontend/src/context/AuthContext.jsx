import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    }
  }, [token, user]);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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