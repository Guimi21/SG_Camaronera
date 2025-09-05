import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { menus, user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  console.log("Todos los menús:", menus); // Imprime todos los menús

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Camaronera</h1>
        <p className="text-sm text-gray-400">Sistema de gestión</p>
        <p className="text-sm mt-2">Hola, {user.username}</p>
      </div>

      <nav>
        <h2 className="text-sm uppercase text-gray-400 mb-2">Navegación</h2>
        <ul>
          <li>
            <Link
              to="/home"
              className={`block p-2 rounded hover:bg-gray-700 ${
                location.pathname === "/home" ? "bg-gray-700" : ""
              }`}
            >
              🏠 Inicio Público
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`block p-2 rounded hover:bg-gray-700 ${
                location.pathname === "/dashboard" ? "bg-gray-700" : ""
              }`}
            >
              📊 Dashboard
            </Link>
          </li>

          {/* Menús sin filtrar */}
          {menus.map((menu) => (
            <li key={menu.id_menu}>
              <Link
                to={menu.ruta.startsWith("/") ? menu.ruta : `/${menu.ruta}`}
                className={`flex items-center p-2 rounded hover:bg-gray-700 ${
                  location.pathname === menu.ruta ? "bg-gray-700" : ""
                }`}
              >
                <span className="mr-2">{menu.icono}</span>
                {menu.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
