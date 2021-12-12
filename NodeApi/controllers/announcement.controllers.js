'use strict'

const Announcement = require("../Models/Announcement");
const thumbnailsRequester = require("../controllers/thumbnailsRequester");

exports.obtener = async (req, res) => {
  try {
    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const photo = req.query.photo;
    const tags = req.query.tags;
    let limit = parseInt(req.query.limit);
    const select = req.query.select;
    const sort = req.query.sort;
    let skip = parseInt(req.query.skip);
    // http://127.0.0.1:3200/api/announcements/?select=name -_id&price=699 (para una el filtro con varios conceptos)


    console.log('El usurio tiene el _id', req.apiAuthUserId);
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

    const announcements = await Announcement.list(filtro, limit, select, sort, skip);
    res.json({ results: announcements });
  } catch (error) {
    res.json(error);
  }
};

exports.agregar = async (req, res) => {
  try {
    const { name, sale, price, photo, tags } = req.body;

    if (name && sale && price && photo && tags) {
      const nuevoAnnouncement = new Announcement({ name, sale, price, photo, tags });
      await nuevoAnnouncement.save();

      console.log(nuevoAnnouncement);
      res.json({ msj: "documento insertado de forma satifactoria", id: nuevoAnnouncement._id });
    } else {
      res.json({ isOK: false, msj: "Los datos son requeridos" })
    }
  } catch (error) {
    res.json(error)
  }
};

exports.actualizar = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (id && data) {
      await Announcement.findByIdAndUpdate(id, data)
      res.json("Registro Actualizado.");
    } else {
      res.json({ msj: " Datos insuficientes" });
    }
  } catch (error) {
    res.json(error);
  }

}

exports.eliminar = async (req, res) => {
  try {
    const _id = req.params.id;

    await Announcement.deleteOne({ _id: _id });
    res.status(200).json({ msj: "Dato borrado de forma satifactoria", isOk: true });
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.priceFilter = async (req, res) => {
  try {
    const range = [req.params.price1, req.params.price2];

    const announcements = await Announcement.find({ price: { $gt: range[0], $lt: range[1] } });

    res.json({ result: announcements });
  } catch (error) {
    res.status(500).json(error);
  }
}


exports.createPhoto = async (req, res) => {
  try {
    const anuncioData = req.body;
    anuncioData.photo = req.file.originalname;

    thumbnailsRequester(anuncioData.photo);

    const anuncio = new Announcement(anuncioData);

    const anuncioCreado = await anuncio.save();

    return res.status(201).json({
      message: "Anuncio creado correctamente",
      anuncioCreado,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPhoto = async (req, res) => {
  const adverts = await Advert.find();

  return res.json(adverts)
};


exports.updatePhotos = async (req, res) => {
  const AdvertImg = Advert.findById(req.params.id);
  console.log(req.params.id);
  console.log(AdvertImg);

  return res.json({});
};
