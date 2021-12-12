'use strict';

//modulo que exporta un middleare

module.exports = (req, res, next) => {
  if (!req.session.usuarioLogado) {
    res.redirect('/login');
    return;
  }

  next();
}

