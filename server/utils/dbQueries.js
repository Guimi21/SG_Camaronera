const { executeQuery } = require('../config/database');

// Consultas de Autenticación
const authQueries = {
  getUserByUsername: async (username) => {
    return await executeQuery(
      `SELECT u.id_usuario, u.username, u.password_hash, u.estado 
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
      `SELECT DISTINCT m.id_menu, m.nombre, m.ruta, m.icono, modu.nombre as modulo
       FROM menu m 
       JOIN modulo modu ON m.id_modulo = modu.id_modulo
       JOIN menu_perfil mp ON m.id_menu = mp.id_menu 
       WHERE mp.id_perfil IN (
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
      `SELECT id_perfil, nombre, descripcion 
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

// Consultas de Piscinas
const piscinaQueries = {
  getAllPiscinas: async () => {
    return await executeQuery(
      `SELECT id_piscina, nombre, capacidad, estado, fecha_creacion
       FROM piscina 
       ORDER BY nombre`
    );
  },

  getPiscinaById: async (piscinaId) => {
    return await executeQuery(
      `SELECT id_piscina, nombre, capacidad, estado, fecha_creacion
       FROM piscina 
       WHERE id_piscina = ?`,
      [piscinaId]
    );
  },

  createPiscina: async (piscinaData) => {
    const { nombre, capacidad, estado = 'A' } = piscinaData;
    return await executeQuery(
      `INSERT INTO piscina (nombre, capacidad, estado) 
       VALUES (?, ?, ?)`,
      [nombre, capacidad, estado]
    );
  },

  updatePiscina: async (piscinaId, piscinaData) => {
    const { nombre, capacidad, estado } = piscinaData;
    return await executeQuery(
      `UPDATE piscina 
       SET nombre = ?, capacidad = ?, estado = ?
       WHERE id_piscina = ?`,
      [nombre, capacidad, estado, piscinaId]
    );
  }
};

// Consultas de Cosechas
const cosechaQueries = {
  getAllCosechas: async () => {
    return await executeQuery(
      `SELECT c.id_cosecha, c.fecha_cosecha, c.cantidad, c.peso_total,
              p.nombre as piscina_nombre, p.id_piscina
       FROM cosecha c
       JOIN piscina p ON c.id_piscina = p.id_piscina
       ORDER BY c.fecha_cosecha DESC`
    );
  },

  getCosechaById: async (cosechaId) => {
    return await executeQuery(
      `SELECT c.id_cosecha, c.fecha_cosecha, c.cantidad, c.peso_total,
              p.nombre as piscina_nombre, p.id_piscina
       FROM cosecha c
       JOIN piscina p ON c.id_piscina = p.id_piscina
       WHERE c.id_cosecha = ?`,
      [cosechaId]
    );
  },

  createCosecha: async (cosechaData) => {
    const { id_piscina, fecha_cosecha, cantidad, peso_total } = cosechaData;
    return await executeQuery(
      `INSERT INTO cosecha (id_piscina, fecha_cosecha, cantidad, peso_total) 
       VALUES (?, ?, ?, ?)`,
      [id_piscina, fecha_cosecha, cantidad, peso_total]
    );
  },

  getCosechasByPiscina: async (piscinaId) => {
    return await executeQuery(
      `SELECT c.id_cosecha, c.fecha_cosecha, c.cantidad, c.peso_total
       FROM cosecha c
       WHERE c.id_piscina = ?
       ORDER BY c.fecha_cosecha DESC`,
      [piscinaId]
    );
  }
};

module.exports = {
  authQueries,
  profileQueries,
  piscinaQueries,
  cosechaQueries
};