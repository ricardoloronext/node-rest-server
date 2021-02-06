require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/usuario'));

// Si no existe la bbdd la crea
mongoose.connect(process.env.URLDB,
{useNewUrlParser: true, useCreateIndex: true},
(err, res) => {
  if (err) throw err;
  console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () =>
  console.log(`Escuhando en el puerto ${process.env.PORT}`)
);