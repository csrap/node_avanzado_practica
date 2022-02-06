const { Router } = require("express");
const { createPhoto, getPhoto, updatePhotos, obtener } = require("../../controllers/announcement.controllers");
const ctrAnn = require("../../controllers/announcement.controllers");
const upload = require("../../lib/multerConfig")



const routerAnnouncement = Router();

routerAnnouncement.route('/').get(obtener);

routerAnnouncement.route('/').post(upload.single('photo'), createPhoto);

routerAnnouncement.route("/advert:id").get(updatePhotos);

routerAnnouncement.get("/:price1/:price2", ctrAnn.priceFilter);

routerAnnouncement.put('/:id', ctrAnn.actualizar);

routerAnnouncement.delete('/:id', ctrAnn.eliminar);


module.exports = routerAnnouncement;
