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
      console.log("Attempting login with:", email);
      const response = await axios.post("/auth/login", { email, password });
      console.log("Login response:", response.data);
      
      const { token: authToken, user: userData } = response.data;
      
      if (!authToken || !userData) {
        console.error("Missing token or user data:", response.data);
        throw new Error("Invalid response from server");
      }
      
      // Guardar en estado
      setToken(authToken);
      setUser(userData);
      
      // Guardar en localStorage
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("authUser", JSON.stringify(userData));
      
      console.log("Login successful, token saved");
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      console.error("Error response:", error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Error al iniciar sesión"
      };
    }
  };

  const register = async (email, password, username) => {
    try {
      console.log("Attempting register with:", { email, username });
      const response = await axios.post("/auth/register", { 
        email, 
        password,
        passwordConfirm: password,
        username 
      });
      console.log("Register response:", response.data);
      
      const { token: authToken, user: userData } = response.data;
      
      if (!authToken || !userData) {
        console.error("Missing token or user data:", response.data);
        throw new Error("Invalid response from server");
      }
      
      // Guardar en estado
      setToken(authToken);
      setUser(userData);
      
      // Guardar en localStorage
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("authUser", JSON.stringify(userData));
      
      console.log("Registration successful, token saved");
      return { success: true };
    } catch (error) {
      console.error("Error en registro:", error);
      console.error("Error response:", error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Error al registrarse"
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
