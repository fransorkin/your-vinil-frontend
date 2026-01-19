import { useNavigate } from "react-router-dom";

const EditButton = ({ vinylId, variant = "default", className = "" }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/vinyls/${vinylId}/edit`);
  };

  const variants = {
    default: "bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-950/50 border border-amber-600/30",
    small: "bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-amber-950/50 border border-amber-600/30",
    large: "bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center gap-3 shadow-xl shadow-amber-950/50 border border-amber-600/30",
    icon: "bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white p-2 rounded-lg transition-all duration-200 shadow-md shadow-amber-950/50 border border-amber-600/30"
  };

  return (
    <button 
      onClick={handleEdit}
      className={`${variants[variant]} ${className}`}
      aria-label="Editar vinilo"
    >
      {variant === "icon" ? (
        <span className="text-lg">✏️</span>
      ) : (
        <>
          <span>✏️</span>
          <span>Editar</span>
        </>
      )}
    </button>
  );
};

export default EditButton;
