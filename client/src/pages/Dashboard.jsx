import { useAuth } from "../context/AuthContext";
import Administrador from "./Modulos/Administrador";
import Digitador from "./Modulos/Digitador";
import Directivo from "./Modulos/Directivo";

export default function Dashboard() {
  const { user, logout, loading } = useAuth();

  if (loading) return <p>Cargando datos...</p>;
  if (!user) return <p>No hay usuario autenticado</p>;

  const renderModulo = () => {
    const tipo = user.tipo_usuario?.trim().toLowerCase();
    switch (tipo) {
      case "administrador":
        return <Administrador />;
      case "digitador":
        return <Digitador />;
      case "director":
      case "directivo":
        return <Directivo />;
      default:
        return <p>No tienes permisos para este módulo.</p>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      <p className="mb-4">Usuario actual: {user.tipo_usuario}</p>
      {renderModulo()}
    </div>
  );
}
