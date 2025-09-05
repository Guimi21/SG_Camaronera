const { executeQuery } = require('../config/database');

// Consultas de Autenticación
const authQueries = {
  getUserByUsername: async (username) => {
    return await executeQuery(
      `SELECT u.id_usuario, u.username, u.password_hash, u.estado ,u.tipo_usuario
       FROM usuario u 
       WHERE u.username = ? AND u.estado = 'A'`,
      [username]
    );
  },

  getUserProfiles: async (userId) => {
    return await executeQuery(
      `SELECT p.id_perfil, p.nombre 
       FROM perfil p 
       JOIN usuario_perfil up ON p.id_perfil = up.id_perfil 
       WHERE up.id_usuario = ?`,
      [userId]
    );
  },
 getUserMenus: async (userId) => {
  return await executeQuery(
    `SELECT DISTINCT m.id_menu, m.nombre, m.ruta, m.icono, m.estado, modu.nombre as modulo
     FROM menu m 
     JOIN modulo modu ON m.id_modulo = modu.id_modulo
     JOIN menu_perfil mp ON m.id_menu = mp.id_menu 
     WHERE m.estado = 'A'
       AND mp.id_perfil IN (
         SELECT id_perfil FROM usuario_perfil WHERE id_usuario = ?
       )
     ORDER BY modu.nombre, m.nombre`,
    [userId]
  );
}

};

// Consultas de Perfiles
const profileQueries = {
  getAllProfiles: async () => {
    return await executeQuery(
      `SELECT id_perfil, nombre, descripcion, 
       FROM perfil 
       ORDER BY nombre`
    );
  },

  getUserProfile: async (userId) => {
    return await executeQuery(
      `SELECT p.id_perfil, p.nombre, p.descripcion
       FROM perfil p
       JOIN usuario_perfil up ON p.id_perfil = up.id_perfil
       WHERE up.id_usuario = ?`,
      [userId]
    );
  }
};



module.exports = {
  authQueries,
  profileQueries
};