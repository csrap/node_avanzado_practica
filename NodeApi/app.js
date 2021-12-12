var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const LoginController = require('./controllers/loginController');
const session = require('express-session');
const sessionAuth = require('./lib/sessionMiddlware');
const MongoStore = require("connect-mongo");
const basicAuth = require('./lib/basicAuthMiddleare');
const jwtAuth = require('./lib/jwtAuthMiddleware');



var app = express();

const conexionDB = require('./lib/db.conexion');

const { obtener } = require('./controllers/announcement.controllers')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const announcementRouter = require('./routes/api/announcement.routes');




// Conexion a la DB

conexionDB();



//Prueba de i18n 
// i18n.setLocale('es');
// console.log(i18n.__('Welcome to Nodepop'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.locals.title = 'Nodeapi';


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const loginController = new LoginController();



//rutas de la pagina 
//POST /api/authenticate para hacer login y devolver un token JWT
app.use('/api/announcements', jwtAuth, require('./routes/api/announcement.routes'));
app.post('/api/authenticate', loginController.postJWT);



//GET /api/anuncios incluyendo el JWT en una cabecera o query-string hará la peticióncorrecta (200 OK)

// Setuo de i18n 
const i18n = require('./lib/i18nConfigure');

// Para que express lo use, devuelve un midelware de express
app.use(i18n.init);

// Setup de sesiones del  website 
app.use(session({
  name: 'nodeapi-session',
  secret: '_kFM!n(e_FgQJ3ZG8P(.?<HuCEZ6(.Gy',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2 dias de inactividad 
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_CONNECTION_STRING
  })
}));

//disponibilidad de la sesión en todas las views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});




app.use('/', indexRouter);
app.use('/users', usersRouter);




app.use('/', require('./routes/users'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/newProduct', basicAuth, require('./routes/newProduct'));
app.use('/privado', sessionAuth, require('./routes/privado'));


// Con los controllers
app.get('/Login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);

// app.get('/api/announcements', jwtAuth, announcementRouter);

// this  folder for this application will be used  to store public files 




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // es un error de validación?
  if (err.array) {
    const errorInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.render("error");
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf("/api/") === 0;
}

module.exports = app;
