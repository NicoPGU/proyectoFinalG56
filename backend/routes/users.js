
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const verifyToken = require('../middleware/verifyToken'); // Import the verifyToken middleware

const SECRET_KEY = process.env.SECRET_KEY;
console.log('SECRET_KEY:', process.env.SECRET_KEY);


// Registro de usuario (Create)
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const result = await pool.query(
    'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id_usuario',
    [nombre, email, hashedPassword]
  );
  const userId = result.rows[0].id_usuario;
  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
  console.log('Token generado:', token);
  res.status(201).json({ auth: true, token });
});

// Ruta de inicio de sesión (Login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

  if (result.rows.length === 0) {
    return res.status(404).send('Usuario no encontrado');
  }

  const user = result.rows[0];
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send('Contraseña incorrecta');
  }

  const token = jwt.sign({ id: user.id_usuario }, process.env.SECRET_KEY, { expiresIn: '1h' });

  res.json({ auth: true, token });
});

// Obtener todos los usuarios (Read)
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM usuarios');
  res.json(result.rows);
});

// Obtener un usuario específico por ID (Read) con manejo de 'me'
router.get('/:id', verifyToken, async (req, res) => {
  const userId = req.params.id === 'me' ? req.userId : req.params.id;
  const result = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [userId]);
  if (result.rows.length === 0) {
    return res.status(404).send('Usuario no encontrado');
  }
  res.json(result.rows[0]);
});

// Actualizar un usuario (Update)
router.put('/:id', async (req, res) => {
  const { nombre, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const result = await pool.query(
    'UPDATE usuarios SET nombre = $1, email = $2, password = $3 WHERE id_usuario = $4 RETURNING *',
    [nombre, email, hashedPassword, req.params.id]
  );
  if (result.rows.length === 0) {
    return res.status(404).send('Usuario no encontrado');
  }
  res.json(result.rows[0]);
});

// Eliminar un usuario (Delete)
router.delete('/:id', async (req, res) => {
  const result = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *', [req.params.id]);
  if (result.rows.length === 0) {
    return res.status(404).send('Usuario no encontrado');
  }
  res.json(result.rows[0]);
});

module.exports = router;
