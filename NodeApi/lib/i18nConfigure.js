const i18n = require('i18n');
const path = require('path');


i18n.configure({
  locales: ['en', 'es', 'pt'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  autoReload: true,
  syncFiles: true,
  cookie: 'nodeapi-locale'
});

// Utilización i18n en scripts 
i18n.setLocale('en'); //se usa el mismo idioma por defecto 


module.exports = i18n;