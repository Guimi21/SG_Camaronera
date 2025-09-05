import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirige al login
  };

  if (!user) return null;

  return (
    <header className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
      <div>
        <h1 className="text-lg font-bold">Camaronera</h1>
        <p className="text-sm text-gray-400">Sistema de gestión</p>
      </div>
      <div className="flex items-center space-x-4">
        <span>Hola, {user.username}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
