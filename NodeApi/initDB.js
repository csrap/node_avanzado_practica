'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const readline = require('readline');
//conexión a la base de datos
const conexionDB = require('./lib/db.conexion');
// modelo de anuncios
conexionDB();


// const { Announcement, Usuario } = require('./Models');
const Announcements = require('./Models/Announcement');
const Usuarios = require('./Models/Usuario');

const AnnouncementsData = require('./annoucements.inicial.json');
const { promiseImpl } = require('ejs');

main().catch(error => console.log('Hubo un Error', error));

async function main() {

  if (!(await askYesNo('Estas seguro que quieres inicializar la BD? (yes/no)'))) {
    console.log('Abortado');
    return process.exit(0);
  }
  //inicializo la colección de anuncios
  await initAnnouncements();

  //inicializo la colección de usuarios 
  await initUsuarios();

  mongoose.connection.close();
}

async function initAnnouncements() {
  //elimina todos los documentos de la coleccion Announcemen
  const deleted = await Announcements.deleteMany();
  console.log(`Removed ${deleted.deletedCount} annoucements.`);

  // crear anuncios iniciales 

  const annoucements_ini = await Announcements.insertMany(AnnouncementsData.annoucement);
  //console.log(AnnouncementsData); 
  console.log(`Create ${annoucements_ini.length} annoucements.`)
}

async function initUsuarios() {
  const { deletedCount } = await Usuarios.deleteMany();
  console.log(`Eliminados ${deletedCount} usuarios.`);

  const result = await Usuarios.insertMany([
    {
      email: 'admin@example.com',
      password: await Usuarios.hashPassword('1234')
    },
    {
      email: 'user@example.com',
      password: await Usuarios.hashPassword('1234')
    }
  ]);
  console.log(`Insertados ${result.length} usuarios.`)
}

function askYesNo(questionText) {
  return new Promise((resolve, reject) => {
    //crear una interface 
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(questionText, answer => {
      rl.close();
      if (answer.toLowerCase() === 'yes') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  });
}