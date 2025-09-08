const express = require('express');
const { createPiscina } = require('../controllers/piscinaController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

router.post('/createPiscina', createPiscina);

module.exports = router;