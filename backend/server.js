const app = require('./index');

// Iniciar servidor
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor en funcionamiento en el puerto' + (process.env.PORT || 3000));
});


//http://localhost:5173/