'use strict';

const jwt = require('jsonwebtoken');
const { Usuario } = require('../Models');

class LoginController {
  index(req, res, next) {
    res.locals.error = '';
    res.render('login');
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;
      // buscar el usuario en la DB
      const usuario = await Usuario.findOne({
        email,
      });
      console.log(usuario);
      // si no se encuentra o no coincide la contraseña ---> ERROR
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.locals.error = res.__('Invalid credentials');
        res.render('login');
        return;
      }
      //si lo encuentro y la contrasela coincide --> redirect a zona privada,
      // ---> apuntar en su sesión que esta autenticado
      // se guarda en un objeto el usuario logado. En casos de que se quieran guardar roles o permisos
      req.session.usuarioLogado = {
        _id: usuario._id,
      };

      res.redirect('/privado');
    } catch (err) {
      next(err);
    }
  }

  logout(req, res, next) {
    req.session.regenerate((err) => {
      if (err) {
        next();
        return;
      }
      res.redirect('/');
    });
  }
  //POSTapi/login,
  async postJWT(req, res, next) {
    try {
      //del req.body el email /password
      const { email, password } = req.body;

      // buscar el usuario en la DB
      const usuario = await Usuario.findOne({
        email,
      });
      // si no se encuentra o no coincide la contraseña ---> ERROR
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.json({ error: 'Invalid credentials' });
        return;
      }

      // si el usuario existe y valida la contraseña
      //crear un JWT con el _id del usuario dentro
      jwt.sign(
        { _id: usuario._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '2d',
        },
        (err, jwtToken) => {
          if (err) {
            next(err);
            return;
          }
          // devolver al cliente el token generado
          res.json({ token: jwtToken });
        }
      );
    } catch (err) {
      next();
    }
  }
}

module.exports = LoginController;
