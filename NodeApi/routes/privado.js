const express = require('express');
const router = express.Router();

//** GEt /privado */
router.get('/', (req, res, next) => {
  //TODO:varificar en la ruta que se deje como privado y no como login 

  res.render('privado')
});

module.exports = router;