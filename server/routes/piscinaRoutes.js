const express = require('express');
const { getAllPiscinas, getPiscinaById, createPiscina } = require('../controllers/piscinaController');
const { authenticateToken, checkProfile } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAllPiscinas);
router.get('/:id', authenticateToken, getPiscinaById);
router.post('/', authenticateToken, checkProfile(['Administrador', 'Digitador']), createPiscina);

module.exports = router;