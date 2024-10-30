const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();
const pool = require('../db');
const path = require('path');
const multer = require('multer');


// Configuración de multer para almacenar las imágenes en una carpeta específica
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada imagen
  }
});

const upload = multer({ storage: storage });

// Ruta para subir una imagen y actualizar la propiedad
router.put('/:id', verifyToken, async (req, res) => {
    const { titulo, precio, comuna, habitaciones, banos, descripcion, imagen } = req.body;
    try {
        const result = await pool.query(
            'UPDATE propiedades SET titulo = $1, precio = $2, comuna = $3, habitaciones = $4, banos = $5, descripcion = $6, imagen = $7 WHERE propiedades_id = $8 AND usuario_id = $9 RETURNING *',
            [titulo, precio, comuna, habitaciones, banos, descripcion, JSON.stringify(imagen), req.params.id, req.userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Propiedad no encontrada');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar la propiedad:', error);
        res.status(500).send('Error al actualizar la propiedad');
    }
});
// Obtener todas las propiedades del usuario autenticado (Read)
router.get('/mis-propiedades', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM propiedades WHERE usuario_id = $1', [req.userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener propiedades del usuario:', error);
    res.status(500).send('Error al obtener propiedades');
  }
});

// Obtener todas las propiedades públicas (Read)
router.get('/propiedades', async (req, res) => {
  try {
    console.log('Obteniendo todas las propiedades');
    const result = await pool.query('SELECT * FROM propiedades');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener propiedades públicas:', error);
    res.status(500).send('Error al obtener propiedades públicas');
  }
});

// Obtener una propiedad específica por ID (Read)
router.get('/:id', async (req, res) => {
  const propertyId = parseInt(req.params.id, 10);

  if (isNaN(propertyId)) {
    return res.status(400).json({ error: 'ID de propiedad inválido' });
  }

  try {
    const result = await pool.query('SELECT * FROM propiedades WHERE propiedades_id = $1', [propertyId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }
    console.log("Propiedad encontrada:", result.rows[0]); // Para verificar en el backend
    res.json(result.rows[0]); // Asegura que devuelve JSON
  } catch (error) {
    console.error('Error al obtener la propiedad:', error);
    res.status(500).json({ error: 'Error al obtener la propiedad' });
  }
});

// Crear una nueva propiedad (Create)
router.post('/', verifyToken, async (req, res) => {
  let { imagenes, titulo, precio, comuna, habitaciones, banos, descripcion } = req.body;

  // Si `imagenes` es un array, tomamos solo la primera URL
  if (Array.isArray(imagenes)) {
    imagenes = imagenes[0]; // Esto toma solo la primera URL del array
  }

  try {
    const result = await pool.query(
      'INSERT INTO propiedades (usuario_id, imagen, titulo, precio, comuna, habitaciones, banos, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [req.userId, imagenes, titulo, precio, comuna, habitaciones, banos, descripcion]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear la propiedad:', error);
    res.status(500).json({ error: 'Error al crear la propiedad', detalle: error.message });
  }
});


// Eliminar una propiedad (Delete)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM propiedades WHERE propiedades_id = $1 AND usuario_id = $2 RETURNING *', [req.params.id, req.userId]);
    if (result.rows.length === 0) {
      return res.status(404).send('Propiedad no encontrada');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al eliminar la propiedad:', error);
    res.status(500).send('Error al eliminar la propiedad');
  }
});

module.exports = router;
