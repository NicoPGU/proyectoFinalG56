const app = require('./index');
const PORT = process.env.PORT || 3000
// Iniciar servidor
app.listen(PORT, () => {
  console.log('Servidor en funcionamiento en el puerto 3000');
});
