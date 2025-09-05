import { useState } from "react";

export default function PiscinaForm() {
  const [codigo, setCodigo] = useState("");
  const [hectareas, setHectareas] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { codigo, hectareas, ubicacion };

    try {
      const res = await fetch("http://localhost:5000/piscina", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Piscina guardada correctamente!");
        setCodigo(""); setHectareas(""); setUbicacion("");
      } else {
        alert("Error al guardar la piscina");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Piscina</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Código:</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hectáreas:</label>
          <input
            type="number"
            step="0.01"
            value={hectareas}
            onChange={(e) => setHectareas(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ubicación:</label>
          <input
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </div>
        <button type="submit">Guardar Piscina</button>
      </form>
    </div>
  );
}
