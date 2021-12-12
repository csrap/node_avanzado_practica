"use strict";

const { Requester } = require("cote");

const requester = new Requester({ name: "nodepop-thumbnail-requester" });

const thumbnailsRequester = (photo) => {
  const req = {
    type: "thumbnail-convert",
    photo: photo,
  };
  requester.send(req, (done) => {
    console.log(`transform ${photo} = ${req} ${done}`);
  });
};

module.exports = thumbnailsRequester;