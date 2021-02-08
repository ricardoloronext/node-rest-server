const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {

  let body = req.body;

  //Busco con una condición
  Usuario.findOne({email: body.email}, (err, usuarioDb) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if(!usuarioDb) {
      return res.status(400).json({
        ok: false,
        err: {
          message: '(Usuario) o contraseña incorrectos'
        }
      });
    }

    // Compara una contraseña encriptada
    if (!bcrypt.compareSync(body.password, usuarioDb.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario o (contraseña) incorrectos'
        }
      });
    }

    let token = jwt.sign({
      usuario: usuarioDb,
    }, process.env.AUTH_SEED, {expiresIn: process.env.EXPIRES_IN})

    res.json({
      ok: true,
      usuario: usuarioDb,
      token
    })

  });


});



module.exports = app;