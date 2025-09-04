import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!usuario || !password) {
      setError("Por favor complete todos los campos");
      setLoading(false);
      return;
    }

    const result = await login(usuario, password);
    
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Error al iniciar sesión");
    }
    
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <label className="block mb-2 font-medium">Usuario</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese su usuario"
          required
        />

        <label className="block mb-2 font-medium">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese su contraseña"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800 disabled:opacity-50"
        >
          {loading ? "Iniciando sesión..." : "Entrar"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="text-blue-600 hover:underline"
            >
              Volver al inicio
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}