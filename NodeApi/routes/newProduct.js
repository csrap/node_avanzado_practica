const express = require('express');
const router = express.Router();

//** GEt /newproduct */
router.get('/', (req, res, next) => {
  res.render('newProduct')
});

module.exports = router;