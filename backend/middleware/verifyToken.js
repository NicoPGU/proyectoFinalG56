
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).send('No token provided.');
  }

  const tokenPart = token.split(' ')[1]; // Remover el 'Bearer' del token

  jwt.verify(tokenPart, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token.');
    }
    req.userId = decoded.id;
    console.log('User ID:', req.userId); // Verificar que el ID del usuario se esté asignando correctamente
    next();
  });
};

module.exports = verifyToken;
