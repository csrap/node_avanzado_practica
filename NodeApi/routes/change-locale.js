const express = require('express');
const router = express.Router();

//** GEt /change-locale */
router.get('/:locale', (req, res, next) => {

  // recoger el idioma que queremoa cambiar
  const locale = req.params.locale;

  // creamos una cookie en la respuesta que indique el idioma que me piden
  res.cookie('nodeapi-locale', locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30 //one moth 
  });

  // hacer una redireccion a la misma pág donde estaba el usuario
  res.redirect(req.get('referer'));


});

module.exports = router;