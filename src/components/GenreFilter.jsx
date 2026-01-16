import "./GenreFilter.css";

const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  const genres = [
    "Todos",
    "Rock",
    "Pop",
    "Jazz",
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

  return (
    <div className="genre-filter">
      <h3 className="filter-title">Filtrar por género</h3>
      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-button ${selectedGenre === genre ? "active" : ""}`}
            onClick={() => onGenreChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
