import { useState, useEffect } from "react";

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
    "Clásica",
    "Electrónica",
    "Hip-Hop",
    "R&B",
    "Country",
    "Reggae",
    "Metal",
    "Folk",
    "Otro"
  ];

  const conditions = [
    "Nuevo",
    "Casi Nuevo",
    "Muy Bueno",
    "Bueno",
    "Regular",
    "Pobre"
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
    <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" className="block text-amber-400 font-medium mb-2">
          Título <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`w-full bg-stone-950/50 border ${ errors.title ? 'border-red-500' : 'border-amber-800/40'} rounded-xl px-4 py-3 text-amber-100 placeholder-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600/50 transition-all`}
          value={formData.title}
          onChange={handleChange}
          placeholder="Ej: Abbey Road"
        />
        {errors.title && <span className="text-red-400 text-sm mt-1 block">{errors.title}</span>}
      </div>

      <div>
        <label htmlFor="artist" className="block text-amber-400 font-medium mb-2">
          Artista <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="artist"
          name="artist"
          className={`w-full bg-stone-950/50 border ${errors.artist ? 'border-red-500' : 'border-amber-800/40'} rounded-xl px-4 py-3 text-amber-100 placeholder-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600/50 transition-all`}
          value={formData.artist}
          onChange={handleChange}
          placeholder="Ej: The Beatles"
        />
        {errors.artist && <span className="text-red-400 text-sm mt-1 block">{errors.artist}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="releaseYear" className="block text-amber-400 font-medium mb-2">
            Año de Lanzamiento <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            className={`w-full bg-stone-950/50 border ${errors.releaseYear ? 'border-red-500' : 'border-amber-800/40'} rounded-xl px-4 py-3 text-amber-100 placeholder-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600/50 transition-all`}
            value={formData.releaseYear}
            onChange={handleChange}
            placeholder="Ej: 1969"
            min="1900"
            max={new Date().getFullYear()}
          />
          {errors.releaseYear && <span className="text-red-400 text-sm mt-1 block">{errors.releaseYear}</span>}
        </div>

        <div>
          <label htmlFor="genre" className="block text-amber-400 font-medium mb-2">
            Género <span className="text-red-400">*</span>
          </label>
          <select
            id="genre"
            name="genre"
            className={`w-full bg-stone-950/50 border ${errors.genre ? 'border-red-500' : 'border-amber-800/40'} rounded-xl px-4 py-3 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600/50 transition-all`}
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">Seleccionar género</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          {errors.genre && <span className="text-red-400 text-sm mt-1 block">{errors.genre}</span>}
        </div>
      </div>

      <div>
        <label htmlFor="condition" className="block text-amber-400 font-medium mb-2">
          Estado
        </label>
        <select
          id="condition"
          name="condition"
          className="w-full bg-stone-950/50 border border-amber-800/40 rounded-xl px-4 py-3 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600/50 transition-all"
          value={formData.condition}
          onChange={handleChange}
        >
          <option value="">Seleccionar estado</option>
          {conditions.map(condition => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="image" className="block text-amber-400 font-medium mb-2">
          URL de la Imagen
        </label>
        <input
          type="url"
          id="image"
          name="image"
          className="w-full bg-stone-950/50 border border-amber-800/40 rounded-xl px-4 py-3 text-amber-100 placeholder-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600/50 transition-all"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <div>
        <label htmlFor="purchaseLocation" className="block text-amber-400 font-medium mb-2">
          Lugar de Compra
        </label>
        <input
          type="text"
          id="purchaseLocation"
          name="purchaseLocation"
          className="w-full bg-stone-950/50 border border-amber-800/40 rounded-xl px-4 py-3 text-amber-100 placeholder-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600/50 transition-all"
          value={formData.purchaseLocation}
          onChange={handleChange}
          placeholder="Ej: Tienda de discos vintage, mercado de pulgas..."
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-amber-400 font-medium mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full bg-stone-950/50 border border-amber-800/40 rounded-xl px-4 py-3 text-amber-100 placeholder-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600/50 transition-all"
          value={formData.description}
          onChange={handleChange}
          placeholder="Notas adicionales sobre el vinilo..."
          rows="4"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 disabled:from-stone-800 disabled:to-stone-900 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-amber-950/50 border border-amber-600/30"
        disabled={submitting}
      >
        {submitting ? "Guardando..." : submitButtonText}
      </button>
    </form>
  );
};

export default VinylForm;
