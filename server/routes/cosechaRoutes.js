const express = require('express');
const { getAllCosechas, getCosechasByPiscina, createCosecha } = require('../controllers/cosechaController');
const { authenticateToken, checkProfile } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAllCosechas);
router.get('/piscina/:piscinaId', authenticateToken, getCosechasByPiscina);
router.post('/', authenticateToken, checkProfile(['Administrador', 'Digitador']), createCosecha);

module.exports = router;