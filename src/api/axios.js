import axios from "axios";

// Crear instancia de axios con configuración base
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005/api"
});

// Interceptor de peticiones - agregar token a headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas - manejar errores de autenticación
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token expiró o es inválido, limpiar localStorage
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

export default instance;
