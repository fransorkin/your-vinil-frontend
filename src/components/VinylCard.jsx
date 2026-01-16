import { useNavigate } from "react-router-dom";
import "./VinylCard.css";

const VinylCard = ({ vinyl }) => {
  const navigate = useNavigate();

  return (
    <div className="vinyl-card" onClick={() => navigate(`/vinyls/${vinyl._id}`)}>
      <div className="vinyl-image">
        {vinyl.image ? (
          <img src={vinyl.image} alt={vinyl.title} />
        ) : (
          <div className="vinyl-placeholder">🎵</div>
        )}
      </div>
      
      <div className="vinyl-info">
        <h3 className="vinyl-title">{vinyl.title}</h3>
        <p className="vinyl-artist">{vinyl.artist}</p>
        
        <div className="vinyl-details">
          <span className="vinyl-year">{vinyl.releaseYear}</span>
          <span className="vinyl-genre">{vinyl.genre}</span>
        </div>

        {vinyl.condition && (
          <div className="vinyl-condition">
            Estado: {vinyl.condition}
          </div>
        )}
      </div>
    </div>
  );
};

export default VinylCard;
