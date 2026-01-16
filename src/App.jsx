import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import VinylDetail from "./pages/VinylDetail";
import CreateVinyl from "./pages/CreateVinyl";
import EditVinyl from "./pages/EditVinyl";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <p>Cargando aplicación...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} 
      />

      {/* Rutas accesibles sin autenticación */}
      <Route path="/" element={<Home />} />
      <Route path="/vinyls/:id" element={<VinylDetail />} />

      {/* Rutas protegidas - requieren autenticación */}
      <Route
        path="/vinyls/create"
        element={
          <ProtectedRoute>
            <CreateVinyl />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vinyls/:id/edit"
        element={
          <ProtectedRoute>
            <EditVinyl />
          </ProtectedRoute>
        }
      />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
