import { useNavigate } from "react-router-dom";
import VinylForm from "../components/VinylForm";
import api from "../api/axios";
import "./CreateVinyl.css";

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
      throw err; // Re-throw to let form handle the error state
    }
  };

  return (
    <div className="create-vinyl-container">
      <div className="create-vinyl-content">
        <div className="page-header">
          <button className="btn-back" onClick={() => navigate("/")}>
            ← Volver
          </button>
          <h1 className="page-title">Agregar Nuevo Vinilo</h1>
        </div>

        <div className="form-container">
          <VinylForm 
            onSubmit={handleSubmit} 
            submitButtonText="Crear Vinilo" 
          />
        </div>
      </div>
    </div>
  );
};

export default CreateVinyl;
