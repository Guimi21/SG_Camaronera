const { cosechaQueries } = require('../utils/dbQueries');

const getAllCosechas = async (req, res) => {
  try {
    const cosechas = await cosechaQueries.getAllCosechas();
    res.json(cosechas);
  } catch (error) {
    console.error('Error obteniendo cosechas:', error);
    res.status(500).json({ message: 'Error obteniendo cosechas' });
  }
};

const getCosechasByPiscina = async (req, res) => {
  try {
    const { piscinaId } = req.params;
    const cosechas = await cosechaQueries.getCosechasByPiscina(piscinaId);
    res.json(cosechas);
  } catch (error) {
    console.error('Error obteniendo cosechas por piscina:', error);
    res.status(500).json({ message: 'Error obteniendo cosechas' });
  }
};

const createCosecha = async (req, res) => {
  try {
    const cosechaData = req.body;
    const result = await cosechaQueries.createCosecha(cosechaData);
    
    res.status(201).json({
      message: 'Cosecha registrada exitosamente',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error registrando cosecha:', error);
    res.status(500).json({ message: 'Error registrando cosecha' });
  }
};

module.exports = { getAllCosechas, getCosechasByPiscina, createCosecha };