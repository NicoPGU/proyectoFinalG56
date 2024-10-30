const app = require('./index');

// Iniciar servidor
app.listen(PORT || 3000, () => {
  console.log('Servidor en funcionamiento en el puerto 3000');
});
