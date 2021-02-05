require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
  res.json('get usuario');
});

app.post('/usuario', (req, res) => {
  let body = req.body;

  if (body.nombre === undefined) {
    res.status(400).json({
      codeMessage: 'missing name',
      message: 'El nombre es necesario'
    })
  } else {
    res.json({ data: body });
  }
});

app.put('/usuario/:id', (req, res) => {
  let id = req.params.id;
  res.json({
    id
  });
});

app.delete('/usuario', (req, res) => {
  res.json('delete usuario');
});

app.listen(process.env.PORT, () =>
  console.log(`Escuhando en el puerto ${process.env.PORT}`)
);