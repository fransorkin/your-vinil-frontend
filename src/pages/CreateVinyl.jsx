import { useNavigate } from "react-router-dom";
import VinylForm from "../components/VinylForm";
import api from "../api/axios";

const CreateVinyl = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await api.post("/vinyls", formData);
      alert("¡Vinilo creado exitosamente!");
      navigate("/");
    } catch (err) {
      console.error("Error creating vinyl:", err);
      alert(err.response?.data?.message || "Error al crear el vinilo. Por favor, inténtalo de nuevo.");
      throw err;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <button 
          className="text-amber-700 hover:text-amber-400 mb-4 flex items-center gap-2 transition-colors"
          onClick={() => navigate("/")}
        >
          ← Volver
        </button>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">Agregar Nuevo Vinilo</h1>
      </div>

      <div className="bg-gradient-to-br from-stone-900 to-amber-950 border border-amber-900/30 rounded-2xl shadow-2xl p-8">
        <VinylForm 
          onSubmit={handleSubmit} 
          submitButtonText="Crear Vinilo" 
        />
      </div>
    </div>
  );
};

export default CreateVinyl;
