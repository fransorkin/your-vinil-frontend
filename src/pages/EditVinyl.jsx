import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VinylForm from "../components/VinylForm";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../api/axios";

const EditVinyl = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vinyl, setVinyl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVinyl();
  }, [id]);

  const fetchVinyl = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/vinyls/${id}`);
      const vinylData = response.data.data || response.data;
      setVinyl(vinylData);
      setError(null);
    } catch (err) {
      console.error("Error fetching vinyl:", err);
      setError("Error al cargar el vinilo");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await api.put(`/vinyls/${id}`, formData);
      alert("¡Vinilo actualizado exitosamente!");
      navigate(`/vinyls/${id}`);
    } catch (err) {
      console.error("Error updating vinyl:", err);
      alert(err.response?.data?.message || "Error al actualizar el vinilo. Por favor, inténtalo de nuevo.");
      throw err; // Re-throw to let form handle the error state
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !vinyl) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <div className="bg-gradient-to-r from-red-900/30 to-red-950/30 border border-red-800/50 text-red-200 px-6 py-4 rounded-xl backdrop-blur-sm">
          {error || "Vinilo no encontrado"}
        </div>
        <button 
          className="mt-4 text-amber-700 hover:text-amber-400 flex items-center gap-2 transition-colors"
          onClick={() => navigate("/")}
        >
          ← Volver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <button 
          className="text-amber-700 hover:text-amber-400 mb-4 flex items-center gap-2 transition-colors"
          onClick={() => navigate(`/vinyls/${id}`)}
        >
          ← Volver
        </button>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">Editar Vinilo</h1>
      </div>

      <div className="bg-gradient-to-br from-stone-900 to-amber-950 border border-amber-900/30 rounded-2xl shadow-2xl p-8">
        <VinylForm 
          initialData={vinyl}
          onSubmit={handleSubmit} 
          submitButtonText="Guardar Cambios" 
        />
      </div>
    </div>
  );
};

export default EditVinyl;
