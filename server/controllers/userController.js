const bcrypt = require('bcryptjs');
const { userQueries } = require('../utils/dbQueries');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Obtener datos del usuario
    const users = await userQueries.getUserById(userId);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = users[0];

    // Obtener perfiles del usuario
    const perfiles = await userQueries.getUserProfiles(userId);

    res.json({
      usuario: {
        id_usuario: user.id_usuario,
        username: user.username,
        estado: user.estado,
        fecha_crea: user.fecha_crea
      },
      perfiles
    });

  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'El nombre de usuario es requerido' });
    }

    // Verificar si el username ya existe (excluyendo al usuario actual)
    const existingUser = await userQueries.getUserByUsernameExcludingId(username, userId);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Actualizar perfil
    await userQueries.updateUserProfile(userId, { username, email });

    res.json({ message: 'Perfil actualizado correctamente' });

  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Contraseña actual y nueva contraseña son requeridas' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 6 caracteres' });
    }

    // Verificar contraseña actual
    const users = await userQueries.getUserPassword(userId);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isValid = await bcrypt.compare(currentPassword, users[0].password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    await userQueries.updateUserPassword(userId, hashedPassword);

    res.json({ message: 'Contraseña actualizada correctamente' });

  } catch (error) {
    console.error('Error cambiando contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getProfile, updateProfile, changePassword };
