const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const { authChecking, adminRoleChecking } = require('../middlewares/authentication')
const bcrypt = require('bcrypt');
const _ = require('underscore');

//Get con paginación (limite)
// AuthChecking es el middleware para analizar token
app.get('/usuario', [authChecking, adminRoleChecking], (req, res) => {

  let from = Number(req.query.from || 0);
  let limit = Number(req.query.limit || 5); 
  Usuario.find({status: true}, 'nombre email role status google img') //Trae solo los campos q se indican en el string
  .skip(from)
  .limit(limit)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      //Cuenta registros de la bd
      Usuario.count({status: true}, (err, count) => {
        res.json({
          ok: true,
          usuarios,
          count
        });
      })

    })
});

app.post('/usuario', [authChecking, adminRoleChecking], (req, res) => {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  usuario.save((err, usuarioDb) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDb
    })

  })
});


app.put('/usuario/:id', [authChecking, adminRoleChecking], (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'status']);

  //Middleware BBDD que busca por id y actualiza
  Usuario.findByIdAndUpdate(
    id,
    body,
    {new: true, runValidators: true},
    (err, usuarioDb) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDb
    })
  });

});

// Borra usuario (o pone status = false)
app.delete('/usuario/:id', [authChecking, adminRoleChecking], (req, res) => {
  
  let id = req.params.id;
  let statusChanged = {
    status: false
  }
  //Usuario.findByIdAndRemove(id, (err, deletedUser) => {
  Usuario.findByIdAndUpdate(
    id,
    statusChanged,
    {new: true},
    (err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    if (!deletedUser) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado'
        }
      });
    }

    res.json({
      ok: true,
      usuario: deletedUser
    })

  })

});

module.exports = app;