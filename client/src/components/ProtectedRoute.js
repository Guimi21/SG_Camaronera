import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredProfiles }) {
  const { isAuthenticated, loading, perfiles } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar perfiles si se requieren
  if (requiredProfiles && requiredProfiles.length > 0) {
    const hasRequiredProfile = perfiles.some(perfil => 
      requiredProfiles.includes(perfil.nombre)
    );

    if (!hasRequiredProfile) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}