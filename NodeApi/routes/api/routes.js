const express = require('express');
const router = express.Router();

//express hechar un vistazo 

//**GET /la ruta */
// creamos un midelware
router.get('/', (req, res, next) => {
  res.render('nombre de la ruta');
});


module.exports = router;