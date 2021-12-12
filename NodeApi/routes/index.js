var express = require('express');
var router = express.Router();

const Announcement = require("../Models/Announcement");
const prueba = require("E:/Bootcamp_Keepcoding/m10-Desarrollo-node-avanzado/nodepop_prt/NodeApi/controllers/announcement.controllers")

/* GET home page. */

router.get('/', async (req, res, next) => {
  try {
    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const photo = req.query.photo;
    const tags = req.query.tags;
    const limit = parseInt(req.query.limit);
    // http://127.0.0.1:3200/api/announcements/?select=name -_id&price=699 (para una el filtro con varios conceptos)
    const select = req.query.select;
    const sort = req.query.sort;

    const filtro = {};

    if (name) {
      filtro.name = new RegExp('^' + name, "i");
    }

    if (sale) {
      filtro.sale = sale;
    }

    if (price) {
      filtro.price = price;
    }

    if (photo) {
      filtro.photo = photo;
    }

    if (tags) {
      filtro.tags = tags;
    }

    const announcements = await Announcement.list(filtro, limit, select, sort);

    res.render('index', { title: 'Nodepop', announcements, pag: { name, sale, price, photo, tags } })

  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
