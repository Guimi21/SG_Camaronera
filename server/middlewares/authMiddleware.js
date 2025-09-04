const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

const checkProfile = (allowedProfiles) => {
  return async (req, res, next) => {
    try {
      const { profileQueries } = require('../utils/dbQueries');
      const userProfiles = await profileQueries.getUserProfile(req.user.id);
      
      const hasPermission = userProfiles.some(profile => 
        allowedProfiles.includes(profile.nombre)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'Permisos insuficientes' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Error verificando permisos' });
    }
  };
};

module.exports = { authenticateToken, checkProfile };