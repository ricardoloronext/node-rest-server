
const jwt = require('jsonwebtoken');

// ================================
// Verificar token
// ================================
// El next lo que hace es ejecutar una iteración (funcion generadora)
let authChecking  = (req, res, next) => {
  let token = req.get('token');
  jwt.verify(token, process.env.AUTH_SEED, (err, decoded) => {
    if(err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Invalid token'
        }
      });
    }

    req.usuario = decoded.usuario;
    next();
  });
};

// ================================
// Verificación de rol admin
// ================================

let adminRoleChecking = (req, res, next) => {
  let usuario = req.usuario;

  if(usuario.role === 'ADMIN_ROLE') {
    next();
  } else {
    res.json({
      ok: false,
      err: {
        message: 'El usuario no es administrador'
      }
    });
  }

};  



module.exports = {
  authChecking,
  adminRoleChecking
};