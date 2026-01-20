import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../api/axios";

const VinylDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vinyl, setVinyl] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchVinylData();
  }, [id]);

  const fetchVinylData = async () => {
    try {
      setLoading(true);
      const [vinylResponse, commentsResponse] = await Promise.all([
        api.get(`/vinyls/${id}`),
        api.get(`/vinyls/${id}/comments`)
      ]);
      const vinylData = vinylResponse.data.data || vinylResponse.data;
      const commentsData = commentsResponse.data.data || commentsResponse.data;
      setVinyl(vinylData);
      setComments(commentsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching vinyl data:", err);
      setError("Error al cargar la información del vinilo");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmittingComment(true);
      const response = await api.post(`/vinyls/${id}/comments`, {
        content: newComment
      });
      const commentData = response.data.data || response.data;
      setComments([commentData, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Error al publicar el comentario");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("¿Estás seguro de eliminar este comentario?")) return;

    try {
      await api.delete(`/vinyls/${id}/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Error al eliminar el comentario");
    }
  };

  const handleDeleteVinyl = async () => {
    if (!window.confirm("¿Estás seguro de eliminar este vinilo?")) return;

    try {
      await api.delete(`/vinyls/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Error deleting vinyl:", err);
      alert("Error al eliminar el vinilo");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !vinyl) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <div className="bg-gradient-to-r from-red-900/30 to-red-950/30 border border-red-800/50 text-red-200 px-6 py-4 rounded-xl backdrop-blur-sm">
          {error || "Vinilo no encontrado"}
        </div>
        <button 
          className="mt-4 text-amber-700 hover:text-amber-400 flex items-center gap-2 transition-colors"
          onClick={() => navigate("/")}
        >
          ← Volver
        </button>
      </div>
    );
  }

  const isOwner = vinyl.owner?._id === user?.id || vinyl.owner === user?.id;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <button 
          className="text-amber-700 hover:text-amber-400 flex items-center gap-2 transition-colors"
          onClick={() => navigate("/")}
        >
          ← Volver
        </button>
        {isOwner && (
          <div className="flex gap-3">
            <button 
              className="bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-950/50 border border-amber-600/30"
              onClick={() => navigate(`/vinyls/${id}/edit`)}
            >
              ✏️ Editar
            </button>
            <button 
              className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-red-950/50 border border-red-700/30"
              onClick={handleDeleteVinyl}
            >
              🗑️ Eliminar
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-stone-900 to-amber-950 rounded-2xl overflow-hidden shadow-2xl border border-amber-900/30 group">
          {vinyl.image ? (
            <img 
              src={vinyl.image} 
              alt={vinyl.title}
              className="w-full aspect-square object-cover sepia-[0.15] group-hover:sepia-0 transition-all duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center bg-stone-950 text-8xl text-amber-900">
              🎵
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-stone-900 to-amber-950 rounded-2xl shadow-2xl p-8 border border-amber-900/30">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent mb-3">{vinyl.title}</h1>
          <h2 className="text-3xl bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-8">{vinyl.artist}</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-amber-700">
              <span className="font-semibold w-32">Año:</span>
              <span className="text-amber-100">{vinyl.releaseYear}</span>
            </div>
            <div className="flex items-center gap-3 text-amber-700">
              <span className="font-semibold w-32">Género:</span>
              <span className="bg-gradient-to-r from-amber-700 to-orange-700 px-3 py-1 rounded-lg text-white text-sm font-medium shadow-lg shadow-amber-950/50 border border-amber-600/30">{vinyl.genre}</span>
            </div>
            {vinyl.condition && (
              <div className="flex items-center gap-3 text-amber-700">
                <span className="font-semibold w-32">Estado:</span>
                <span className="bg-amber-950 px-3 py-1 rounded-lg text-sm border border-amber-800/40 text-amber-600">{vinyl.condition}</span>
              </div>
            )}
            {vinyl.purchaseLocation && (
              <div className="flex items-center gap-3 text-amber-700">
                <span className="font-semibold w-32">Lugar de compra:</span>
                <span className="text-amber-100">{vinyl.purchaseLocation}</span>
              </div>
            )}
          </div>

          {vinyl.description && (
            <div className="mt-8 pt-6 border-t border-amber-900/30">
              <h3 className="text-xl font-semibold text-amber-100 mb-3">Descripción</h3>
              <p className="text-amber-300 leading-relaxed">{vinyl.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-stone-900 to-amber-950 rounded-2xl shadow-2xl p-8 border border-amber-900/30">
        <h3 className="text-3xl font-bold text-amber-100 mb-2">Comentarios</h3>
        <p className="text-amber-600 mb-8 font-medium">{comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'}</p>

        {user ? (
          <form className="mb-8 bg-gradient-to-br from-amber-950/30 to-stone-950/30 p-6 rounded-xl border border-amber-800/50" onSubmit={handleSubmitComment}>
            <label className="block text-amber-300 font-semibold mb-3 text-sm uppercase tracking-wide">
              💬 Agregar un comentario
            </label>
            <textarea
              className="w-full bg-stone-950/70 border border-amber-800/50 rounded-xl px-4 py-3 text-amber-100 placeholder-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 mb-4 transition-all resize-none"
              placeholder="Comparte tu opinión sobre este vinilo..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="4"
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:from-stone-700 disabled:to-stone-800 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-amber-900/50 border border-amber-500/30 hover:shadow-xl hover:shadow-amber-800/50 hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50"
              disabled={submittingComment || !newComment.trim()}
            >
              {submittingComment ? "Publicando..." : "✨ Publicar Comentario"}
            </button>
          </form>
        ) : (
          <div className="bg-amber-950/50 border border-amber-800/40 rounded-xl p-6 mb-8 text-center">
            <p className="text-amber-300">
              Debes{" "}
              <button 
                className="text-amber-400 hover:text-amber-300 font-medium underline transition-colors"
                onClick={() => navigate("/login")}
              >
                iniciar sesión
              </button>
              {" "}para comentar
            </p>
          </div>
        )}

        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-amber-700 text-center py-12">No hay comentarios aún. ¡Sé el primero en comentar!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="bg-gradient-to-br from-amber-950/40 to-stone-950/40 border border-amber-800/50 rounded-xl p-6 hover:border-amber-600/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/20 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
                      {(comment.author?.username || comment.author?.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-amber-300 font-semibold block">
                        {comment.author?.username || comment.author?.email || "Usuario"}
                      </span>
                      <span className="text-amber-700 text-xs">
                        {new Date(comment.createdAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>
                  {user && (comment.author?._id === user?._id || comment.author === user?._id) && (
                    <button
                      className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors px-3 py-1 rounded-lg hover:bg-red-950/30"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      🗑️ Eliminar
                    </button>
                  )}
                </div>
                <p className="text-amber-100 leading-relaxed pl-13">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VinylDetail;
