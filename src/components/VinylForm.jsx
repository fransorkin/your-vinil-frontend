import { useState, useEffect } from "react";
import "./VinylForm.css";

const VinylForm = ({ initialData = {}, onSubmit, submitButtonText = "Guardar" }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    releaseYear: "",
    genre: "",
    condition: "",
    image: "",
    purchaseLocation: "",
    description: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || "",
        artist: initialData.artist || "",
        releaseYear: initialData.releaseYear || "",
        genre: initialData.genre || "",
        condition: initialData.condition || "",
        image: initialData.image || "",
        purchaseLocation: initialData.purchaseLocation || "",
        description: initialData.description || ""
      });
    }
  }, [initialData]);

  const genres = [
    "Rock",
    "Pop",
    "Jazz",
    "Blues",
    "Classical",
    "Electronic",
    "Hip-Hop",
    "R&B",
    "Country",
    "Reggae",
    "Metal",
    "Folk",
    "Other"
  ];

  const conditions = [
    "Mint",
    "Near Mint",
    "Very Good",
    "Good",
    "Fair",
    "Poor"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio";
    }

    if (!formData.artist.trim()) {
      newErrors.artist = "El artista es obligatorio";
    }

    if (!formData.releaseYear) {
      newErrors.releaseYear = "El año de lanzamiento es obligatorio";
    } else {
      const year = parseInt(formData.releaseYear);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear) {
        newErrors.releaseYear = `El año debe estar entre 1900 y ${currentYear}`;
      }
    }

    if (!formData.genre) {
      newErrors.genre = "El género es obligatorio";
    }

    if (formData.price && isNaN(parseFloat(formData.price))) {
      newErrors.price = "El precio debe ser un número válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    
    try {
      // Prepare data, removing empty optional fields
      const dataToSubmit = {
        title: formData.title.trim(),
        artist: formData.artist.trim(),
        releaseYear: parseInt(formData.releaseYear),
        genre: formData.genre,
        ...(formData.condition && { condition: formData.condition }),
        ...(formData.image && { image: formData.image.trim() }),
        ...(formData.purchaseLocation && { purchaseLocation: formData.purchaseLocation.trim() }),
        ...(formData.description && { description: formData.description.trim() })
      };

      await onSubmit(dataToSubmit);
    } catch (err) {
      console.error("Error submitting form:", err);
      // Error handling is done by parent component
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="vinyl-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Título <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form-input ${errors.title ? "error" : ""}`}
          value={formData.title}
          onChange={handleChange}
          placeholder="Ej: Abbey Road"
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="artist" className="form-label">
          Artista <span className="required">*</span>
        </label>
        <input
          type="text"
          id="artist"
          name="artist"
          className={`form-input ${errors.artist ? "error" : ""}`}
          value={formData.artist}
          onChange={handleChange}
          placeholder="Ej: The Beatles"
        />
        {errors.artist && <span className="error-message">{errors.artist}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="releaseYear" className="form-label">
            Año de Lanzamiento <span className="required">*</span>
          </label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            className={`form-input ${errors.releaseYear ? "error" : ""}`}
            value={formData.releaseYear}
            onChange={handleChange}
            placeholder="Ej: 1969"
            min="1900"
            max={new Date().getFullYear()}
          />
          {errors.releaseYear && <span className="error-message">{errors.releaseYear}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="genre" className="form-label">
            Género <span className="required">*</span>
          </label>
          <select
            id="genre"
            name="genre"
            className={`form-select ${errors.genre ? "error" : ""}`}
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">Seleccionar género</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          {errors.genre && <span className="error-message">{errors.genre}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="condition" className="form-label">
            Estado
          </label>
          <select
            id="condition"
            name="condition"
            className="form-select"
            value={formData.condition}
            onChange={handleChange}
          >
            <option value="">Seleccionar estado</option>
            {conditions.map(condition => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image" className="form-label">
          URL de la Imagen
        </label>
        <input
          type="url"
          id="image"
          name="image"
          className="form-input"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <div className="form-group">
        <label htmlFor="purchaseLocation" className="form-label">
          Lugar de Compra
        </label>
        <input
          type="text"
          id="purchaseLocation"
          name="purchaseLocation"
          className="form-input"
          value={formData.purchaseLocation}
          onChange={handleChange}
          placeholder="Ej: Tienda de discos vintage, mercado de pulgas..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          className="form-textarea"
          value={formData.description}
          onChange={handleChange}
          placeholder="Notas adicionales sobre el vinilo..."
          rows="4"
        />
      </div>

      <button 
        type="submit" 
        className="btn-submit"
        disabled={submitting}
      >
        {submitting ? "Guardando..." : submitButtonText}
      </button>
    </form>
  );
};

export default VinylForm;
