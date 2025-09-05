import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Administrador from "../pages/Modulos/Administrador";
import Digitador from "../pages/Modulos/Digitador";
import Directivo from "../pages/Modulos/Directivo";

export default function Layout() {
  const { user } = useAuth();

  const renderModulo = () => {
    if (!user) return null;

    switch (user.tipo_usuario) {
      case "Administrador":
        return <Administrador />;
      case "Digitador":
        return <Digitador />;
      case "Director":
        return <Directivo />;
      default:
        return <p>No tiene Modulo asignado</p>;
    }
  };

  return (
   <div className="layout">
  <aside className="sidebar">
    <Sidebar />
  </aside>

  <div className="main-container">
    <header>
      <Header />
    </header>

    <main>
      {renderModulo()}
    </main>
  </div>
</div>

  );
}
