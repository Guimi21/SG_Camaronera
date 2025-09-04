const express = require('express');
const { login, verifyToken } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.get('/verify', authenticateToken, verifyToken);

module.exports = router;