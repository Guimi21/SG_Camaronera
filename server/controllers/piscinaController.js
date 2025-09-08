const { piscinaQueries } = require('../utils/dbQueries');

const getAllPiscinas = async (req, res) => {
  try {
    const piscinas = await piscinaQueries.getAllPiscinas();
    res.json(piscinas);
  } catch (error) {
    console.error('Error obteniendo piscinas:', error);
    res.status(500).json({ message: 'Error obteniendo piscinas' });
  }
};

const getPiscinaById = async (req, res) => {
  try {
    const { id } = req.params;
    const piscinas = await piscinaQueries.getPiscinaById(id);
    
    if (piscinas.length === 0) {
      return res.status(404).json({ message: 'Piscina no encontrada' });
    }

    res.json(piscinas[0]);
  } catch (error) {
    console.error('Error obteniendo piscina:', error);
    res.status(500).json({ message: 'Error obteniendo piscina' });
  }
};

const createPiscina = async (req, res) => {
  try {
    const { codigo, hectareas, ubicacion } = req.body;

    const result = await piscinaQueries.createPiscina(codigo, hectareas, ubicacion);

    res.status(201).json({
      message: 'Piscina creada exitosamente',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error creando piscina:', error);
    res.status(500).json({ message: 'Error creando piscina' });
  }
};


module.exports = { getAllPiscinas, getPiscinaById, createPiscina };