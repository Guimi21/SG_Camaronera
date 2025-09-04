import { useAuth } from "../context/AuthContext";
import Administrador from "./Modulos/Administrador";
import Digitador from "./Modulos/Digitador";
import Directivo from "./Modulos/Directivo";

export default function Dashboard() {
  const { user } = useAuth();

  // Renderiza el módulo según tipo de usuario
  const renderModulo = () => {
    console.log("Tipo de usuario:", user?.tipo_usuario); // <-- Muestra en consola el tipo de usuario

    switch (user?.tipo_usuario) {
      case "Administrador":
        return <Administrador />;
      case "Digitador":
        return <Digitador />;
      case "Director":
        return <Directivo />;
      default:
        return <p>No tienes permisos para ver este módulo.</p>;
    }
  };

  return (
    <div>
      {renderModulo()}
    </div>
  );
}
