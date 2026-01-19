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
    <div className="bg-gradient-to-br from-stone-900 to-amber-950 rounded-xl p-6 shadow-2xl border border-amber-900/30">
      <h3 className="text-amber-100 font-bold text-lg mb-5">Filtrar por género</h3>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              selectedGenre === genre
                ? "bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-lg shadow-amber-950/50 scale-105 border border-amber-600/50"
                : "bg-amber-950 text-amber-500 hover:bg-amber-900 hover:text-amber-300 hover:scale-105 border border-amber-800/40"
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
