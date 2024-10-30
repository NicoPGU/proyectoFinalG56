const app = require('./index');

// Iniciar servidor
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor en funcionamiento en el puerto 3000');
});
