const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sg_camaronera',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Función para obtener conexión
const getConnection = async () => {
  return await pool.getConnection();
};

// Función para ejecutar consultas
const executeQuery = async (query, params = []) => {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(query, params);
    return results;
  } finally {
    connection.release();
  }
};

module.exports = { pool, getConnection, executeQuery };
