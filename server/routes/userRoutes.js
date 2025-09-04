const express = require('express');
const { getProfile, changePassword, updateProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

module.exports = router;