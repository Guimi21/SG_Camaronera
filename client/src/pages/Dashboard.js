import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex">
      {/* Mostrar sidebar solo si está autenticado */}
      {isAuthenticated && <Sidebar />}
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}