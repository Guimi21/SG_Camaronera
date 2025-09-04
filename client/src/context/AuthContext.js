import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [perfiles, setPerfiles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Función de login que conecta con el backend real
  const login = async (username, password) => {
    try {
      console.log('Iniciando login para:', username);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('Error en login:', errorData);
        throw new Error(errorData.message || 'Credenciales incorrectas');
      }

      const authData = await response.json();
      console.log('Login exitoso, datos recibidos:', authData);
      
      setUser(authData.usuario);
      setPerfiles(authData.perfiles);
      setMenus(authData.menus);
      setToken(authData.token);
      
      // Guardar en localStorage
      localStorage.setItem('authData', JSON.stringify(authData));
      console.log('Datos guardados en localStorage');
      
      return { success: true };
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        error: error.message || 'Error al conectar con el servidor' 
      };
    }
  };

  const logout = () => {
    console.log('Cerrando sesión');
    setUser(null);
    setPerfiles([]);
    setMenus([]);
    setToken(null);
    localStorage.removeItem('authData');
  };

  // Verificar token y cargar datos al iniciar
  const verifyToken = async () => {
    const authData = localStorage.getItem('authData');
    console.log('Verificando token, authData en localStorage:', !!authData);
    
    if (!authData) {
      setLoading(false);
      return;
    }

    try {
      const parsedData = JSON.parse(authData);
      
      if (!parsedData.token) {
        console.log('No hay token en localStorage');
        logout();
        return;
      }

      setToken(parsedData.token);

      // Verificar token con el backend
      console.log('Verificando token con backend...');
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${parsedData.token}`
        }
      });

      console.log('Response status de verify:', response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log('Token válido, datos:', userData);
        setUser(userData.usuario);
        setPerfiles(userData.perfiles);
        setMenus(userData.menus);
      } else {
        console.log('Token inválido, limpiando datos');
        logout();
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  // Función para hacer requests autenticados
  const authFetch = async (url, options = {}) => {
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const config = {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    console.log('Realizando request autenticado a:', url);
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    
    if (response.status === 401) {
      console.log('Token expirado, cerrando sesión');
      logout();
      throw new Error('Sesión expirada');
    }
    
    return response;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      perfiles, 
      menus, 
      loading, 
      token,
      login, 
      logout, 
      authFetch,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;