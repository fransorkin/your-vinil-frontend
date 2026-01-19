import { useNavigate } from "react-router-dom";
import { useState } from "react";

const VinylCard = ({ vinyl }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const genreColors = {
    Rock: "bg-red-800",
    Pop: "bg-pink-700",
    Jazz: "bg-amber-700",
    Classical: "bg-purple-900",
    Electronic: "bg-orange-700",
    "Hip-Hop": "bg-orange-800",
    "R&B": "bg-amber-800",
    Country: "bg-yellow-800",
    Folk: "bg-green-900",
    Metal: "bg-stone-800",
    Reggae: "bg-green-800",
    Other: "bg-stone-700"
  };

  return (
    <div 
      onClick={() => navigate(`/vinyls/${vinyl._id}`)}
      className="bg-gradient-to-b from-stone-900 to-amber-950 rounded-xl overflow-hidden shadow-2xl hover:shadow-amber-900/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer group border border-amber-900/30 hover:border-amber-700/50"
    >
      <div className="relative aspect-square overflow-hidden bg-stone-950">
        {vinyl.image && !imageError ? (
          <img 
            src={vinyl.image} 
            alt={vinyl.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 sepia-[0.15]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-900 to-amber-950">
            <div className="text-center p-6">
              <div className="text-8xl mb-4 opacity-40">🎵</div>
              <p className="text-amber-600 text-sm font-medium">{vinyl.title}</p>
              <p className="text-amber-800 text-xs mt-1">{vinyl.artist}</p>
            </div>
          </div>
        )}
        
        {/* Badge de género */}
        <div className={`absolute top-3 right-3 ${genreColors[vinyl.genre] || genreColors.Other} text-amber-100 px-3 py-1 rounded-full text-xs font-bold shadow-2xl backdrop-blur-sm bg-opacity-90 border border-amber-700/30`}>
          {vinyl.genre}
        </div>
      </div>
      
      <div className="p-5 bg-gradient-to-t from-amber-950 to-stone-900">
        <h3 className="text-amber-100 font-bold text-lg mb-1 truncate group-hover:text-amber-400 transition-colors duration-200">
          {vinyl.title}
        </h3>
        <p className="text-amber-700 text-sm mb-3 truncate">{vinyl.artist}</p>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-amber-800 font-medium">{vinyl.releaseYear}</span>
          {vinyl.condition && (
            <span className="bg-amber-950 text-amber-600 px-2 py-1 rounded border border-amber-800/40">
              {vinyl.condition}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VinylCard;
