'use strict'

const basicAuth = require('basic-auth');
// modulo que devuelve un midel 


module.exports = (req, res, next) => {
  const user = basicAuth(req);
  if (!user || user.name !== 'admin' || user.pass != '456') {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  // si las creenciales estan ok, pasamos al siguiente mide
  next();
}