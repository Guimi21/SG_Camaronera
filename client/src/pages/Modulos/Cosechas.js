import { useState, useEffect } from 'react';
import { cosechaService } from '../../services/api';

export default function Cosechas() {
  const [cosechas, setCosechas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCosechas();
  }, []);

  const loadCosechas = async () => {
    try {
      setLoading(true);
      const data = await cosechaService.getAll();
      setCosechas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando cosechas...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Registro de Cosechas</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Piscina</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Peso Total</th>
            </tr>
          </thead>
          <tbody>
            {cosechas.map((cosecha) => (
              <tr key={cosecha.id_cosecha}>
                <td className="px-4 py-2">{new Date(cosecha.fecha_cosecha).toLocaleDateString()}</td>
                <td className="px-4 py-2">{cosecha.piscina_nombre}</td>
                <td className="px-4 py-2">{cosecha.cantidad}</td>
                <td className="px-4 py-2">{cosecha.peso_total} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}