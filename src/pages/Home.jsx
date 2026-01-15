import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <div style={{
        background: "white",
        padding: "60px 80px",
        borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        maxWidth: "500px"
      }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>✅</div>
        
        <h1 style={{ 
          fontSize: "32px", 
          marginBottom: "10px",
          color: "#333"
        }}>
          ¡Has ingresado!
        </h1>
        
        <p style={{ 
          fontSize: "18px", 
          color: "#666",
          marginBottom: "30px"
        }}>
          Bienvenido/a, <strong>{user?.username || user?.email}</strong>
        </p>

        <button 
          onClick={logout}
          style={{
            padding: "14px 32px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            transition: "transform 0.2s",
            width: "100%"
          }}
          onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Home;
