import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VinylForm from "../components/VinylForm";
import api from "../api/axios";
import "./EditVinyl.css";

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
      setVinyl(response.data);
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
      <div className="edit-vinyl-container">
        <div className="loading">Cargando vinilo...</div>
      </div>
    );
  }

  if (error || !vinyl) {
    return (
      <div className="edit-vinyl-container">
        <div className="error-message">{error || "Vinilo no encontrado"}</div>
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Volver
        </button>
      </div>
    );
  }

  return (
    <div className="edit-vinyl-container">
      <div className="edit-vinyl-content">
        <div className="page-header">
          <button className="btn-back" onClick={() => navigate(`/vinyls/${id}`)}>
            ← Volver
          </button>
          <h1 className="page-title">Editar Vinilo</h1>
        </div>

        <div className="form-container">
          <VinylForm 
            initialData={vinyl}
            onSubmit={handleSubmit} 
            submitButtonText="Guardar Cambios" 
          />
        </div>
      </div>
    </div>
  );
};

export default EditVinyl;
