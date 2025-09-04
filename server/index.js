const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const piscinaRoutes = require('./routes/piscinaRoutes');
const cosechaRoutes = require('./routes/cosechaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/piscinas', piscinaRoutes);
app.use('/api/cosechas', cosechaRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor de camaronera funcionando',
    timestamp: new Date().toISOString()
  });
});

// Ruta por defecto
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido al API de Sistema Camaronera',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      user: '/api/user',
      piscinas: '/api/piscinas',
      cosechas: '/api/cosechas'
    }
  });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado' });
});

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error('Error global:', error);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
  console.log(`👤 User: http://localhost:${PORT}/api/user`);
  console.log(`💧 Piscinas: http://localhost:${PORT}/api/piscinas`);
  console.log(`🦐 Cosechas: http://localhost:${PORT}/api/cosechas`);
});