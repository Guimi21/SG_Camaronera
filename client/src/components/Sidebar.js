import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { menus, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Camaronera</h1>
        <p className="text-sm text-gray-400">Sistema de gestión</p>
        {user && (
          <p className="text-sm text-gray-300 mt-2">
            Hola, {user.username}
          </p>
        )}
      </div>
      
      <nav className="p-4">
        <h2 className="text-sm uppercase text-gray-400 mb-4">Navegación</h2>
        <ul className="space-y-2">
          {/* Home público */}
          <li>
            <Link 
              to="/home" 
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <span className="mr-2">🏠</span>
              Inicio Público
            </Link>
          </li>
          
          {/* Dashboard Home */}
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center p-2 rounded hover:bg-gray-700 ${
                location.pathname === "/dashboard" ? "bg-gray-700" : ""
              }`}
            >
              <span className="mr-2">📊</span>
              Dashboard
            </Link>
          </li>
          
          {/* Menús dinámicos */}
          {menus.map((menu) => (
            <li key={menu.id_menu}>
              <Link 
                to={`/dashboard${menu.ruta}`} 
                className={`flex items-center p-2 rounded hover:bg-gray-700 ${
                  location.pathname === `/dashboard${menu.ruta}` ? "bg-gray-700" : ""
                }`}
              >
                <span className="mr-2">{menu.icono}</span>
                {menu.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}