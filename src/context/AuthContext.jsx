import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar token y usuario del localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token: authToken, user: userData } = response.data;
      
      // Guardar en estado
      setToken(authToken);
      setUser(userData);
      
      // Guardar en localStorage
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("authUser", JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Error al iniciar sesión"
      };
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await axios.post("/auth/register", { 
        email, 
        password,
        passwordConfirm: password,
        username 
      });
      const { token: authToken, user: userData } = response.data;
      
      // Guardar en estado
      setToken(authToken);
      setUser(userData);
      
      // Guardar en localStorage
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("authUser", JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error("Error en registro:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Error al registrarse"
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
