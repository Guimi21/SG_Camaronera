import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { piscinaService } from '../../services/api';

export default function Piscinas() {
  const [piscinas, setPiscinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { authFetch } = useAuth();

  useEffect(() => {
    loadPiscinas();
  }, []);

  const loadPiscinas = async () => {
    try {
      setLoading(true);
      const data = await piscinaService.getAll();
      setPiscinas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando piscinas...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Piscinas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {piscinas.map((piscina) => (
          <div key={piscina.id_piscina} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{piscina.nombre}</h3>
            <p>Capacidad: {piscina.capacidad} m³</p>
            <p>Estado: {piscina.estado === 'A' ? 'Activa' : 'Inactiva'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}