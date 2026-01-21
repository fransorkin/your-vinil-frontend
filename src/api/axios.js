import axios from "axios";

// Crear instancia de axios con configuración base
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005"
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

// Funciones del servicio de vinilos
export const vinylService = {
  getAllVinyls: (genre) => {
    const url = genre ? `/vinyls?genre=${genre}` : '/vinyls';
    return instance.get(url);
  },

  getVinylById: (id) => {
    return instance.get(`/vinyls/${id}`);
  },

  createVinyl: (data) => {
    return instance.post('/vinyls', data);
  },

  updateVinyl: (id, data) => {
    return instance.put(`/vinyls/${id}`, data);
  },

  deleteVinyl: (id) => {
    return instance.delete(`/vinyls/${id}`);
  },

  getComments: (id) => {
    return instance.get(`/vinyls/${id}/comments`);
  },

  addComment: (id, { content, author }) => {
    return instance.post(`/vinyls/${id}/comments`, { content, author });
  },

  deleteComment: (vinylId, commentId) => {
    return instance.delete(`/vinyls/${vinylId}/comments/${commentId}`);
  }
};

export default instance;
