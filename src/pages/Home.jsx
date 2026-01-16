import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import VinylCard from "../components/VinylCard";
import GenreFilter from "../components/GenreFilter";
import "./Home.css";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [vinyls, setVinyls] = useState([]);
  const [filteredVinyls, setFilteredVinyls] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVinyls();
  }, []);

  useEffect(() => {
    if (selectedGenre === "Todos") {
      setFilteredVinyls(vinyls);
    } else {
      setFilteredVinyls(vinyls.filter(vinyl => vinyl.genre === selectedGenre));
    }
  }, [selectedGenre, vinyls]);

  const fetchVinyls = async () => {
    try {
      setLoading(true);
      const response = await api.get("/vinyls");
      const vinylsData = response.data.data || response.data;
      setVinyls(vinylsData);
      setFilteredVinyls(vinylsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching vinyls:", err);
      setError("Error al cargar los vinilos");
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1 className="home-title">🎵 Mi Colección de Vinilos</h1>
          <div className="header-actions">
            {user ? (
              <>
                <span className="user-welcome">Hola, {user?.username || user?.email}</span>
                <button className="btn-create" onClick={() => navigate("/vinyls/create")}>
                  + Nuevo Vinilo
                </button>
                <button className="btn-logout" onClick={logout}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <button className="btn-login" onClick={() => navigate("/login")}>
                  Iniciar Sesión
                </button>
                <button className="btn-register" onClick={() => navigate("/register")}>
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="home-main">
        <GenreFilter 
          selectedGenre={selectedGenre} 
          onGenreChange={handleGenreChange} 
        />

        {loading && (
          <div className="loading">Cargando vinilos...</div>
        )}

        {error && (
          <div className="error-message">{error}</div>
        )}

        {!loading && !error && filteredVinyls.length === 0 && (
          <div className="empty-state">
            <p className="empty-text">No hay vinilos disponibles</p>
            <button className="btn-create-empty" onClick={() => navigate("/vinyls/create")}>
              Agregar primer vinilo
            </button>
          </div>
        )}

        {!loading && !error && filteredVinyls.length > 0 && (
          <div className="vinyls-grid">
            {filteredVinyls.map((vinyl) => (
              <VinylCard key={vinyl._id} vinyl={vinyl} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
