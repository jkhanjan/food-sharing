import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      const response = await authService.getProfile();

      if (response.success) {
        setUser(response.data.user);
      }

      setLoading(false);
    };

    restoreUser();
  }, []);

  // LOGIN FUNCTION
  const login = async (email, password) => {
    setLoading(true);

    const response = await authService.login({ email, password });

    if (response.success) {
      setUser(response.data.user);
    }

    setLoading(false);
    return response;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
