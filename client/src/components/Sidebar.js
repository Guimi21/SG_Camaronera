import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { menus, user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-6 flex flex-col items-center">
        <img
          src="/logo.png" // reemplaza con tu logo
          alt="Logo Camaronera"
          className="w-24 h-24 object-contain mb-2"
        />
        <p className="text-sm text-gray-400">{user.tipo_usuario}</p>
      </div>

      {/* Menús */}
      <nav className="flex-1">
        <ul className="space-y-2">
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
