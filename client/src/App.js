import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Digitador from "./pages/Modulos/Digitador";
import Directivo from "./pages/Modulos/Directivo";
import Administrador from "./pages/Modulos/Administrador";
import Piscinas from "./pages/Modulos/Piscinas";
import Cosechas from "./pages/Modulos/Cosechas";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<Home />} />
            <Route path="digitador" element={<Digitador />} />
            <Route path="directivo" element={<Directivo />} />
            <Route path="administrador" element={<Administrador />} />
            <Route path="piscinas" element={<Piscinas />} />
            <Route path="cosechas" element={<Cosechas />} />
          </Route>
          
          {/* Redirección por defecto */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;