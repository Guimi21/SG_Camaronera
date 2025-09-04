const jwt = require('jsonwebtoken');
const { authQueries } = require('../utils/dbQueries');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Intento de login para usuario:', username);
    console.log('Contraseña ingresada:', password);

    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    // Buscar usuario
    const users = await authQueries.getUserByUsername(username);
    if (users.length === 0) {
      console.log('Usuario no encontrado:', username);
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const user = users[0];
    console.log('Usuario encontrado:', user.id_usuario);
    console.log('Contraseña almacenada en BD:', user.password_hash); // Ahora esperamos texto plano

    // Verificar contraseña (comparación directa de texto plano)
    const isValidPassword = (password === user.password_hash);
    console.log('Resultado de comparación:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Contraseña incorrecta para usuario:', username);
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    console.log('Contraseña válida, obteniendo perfiles y menús...');

    // Obtener perfiles y menús
    const perfiles = await authQueries.getUserProfiles(user.id_usuario);
    const menus = await authQueries.getUserMenus(user.id_usuario);

    console.log('Perfiles encontrados:', perfiles.length);
    console.log('Menús encontrados:', menus.length);

    // Crear token JWT
    const token = jwt.sign(
      { 
        id: user.id_usuario, 
        username: user.username 
      },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '8h' }
    );

    console.log('Token generado exitosamente');

    res.json({
      token,
      usuario: {
        id_usuario: user.id_usuario,
        username: user.username,
        estado: user.estado
      },
      perfiles,
      menus
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const verifyToken = async (req, res) => {
  try {
    console.log('Verificando token para usuario ID:', req.user.id);
    
    const users = await authQueries.getUserById(req.user.id);
    if (users.length === 0) {
      console.log('Usuario no encontrado durante verificación:', req.user.id);
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = users[0];
    const perfiles = await authQueries.getUserProfiles(user.id_usuario);
    const menus = await authQueries.getUserMenus(user.id_usuario);

    console.log('Token verificado exitosamente para:', user.username);

    res.json({
      usuario: user,
      perfiles,
      menus
    });

  } catch (error) {
    console.error('Error verificando token:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función para debuggear contraseñas
const debugPassword = async (plainPassword, storedPassword) => {
  console.log('=== DEBUG DE CONTRASEÑA ===');
  console.log('Contraseña ingresada:', plainPassword);
  console.log('Contraseña almacenada:', storedPassword);
  
  const isValid = (plainPassword === storedPassword);
  console.log('¿Coinciden?:', isValid);
  console.log('===========================');
  
  return isValid;
};

module.exports = { login, verifyToken, debugPassword };