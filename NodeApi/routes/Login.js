const express = require('express');
const router = express.Router();

//** GEt /login */
router.get('/', (req, res, next) => {
  res.render('Login')
});

module.exports = router;