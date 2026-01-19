import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-stone-900 to-amber-950 border border-amber-900/30 rounded-2xl shadow-2xl p-8 w-full max-w-md backdrop-blur-sm">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent mb-8 text-center">Iniciar Sesión</h1>
        
        {error && (
          <div className="bg-gradient-to-r from-red-900/30 to-red-950/30 border border-red-800/50 text-red-200 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-amber-400 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={loading}
              className="w-full bg-stone-950/50 border border-amber-800/40 rounded-xl px-4 py-3 text-amber-100 placeholder-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600/50 disabled:opacity-50 transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-amber-400 font-medium mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              className="w-full bg-stone-950/50 border border-amber-800/40 rounded-xl px-4 py-3 text-amber-100 placeholder-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600/50 disabled:opacity-50 transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 disabled:from-stone-800 disabled:to-stone-900 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-6 shadow-lg shadow-amber-950/50 border border-amber-600/30"
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-center text-amber-700 mt-6">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
