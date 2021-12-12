'use strict';

const mongoose = require('mongoose');


const conexionDB = async () => {
  try {
    const DB = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {


    });
    // console.log("Conexion de forma satisfactoria", DB.connection.name);
  } catch (error) {
    console.log(error);
  }
}

// mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {


// });

module.exports = conexionDB;