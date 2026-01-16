import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import "./VinylDetail.css";

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
      <div className="vinyl-detail-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  if (error || !vinyl) {
    return (
      <div className="vinyl-detail-container">
        <div className="error-message">{error || "Vinilo no encontrado"}</div>
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Volver
        </button>
      </div>
    );
  }

  const isOwner = vinyl.owner?._id === user?._id || vinyl.owner === user?._id;

  return (
    <div className="vinyl-detail-container">
      <div className="vinyl-detail-header">
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Volver
        </button>
        {isOwner && (
          <div className="header-actions">
            <button className="btn-edit" onClick={() => navigate(`/vinyls/${id}/edit`)}>
              ✏️ Editar
            </button>
            <button className="btn-delete" onClick={handleDeleteVinyl}>
              🗑️ Eliminar
            </button>
          </div>
        )}
      </div>

      <div className="vinyl-detail-content">
        <div className="vinyl-image-large">
          {vinyl.image ? (
            <img src={vinyl.image} alt={vinyl.title} />
          ) : (
            <div className="vinyl-placeholder-large">🎵</div>
          )}
        </div>

        <div className="vinyl-info-detail">
          <h1 className="vinyl-title-large">{vinyl.title}</h1>
          <h2 className="vinyl-artist-large">{vinyl.artist}</h2>

          <div className="vinyl-metadata">
            <div className="metadata-item">
              <span className="metadata-label">Año:</span>
              <span className="metadata-value">{vinyl.releaseYear}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Género:</span>
              <span className="metadata-value">{vinyl.genre}</span>
            </div>
            {vinyl.condition && (
              <div className="metadata-item">
                <span className="metadata-label">Estado:</span>
                <span className="metadata-value">{vinyl.condition}</span>
              </div>
            )}
            {vinyl.purchaseLocation && (
              <div className="metadata-item">
                <span className="metadata-label">Lugar de compra:</span>
                <span className="metadata-value">{vinyl.purchaseLocation}</span>
              </div>
            )}
          </div>

          {vinyl.description && (
            <div className="vinyl-description">
              <h3>Descripción</h3>
              <p>{vinyl.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="comments-section">
        <h3 className="comments-title">Comentarios ({comments.length})</h3>

        {user ? (
          <form className="comment-form" onSubmit={handleSubmitComment}>
            <textarea
              className="comment-input"
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
              disabled={submittingComment}
            />
            <button 
              type="submit" 
              className="btn-submit-comment"
              disabled={submittingComment || !newComment.trim()}
            >
              {submittingComment ? "Publicando..." : "Publicar Comentario"}
            </button>
          </form>
        ) : (
          <div className="login-prompt">
            <p>Debes <button className="link-button" onClick={() => navigate("/login")}>iniciar sesión</button> para comentar</p>
          </div>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">No hay comentarios aún. ¡Sé el primero en comentar!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">
                    {comment.author?.username || comment.author?.email || "Usuario"}
                  </span>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
                {user && (comment.author?._id === user?._id || comment.author === user?._id) && (
                  <button
                    className="btn-delete-comment"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VinylDetail;
