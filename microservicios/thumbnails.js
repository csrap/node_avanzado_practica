"use strict";

const sharp = require("sharp");
const { Responder } = require("cote");

// declarar el microservicio
const responder = new Responder({ name: "thumbnail-creation" });

responder.on("thumbnail-convert", async (req, done) => {
  const { photo } = req;
  const photoRoute = `../NodeApi/public/images/${photo}`;


  sharp(photoRoute)
    .resize(100, 100)
    .toFile(
      "../NodeApi/public/tumbnails/" + "thumbnail-" + `${photo}`,
      (err, resizeImage) => {
        if (err) {
          console.log(err);
        } else {
          console.log(resizeImage);
        }
      }
    );

  const result = "thumbnail-creation";
  await done(result);
});