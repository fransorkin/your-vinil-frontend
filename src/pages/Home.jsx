import { useState, useEffect } from "react";
import api from "../api/axios";
import VinylCard from "../components/VinylCard";
import GenreFilter from "../components/GenreFilter";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
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
      setError("Error al cargar los vinilos. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <div className="bg-gradient-to-r from-red-900/30 to-red-950/30 border border-red-800/50 text-red-200 px-6 py-4 rounded-xl backdrop-blur-sm">
          <p className="font-semibold">⚠️ {error}</p>
          <button 
            onClick={fetchVinyls}
            className="mt-3 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 px-4 py-2 rounded-lg transition-all duration-200 shadow-lg border border-red-700/30"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent mb-3">Catálogo de Vinilos</h1>
        <p className="text-amber-700 text-lg">{filteredVinyls.length} vinilos encontrados</p>
      </div>

      <div className="mb-8">
        <GenreFilter 
          selectedGenre={selectedGenre} 
          onGenreChange={handleGenreChange} 
        />
      </div>

      {filteredVinyls.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-amber-400 text-lg mb-4">No hay vinilos en este género</p>
          <p className="text-amber-700 text-sm">Intenta seleccionar otro género o agrega nuevos vinilos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVinyls.map((vinyl) => (
            <VinylCard key={vinyl._id} vinyl={vinyl} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
