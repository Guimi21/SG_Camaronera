import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Bienvenido a la Camaronera</h2>
      <p className="text-lg text-gray-600 mb-6">
        Aquí gestionamos cosechas, piscinas y producción de camarón 🦐
      </p>
      

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-xl font-semibold mb-2">Piscinas</h3>
          <p>Monitoreo de piscinas activas y su rendimiento.</p>
        </div>
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-xl font-semibold mb-2">Cosechas</h3>
          <p>Registro y control de cosechas recientes.</p>
        </div>
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-xl font-semibold mb-2">Producción</h3>
          <p>Estadísticas de producción diaria y mensual.</p>
        </div>
      </div>
    </div>
  );
}