import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-amber-950 to-stone-950 backdrop-blur-md border-b border-amber-900/30 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y links principales */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent hover:from-amber-300 hover:to-orange-300 transition-all duration-300">
              🎵 Your Vinyl
            </Link>
            
            <div className="hidden md:flex gap-6">
              <Link 
                to="/" 
                className="text-amber-200/70 hover:text-amber-200 transition-all duration-200 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-amber-400 after:transition-all after:duration-300"
              >
                Inicio
              </Link>
              
              {user && (
                <Link 
                  to="/vinyls/create" 
                  className="text-amber-200/70 hover:text-amber-200 transition-all duration-200 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-amber-400 after:transition-all after:duration-300"
                >
                  Agregar Vinilo
                </Link>
              )}
            </div>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-amber-200/70 hidden sm:block">
                  Hola, <span className="font-semibold text-amber-200">{user.username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-900 to-red-950 hover:from-red-800 hover:to-red-900 text-amber-100 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-red-950/50 border border-red-800/30"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="text-amber-200/70 hover:text-amber-200 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-amber-950/50"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-amber-950/50 border border-amber-600/30"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
