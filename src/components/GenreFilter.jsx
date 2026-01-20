const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  const genres = [
    "Todos",
    "Rock",
    "Pop",
    "Jazz",
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

  return (
    <div className="bg-gradient-to-br from-stone-900 to-amber-950 rounded-xl p-6 shadow-2xl border border-amber-900/30">
      <h3 className="text-amber-100 font-bold text-lg mb-5 flex items-center gap-2">
        <span className="text-2xl">🎶</span> Filtrar por género
      </h3>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
              selectedGenre === genre
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/60 scale-105 border border-amber-500/50 hover:shadow-xl hover:shadow-amber-800/70"
                : "bg-amber-950/50 text-amber-400 hover:bg-amber-900/70 hover:text-amber-200 hover:scale-105 border border-amber-800/40 hover:border-amber-600/60 hover:shadow-lg hover:shadow-amber-900/30"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
