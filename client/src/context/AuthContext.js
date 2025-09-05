import { createContext, useContext, useState, useEffect } from "react";

// Crear contexto
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [perfiles, setPerfiles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // Login
  const login = async (username, password) => {
    try {
      console.log("Iniciando login para:", username);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Credenciales incorrectas");
      }

      const authData = await response.json();

      setUser(authData.usuario);
      setPerfiles(authData.perfiles);
      setMenus(authData.menus);
      setToken(authData.token);

      localStorage.setItem("authData", JSON.stringify(authData));

      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, error: error.message || "Error al conectar con el servidor" };
    }
  };

  // Logout
  const logout = () => {
    console.log("Cerrando sesión");
    setUser(null);
    setPerfiles([]);
    setMenus([]);
    setToken(null);
    localStorage.removeItem("authData");
  };

  // Verificar token al iniciar
  const verifyToken = async () => {
    const authData = localStorage.getItem("authData");
    if (!authData) {
      setLoading(false);
      return;
    }

    try {
      const parsedData = JSON.parse(authData);
      if (!parsedData.token) {
        logout();
        return;
      }

      setToken(parsedData.token);

      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${parsedData.token}` },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.usuario);
        setPerfiles(userData.perfiles);
        setMenus(userData.menus);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error verificando token:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar verifyToken al montar
 useEffect(() => {
  const init = async () => {
    await verifyToken();
  };
  init();
}, []); 

  // Fetch autenticado
  const authFetch = async (url, options = {}) => {
    if (!token) throw new Error("No hay token de autenticación");

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${url}`, config);

    if (response.status === 401) {
      logout();
      throw new Error("Sesión expirada");
    }

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        perfiles,
        menus,
        loading,
        token,
        login,
        logout,
        authFetch,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  return context;
};

export default AuthContext;
